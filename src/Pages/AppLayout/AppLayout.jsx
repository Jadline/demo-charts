import { Outlet } from "react-router-dom"
import PageNav from "../../PageNav/PageNav"
import styles from './AppLayout.module.css'
import { useEffect, useState } from "react"

function AppLayout (){
    const [isdarkmode,setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true'
    })

    useEffect(() => {       
       if(isdarkmode !== null){
        document.documentElement.classList.toggle('dark-mode')
        localStorage.setItem('darkMode',isdarkmode.toString())

       }
    },[isdarkmode])
    return(
        <div className={styles.applayout}>
           <PageNav setIsDarkMode={setIsDarkMode} isdarkmode={isdarkmode}/>
          <main>
            <Outlet/>
          </main>
        </div>
    )
}
export default AppLayout