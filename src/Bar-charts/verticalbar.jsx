import { scaleBand, scaleLinear, max } from "d3";
import { useState, useEffect, useRef } from "react";

const colors = [
  "#023C00", "#035E03", "#027A02", "#028A2B", "#00A631",
  "#00B640", "#00C714", "#24D400", "#5AD800", "#77E448",
  "#a5f489", "#AAFA76",
];

const monthOrder = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function VerticalBarChart({ data, className }) {
  const MARGIN = { left: 50, top: 50, right: 30, bottom: 50 };
  const containerRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    width: 700,
    height: 500,
  });

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const { width, height } = dimensions;
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Ensure data follows the correct month order
  const sortedData = monthOrder.map((month) => {
    return data.find((d) => d.month === month) || { month, sales: 0 };
  });

  const xScale = scaleBand()
    .domain(monthOrder) // Fixed order of months
    .range([0, boundsWidth])
    .padding(0.1);

  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.sales)])
    .range([boundsHeight, 0]);

  const bars = sortedData.map((d, i) => {
    const x = xScale(d.month);
    if (x === undefined) return null;
    return (
      <g key={i}>
        <rect
          x={x}
          y={yScale(d.sales)}
          width={xScale.bandwidth()}
          height={boundsHeight - yScale(d.sales)}
          fill={colors[i % colors.length]}
        />
        <text
          x={x + xScale.bandwidth() / 2}
          y={yScale(d.sales) - 5}
          fill="#000"
          fontSize={12}
          textAnchor="middle"
        >
          {d.sales}
        </text>
      </g>
    );
  });

  const gridLines = yScale.ticks().map((value, i) => (
    <g key={i}>
      <line
        x1={0}
        x2={boundsWidth}
        y1={yScale(value)}
        y2={yScale(value)}
        strokeWidth={1}
        stroke="#000"
        opacity={0.2}
      />
      <text
        x={-10}
        y={yScale(value) + 5}
        fontSize={12}
        fill="#000"
        textAnchor="end"
      >
        {value}
      </text>
    </g>
  ));

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius: "1rem",
        boxShadow: "-0.2rem -0.2rem 1rem rgba(0, 0, 0, 0.2)",
      }}
      ref={containerRef}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <text
          x={boundsWidth / 2}
          y={30}
          fontSize={18}
          fontWeight={800}
          fill="#000"
          textAnchor="middle"
        >
         Vertical Bar Chart
        </text>
        <g transform={`translate(${MARGIN.left},${MARGIN.top })`}>
          {gridLines}
          {bars}
          <g transform={`translate(0,${boundsHeight})`}>
            {monthOrder.map((month, i) => (
              <text
                key={i}
                x={xScale(month) + xScale.bandwidth() / 2}
                y={20}
                fontSize={12}
                fill="#000"
                textAnchor="middle"
              >
                {month.slice(0,3)}
              </text>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}

export default VerticalBarChart;
