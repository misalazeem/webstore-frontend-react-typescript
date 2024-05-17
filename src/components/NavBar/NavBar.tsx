import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLogout } from "../../state/useLogout/useLogout";

const NavBar = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const handleLogout = () => {
    useLogout();
    window.location.reload();
  }

  console.log(loggedIn);
  return(
    <div className="navbar bg-base-100 sm:p-2 md:px-16 py-8">
    <div className="navbar-start">
        <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to='#'>Item 1</Link></li>
            {!loggedIn && (
              <li>
                <Link to='#'>Login / Signup</Link>
                <ul className="p-2">
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Signup</Link></li>
                </ul>
            </li>
            )}
 
            <li><Link to='#'>Item 3</Link></li>
        </ul>
        </div>
        <Link to="#" className="btn btn-ghost text-xl">daisyUI</Link>
    </div>
    <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li><Link to='#'>Item 1</Link></li>
        {!loggedIn && (
            <li>
                <details>
                <summary>Login/Signup</summary>
                <ul className="p-2">
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Signup</Link></li>
                </ul>
                </details>
            </li>
        )}
        <li><Link to='#'>Item 3</Link></li>
        </ul>
    </div>
        <div className="navbar-end mr-4">
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item">8</span>
                </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>

                </div>
                </div>
            </div>
            
            </div>
        </div>
        {loggedIn && (
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
                <Link to="#" className="justify-between">
                Profile
                <span className="badge">New</span>
                </Link>
            </li>
            <li><Link to="#">Settings</Link></li>
            <li><Link onClick={handleLogout} to="/">Logout</Link></li>
            </ul>
        </div>
        )}
    </div>
  );
}

export default NavBar;