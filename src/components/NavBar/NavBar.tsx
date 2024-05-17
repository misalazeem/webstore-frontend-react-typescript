import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useLogout } from '../../state/useLogout/useLogout';
import Cart from '../Cart';

const NavBar = () => {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const handleLogout = () => {
    useLogout();
    window.location.reload();
  };

  return (
    <div className="navbar bg-base-100 sm:p-2 md:px-16 py-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/products">Products</Link>
            </li>
            {!loggedIn && (
              <li>
                <Link to="#">Login / Signup</Link>
                <ul className="p-2">
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Signup</Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Store
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/products">Products</Link>
          </li>
          {!loggedIn && (
            <li>
              <details>
                <summary>Login/Signup</summary>
                <ul className="p-2">
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Signup</Link>
                  </li>
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>
      <Cart />
      {loggedIn && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="#" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout} to="/">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
