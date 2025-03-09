import { scaleBand, scaleLinear,max } from "d3"
import { useState,useEffect,useRef} from "react"
const colors = [
    "#023C00", // Dark Green
    "#035E03",
    "#027A02",
    "#028A2B",
    "#00A631",
    "#00B640",
    "#00C714",
    "#24D400",
    "#5AD800",
    "#77E448",
    
    "#a5f489" ,
    "#AAFA76",
  ];
  
function HorizontalBarChart({data,className}){
    const MARGIN = {left : 30,top : 50,right : 30,bottom : 50}
    const containerRef = useRef(null)
    const groups = data.sort((a,b) => b.sales - a.sales).map((d) => d.month)
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
    const boundsWidth = width - MARGIN.right - MARGIN.left
    const boundsHeight = height - MARGIN.top - MARGIN.bottom 

    const xScale = scaleLinear()
                   .domain([0,max(data,(d) => d.sales)])
                   .range([0,boundsWidth])
    const yScale = scaleBand()
                   .domain(groups)
                   .range([0,boundsHeight])
                   .padding(0.1)
    
    const bars = data.map((d,i) => {
        const y = yScale(d.month)
        if(y === undefined) return
        return(
            <g key={i}>
                <rect
                x={0}
                y={y}
                width={xScale(d.sales)}
                height={yScale.bandwidth()}
                fill ={colors[i % colors.length]}
                />
                <text
                x={xScale(d.sales) -22}
                y={y + yScale.bandwidth() / 2 + 3}
                fill ={'#fff'}
                fontSize={12}
               
                >
                    {d.sales}

                </text>
                <text
                x ={xScale(0) + 10}
                y ={y + yScale.bandwidth() / 2 + 3}
                fill= {'#fff'}
                fontSize ={12}
               
                >
                    {d.month}
                </text>
            </g>
        )
    })
    const gridLines = xScale.ticks().map((value,i) => (
        <g key={i}>
            <line
            x1 ={xScale(value)}
            x2={xScale(value)}
            y1 ={0}
            y2 ={boundsHeight}
            strokeWidth={2}
            stroke={'#000'}
            opacity ={0.2}
            />
            <text
            x={xScale(value)}
            y={boundsHeight + 15}
            fontSize={12}
            fill ={'#000'}
            >
                {value}
            </text>

        </g>
    ))
    
    return(
        <div
         className={className} 
        style={{
            width : '100%',
            height : '100%',
            display : 'flex',
            borderRadius : '1rem',
            
            boxShadow: '-0.2rem -0.2rem 1rem rgba(0, 0, 0, 0.2)'

        }}
        ref={containerRef}
        >
            <svg
            width ='100%'
            height ='100%'
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio='xMidYMid meet'
            >
                
                <text
                x={boundsWidth - width / 2 }
                y={30}
                fontSize={18}
                fontWeight={800}
                fill={'000'}
                
                >
                    Horizontal Bar Chart
                </text>
                <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
                    {gridLines}
                    {bars}
                </g>

            </svg>
        </div>
    )
}
export default HorizontalBarChart