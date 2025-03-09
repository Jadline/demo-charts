// import BarChart from "../../Bar-charts/bar-chart"
// import { salesData,stackedData } from "../../../public/data"
import { salesData,stackedData } from "../../data"
import HorizontalBarChart from "../../chart-bars/bar-chart"

import styles from './BarChart.module.css'
import StackedBarChart from "../../chart-bars/stackedbar"
import GroupedBarChart from "../../chart-bars/groupedbar"
import VerticalBarChart from "../../chart-bars/verticalbar"
function BarCharts(){
    return (
        <div className={styles.container}>
           <HorizontalBarChart data={salesData} className={styles.chart1}/>
           <StackedBarChart data={stackedData} className={styles.chart2}/>
           {/* <HorizontalBarChart data={salesData} className={styles.chart2}/> */}
           <GroupedBarChart data={stackedData} className={styles.chart3}/>
           <VerticalBarChart data={salesData} className={styles.chart4}/>
           {/* <HorizontalBarChart data={salesData} className={styles.chart3}/> */}
           {/* <HorizontalBarChart data={salesData} className={styles.chart4}/> */}
        </div>
    )
}
export default BarCharts