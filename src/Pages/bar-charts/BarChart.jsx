// import BarChart from "../../Bar-charts/bar-chart"
import { salesData,stackedData } from "../../../public/data"
import HorizontalBarChart from "../../Bar-charts/bar-chart"

import styles from './BarChart.module.css'
import StackedBarChart from "../../Bar-charts/stackedbar"
import GroupedBarChart from "../../Bar-charts/groupedbar"
import VerticalBarChart from "../../Bar-charts/verticalbar"
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