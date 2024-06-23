import React from "react";
import { Outlet, NavLink, useNavigate} from "react-router-dom";

function Layout(){
    const navigate = useNavigate();
    let user= JSON.parse(localStorage.getItem('currentUser')); // Fetch user from local storage
    function Logout(){
   
        navigate("/login")
        localStorage.removeItem('currentUser');
    
      }
    return(
        <>
        <h3>Welcome {user.name}</h3>
        <button onClick={Logout}>Logout</button>
        <nav className='navbar'>
          <NavLink
            to={`users/${user.id}/info`}
            className={({ isActive }) => (isActive ? 'link active' : 'link')}
          >
            Info 
          </NavLink>
          <NavLink
            to={`users/${user.id}/todos`}
            className={({ isActive }) => (isActive ? 'link active' : 'link')}
          >
            Todos 
          </NavLink>
          <NavLink
            to={`users/${user.id}/posts`}
            className={({ isActive }) => (isActive ? 'link active' : 'link')}
          >
            Posts
          </NavLink>
          <NavLink
            to={`users/${user.id}/albums`}
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