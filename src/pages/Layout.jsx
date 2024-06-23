import React from "react";
import { Outlet, NavLink, useNavigate} from "react-router-dom";

function Layout(){
    const navigate = useNavigate();
    function Logout(){
   
        navigate("/login")
        localStorage.removeItem('currentUser');
    
      }
    return(
        <>
        <button onClick={Logout}>Logout</button>
        <nav className='navbar'>
          <NavLink
            to="/info"
            className={({ isActive }) => (isActive ? 'link active' : 'link')}
          >
            Info 
          </NavLink>
          <NavLink
            to="/todos"
            className={({ isActive }) => (isActive ? 'link active' : 'link')}
          >
            Todos 
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) => (isActive ? 'link active' : 'link')}
          >
            Posts
          </NavLink>
          <NavLink
            to="/albums"
            className={({ isActive }) => (isActive ? 'link active' : 'link')}
          >
            Albums 
          </NavLink>
        </nav>
        <Outlet />
      </>
    )
}

export default Layout;