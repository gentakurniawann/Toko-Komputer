import React, {useState} from "react"
import {Link} from 'react-router-dom'
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as MdIcons from "react-icons/md"
import {SidebarData} from "./sidebarData"
import Media from "./media"
import "./navbar.css"

function Navbar(){
        const [sidebar, setSidebar] = useState(false);
        const showSidebar = () => setSidebar(!sidebar);
        const logout = () => {
            localStorage.clear()
            window.location= "/login"
        }
        return(
                <div>
                    <div className="navbar">
                        <Link to="#" className="menu-bars">
                            <FaIcons.FaBars className="icons" onClick={showSidebar}/>
                        </Link>
                        <Link onClick={logout} className="navbar-text">
                            <MdIcons.MdLogout className="icons"/>
                        </Link>
                    </div>
                    <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                                <ul className="nav-menu-items">
                                    <li className="navbar-toggle">
                                        <div className="menu-bars">
                                            <Media value image="aistore-logo.png" width="50%" height="40%"/>
                                            <Link to="#">
                                                <AiIcons.AiOutlineClose className="icons" onClick={showSidebar}/>
                                            </Link>
                                        </div>
                                    </li>
                                    {SidebarData.map((item,index) => {
                                        return(
                                            <li key={index} className={item.cName}>
                                                 <Link to={item.path}>
                                                     {item.icon}
                                                    <span>{item.title}</span>
                                                 </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                    </nav>
                </div>
        )
}
export default Navbar