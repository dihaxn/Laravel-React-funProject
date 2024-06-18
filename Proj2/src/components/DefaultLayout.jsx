import {Link,Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

export default function DefaultLayout(){

    const {user,token,setUser,setToken}=useStateContext()

    if(!token){
        return <Navigate to="login"/>
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient('/logout')
            .then(() => {
                setUser({})
                setToken(null)
                }
            )
    }

    useEffect(() => {
        axiosClient('/users')
            .then(({data}) => {
            setUser(data)
        })
    }, []);

    return(
           <div id="defaultLayout">

               <aside>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/users">User</Link>
               </aside>

               <div className="content">
                   <header>
                       <div>
                           {user.name}
                           <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                       </div>
                   </header>
                   <main>
                       <Outlet/>
                   </main>
               </div>
           </div>
    )
}
