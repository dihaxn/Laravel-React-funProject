import {Link,Navigate, Outlet} from "react-router-dom";
import {useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function DefaultLayout(){

    const {user,token}=useStateContext()

    if(!token){
        return <Navigate to="login"/>
    }

    const onLogout = (ev) => {
        ev.preventDefault()

    }
    return(
           <div id="defaultLayout">

               <aside>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/user">User</Link>
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