import { NavLink } from "react-router-dom"
import styles from './PageNav.module.css'
import { FaMoon, FaSun } from "react-icons/fa";

function PageNav({setIsDarkMode,isdarkmode}){
    return(
        <header >
            <ul>
                <li>
                    <NavLink to='line-charts'>
                            Line Charts
                    </NavLink>
                </li>
                <li>
                    <NavLink to='bar-charts'>
                        Bar Charts

                    </NavLink>
                </li>
            </ul>
            <div onClick={() => setIsDarkMode(!isdarkmode)} className={styles.mode}>
                {!isdarkmode ? <FaSun size={35}/> : <FaMoon size={35}/>}
            </div>
        </header>
    )
}
export default PageNav