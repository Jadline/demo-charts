import SalesChart from "../../chart-lines/linechart1"
// import { salesData } from "../../../public/data"
// import { salesData } from "../../data"
import styles from './LineChart.module.css'
export const salesData = [
    { month: "January", sales: 351 },
    { month: "February", sales: 124 },
    { month: "March", sales: 379 },
    { month: "April", sales: 193 },
    { month: "May", sales: 447 },
    { month: "June", sales: 435 },
    { month: "July", sales: 466 },
    { month: "August", sales: 183 },
    { month: "September", sales: 301 },
    { month: "October", sales: 392 },
    { month: "November", sales: 146 },
    { month: "December", sales: 190 },
  ];
  

  

function LineCharts(){
    return(
        <div className={styles.container}>
            <SalesChart data={salesData} 
            className={styles.chart1}
            strokeColor="#027A02"
            strokeShadow = "rgba(2, 122, 2,0.2)"
            hasShadow = {true}
            showbox={true}
            showCircle={true}
            label="line chart (linear & data)"
            />
            <SalesChart data={salesData} 
            className={styles.chart2} 
            curveType ={'basis'}
            label='line chart (smooth curve)'
            />
            <SalesChart data={salesData} className={styles.chart3}
            showCircle={true}
            circleColor = 'red'
            label='line chart (linear & data points)'
           
            />
            <SalesChart data={salesData} 
            className={styles.chart4}
            curveType={'basis'}
            showArea={true}
            areaColor="#24D400"
            animateLine= {true}
            label="Area chart"
            />
        </div>
    )
}
export default LineCharts