import { BrowserRouter,Routes,Route } from "react-router-dom"
import AppLayout from "./Pages/AppLayout/AppLayout"
import BarCharts from './Pages/bar-charts/BarChart'
import LineCharts from './Pages/line-charts/LineChart'
import { Navigate } from "react-router-dom"

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route 
        element ={<AppLayout/>}
        >
          <Route path='/'  element={<Navigate to='/bar-charts' replace/>}/>
          <Route path='/line-charts'  element={<LineCharts/>}/>
          <Route path='/bar-charts' element={<BarCharts/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
