const MARGIN = {left : 30,top : 50,right : 30,bottom : 50}
import { line, max, scaleBand, scaleLinear,curveBasis,curveLinear, area, scalePoint } from "d3"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion";

const CURVE_FUNCTIONS = {
    linear: curveLinear,
    basis: curveBasis,
    
  };
function SalesChart({data,
                    className,
                    curveType = 'linear',
                    showCircle = false,
                    strokeColor ='#027A02',
                    hasShadow=false,
                    strokeShadow='none',
                    circleColor ='#000',
                    showArea=false,
                    areaColor='#000',
                    animationDuration = 10,
                    animateLine=false,
                    showbox=false,
                    label

}){
    const containerRef = useRef(null)
    const [dimensions,setDimensions] = useState({
        width : 700,
        height : 500 
    })
//     const [phase, setPhase] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPhase((prev) => prev + 0.1); // Increase phase to move the wave
//     }, 30); // Controls wave speed

//     return () => clearInterval(interval); // Cleanup
//   }, []);

    useEffect(() => {
       function updateSize(){
        if(containerRef.current){
            setDimensions({
                width : containerRef.current.clientWidth,
                height : containerRef.current.clientHeight
            })
        }
       }
       updateSize()
       window.addEventListener('resize',updateSize)
       return() => {
        window.removeEventListener('resize',updateSize)
       }
    
    },[])
    const {width,height} = dimensions
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom
    
    const  groups = data.map((dataitem) => dataitem.month)

    const xScale = scalePoint()
                   .domain(groups )
                   .range([0,boundsWidth ])
    const yScale = scaleLinear()
                   .domain([0, max(data, (d) => d.sales) + 70])
                   .range([boundsHeight,0])
    const linePath  = line()
                    .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
                    .y((d) => yScale(d.sales))
                    .curve(CURVE_FUNCTIONS[curveType] || curveLinear)
    const areaPath = area()
                    .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
                    .y0(boundsHeight)
                    .y1((d) => yScale(d.sales))
                    .curve(CURVE_FUNCTIONS[curveType] || curveLinear)
    const gridLines = yScale.ticks().map((value,i) => (
        <g key={i}>
            <line
            x1={0}
            x2={boundsWidth}
            y1={yScale(value)}
            y2={yScale(value)}
            stroke={'#ccc'}
            strokeWidth={2}
            opacity={0.4}
            />
            <text
            alignmentBaseline={'middle'}
            textAnchor={'middle'}
            x={-15}
            y={yScale(value)}
            >
                {value}

            </text>

        </g>
    ))
    const salesbox = data.map((d,i) =>{
        // let xPosition = xScale(d.month) - 32; // Default position

        // // Adjust for first and last data points
        // if (i === 0) xPosition = Math.max(xPosition, 5); // Keep inside left edge
        // if (i === data.length - 1) xPosition = Math.min(xPosition, boundsWidth - 70); // Keep inside right edge
        return(
            <foreignObject
            key={i}
            x={xScale(d.month) - 35}
            y={yScale(d.sales)  }
            width={70}
            height={35}
            >
               <div
             style={{
              backgroundColor : "#bab10c",
              color : '#fff',
              fontSize: '1.2rem',
              boxShadow : '0.2rem 0.2rem 1rem rgba(0,0,0,0.2)',
              
              // padding : '1.6rem 2.4rem',
              textAlign:'center'
             }}
      
             >
              <p>{d.month}</p>
              <p>sales : {d.sales}</p>
              
             </div>
            </foreignObject>
          )
    })
    const salesCircles = data.map((d,i) => (
        <motion.circle
        key={i}
        cx={xScale(d.month)}
        cy={yScale(d.sales)}
        r={4}
        fill="#24D400"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      />
    ))
    const xLabels = groups.map((month,i) => {
        const x = xScale(month)
        if(x === undefined) return null
        return (
            <text
            key={i}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            x={x + xScale.bandwidth() / 2 }
            y={boundsHeight +  15}
            fill={'#000'}
            fontSize={12}
            >
                {month.slice(0,3)}
            </text>
        )

    })
    return(
        <div 
        
        className={`${className}`}
        style={{
           
            alignItems : 'center',
            display : 'flex',
            justifyContent : 'center',
            width : '100%',
            height : '100%',
            borderRadius : '1rem',
            boxShadow : '-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)'
        }}
        ref={containerRef}
        >
            <svg
            width='100%'
            height = '100%'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            >
                 <text
                x={boundsWidth - width / 2 }
                y={30}
                fontSize={18}
                fontWeight={800}
                fill={'000'}
                
                >
                    {label}
                </text>
                <g
                transform={`translate(${MARGIN.left },${MARGIN.top})`}
                >
                    {gridLines}
                    {showArea && 
                    <motion.path
                    d={areaPath(data)} 
                        fill={areaColor}
                        // fillOpacity={0.3}
                    />}
                    {animateLine ?
                    <motion.path
                        d={linePath(data)}
                        fill='none'
                        stroke='#bab10c'
                        strokeWidth={3}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }} 
                        transition={{ 
                            duration: animationDuration, 
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop"
                        }}
                                            /> : ( <path
                        d={linePath(data)}
                        fill='none'
                        stroke= {strokeColor}
                        strokeWidth = {2}
                        />)

                    }
                   
                    {hasShadow && <path
                    d={linePath(data)}
                    fill='none'
                    stroke= {strokeShadow}

                    strokeWidth = {10}
                    />}
                    {showCircle && salesCircles}
                    {showbox && salesbox}
                    {xLabels}

                </g>
                

            </svg>
        </div>
    )
}
export default SalesChart