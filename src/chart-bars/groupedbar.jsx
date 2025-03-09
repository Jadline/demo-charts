import { geoBounds, max, scaleBand, scaleLinear } from "d3";
// import styles from './NOS-bar.module.css'
import { useState ,useEffect, useRef} from "react"
// import { useDimensions } from "../../reusable-components/useDimensions";
const MARGIN = {left : 30,top : 50,right : 30,bottom : 50}
const categories = ["brandA", "brandB"];
const colors = { brandA : "#027A02", brandB: "#bab10c" };
function GroupedBarChart({data,className}){
     const containerRef = useRef(null)
        const groups = data.map((d) => d.month)
        const [dimensions,setDimensions] = useState({
            width : 700,
            height : 400
        })
        useEffect(() => {
            function updateSize(){
                if(containerRef.current){
                    setDimensions({
                        width : containerRef.current.clientWidth,
                        height : containerRef.current.clientWidth
                    })
                }
            }
            updateSize()
            window.addEventListener('resize',updateSize)
            return () => {
                window.removeEventListener('resize',updateSize)
            }
        },[])
        const {width,height} = dimensions
    

   
    const boundsWidth = width - MARGIN.left - MARGIN.right
    const boundsHeight = height - MARGIN.top - MARGIN.bottom
   
    const xScale = scaleBand()
                  .domain(groups)
                  .range([0,boundsWidth])
                  .padding(0.3)
    const xsubScale = scaleBand()
                     .domain(categories)
                     .range([0,xScale.bandwidth()])
                     .padding(0.1)
    const yScale = scaleLinear()
                   .domain([0,max(data,(d) => Math.max(d.brandA,d.brandB))])
                   .range([boundsHeight,0])
    const barshapes = data.flatMap((d,i) =>
        categories.map((category,j) => {
            const x = xScale(d.month) + xsubScale(category)
            const y = yScale(d[category])
            const barHeight = boundsHeight - y
            if(x === undefined) return null
            return (
                <g key={`${i} -${j}`}>
                    <rect
                    x ={x}
                    y={y}
                    width ={xsubScale.bandwidth()}
                    height ={barHeight}
                    fill ={colors[category]}
                    rx={4}
                    // rx={xsubScale.bandwidth()/3}
                   
                    />

                </g>
            )
        })
    )
    const gridlines = yScale.ticks().map((value,i) => (
        <g key={i}>
            <line
            x1 ={0}
            x2 ={boundsWidth}
            y1={yScale(value)}
            y2={yScale(value)}
            stroke={'#ccc'}
            />
            <text
            x={-20}
            y={yScale(value)}
            fontSize={12}
            color ={'#000'}
           
            
            >
                {value}
            </text>

        </g>
    ))
    const xLabels = groups.map((month,i) => (
        <text
        key={i}
        x={xScale(month) + xScale.bandwidth() / 2 }
        y={boundsHeight + 15}
        color ={'#000'}
        fontSize ={12}
        fontWeight={600}
        
        >
            {month.slice(0,3)}
        </text>
    ))
    return(
        <div
        className={className}
        ref={containerRef}
        style={{
            display : 'flex',
            width : '100%',
            height : '100%',
            alignItems : 'center',
            justifyContent : 'center',
            borderRadius : '1rem',
            boxShadow : '-0.2rem -0.2rem 1rem rgba(0,0,0,0.2)'
        }}
        >
            <svg
            width ='100%'
            height ='100%'
            viewBox ={`0 0 ${width} ${height}`}
            preserveAspectRatio = 'xMidYMid meet'
            >
                <text
                x={width / 2 - 100}
                y={25}
                fontSize={18}
                fontWeight ={700}
                >
                    Grouped Bar Chart
                </text>
                <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                    {gridlines}
                    {barshapes}
                    <g>
                    <rect
                    width ={15}
                    height ={10}
                    fill={"#bab10c"}
                    x={boundsWidth - 70}
                    y ={15}
                    /
                    >
                    <text
                    x={boundsWidth - 50}
                    y={24}
                    >
                        brandA


                    </text>
                    <rect
                    x={boundsWidth - 70}
                    y={28}
                    width={15}
                    height ={10}
                    fill ={"#027A02"}
                    />
                    <text
                    x={boundsWidth - 50}
                    y ={35}
                    >
                        brandB
                    </text>
                    </g>
                    

                   
                    {xLabels}
                </g>

            </svg>

        </div>
    )
}
export default GroupedBarChart
