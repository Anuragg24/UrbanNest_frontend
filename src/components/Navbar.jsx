import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartModal from '../pages/shop/CartModal';
import avatarImg from "../assets/avatar.png";
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setisCartOpen] = useState(false);
  const handleCartToggle = () => {
    setisCartOpen(!isCartOpen);
  };

  // show user if logged in
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // dropdown
  const [isDropDownOPen, setIsDropDownOpen] = useState(false);
  const handDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOPen);
  };

  // admin dropdown menu
  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-prducts" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add new post", path: "/dashboard/add-new-post" },
  ];

  // user dropdown menu
  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/order" },
  ];

  const dropdownMenus = user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('failed to logout', error);
    }
  };

  // State for mobile navigation
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="fixed-nav-bar w-full bg-white shadow-lg z-50">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-2xl"
          onClick={handleNavToggle}
        >
          <i className={`ri-menu-${isNavOpen ? 'close' : 'line'}`}></i>
        </button>

        {/* Logo */}
        <div className="nav__logo">
          <Link to="/">UrbanNest<span>.</span></Link>
        </div>
        <div className='px-10'>
          {/* Desktop Navigation Links (Always visible inside navbar on large screens) */}
      <ul className="hidden lg:flex space-x-6 mt-0 ml-4">
        <li className="link"><Link to="/">Home</Link></li>
        <li className="link"><Link to="/shop">Shop</Link></li>
        <li className="link"><Link to="/contact">Contact us</Link></li>
      </ul>
        </div>

        {/* Icons */}
        <div className="nav__icons relative flex items-center space-x-4">
          <span><Link to="/search"><i className="ri-search-line"></i></Link></span>
          <span>
            <button onClick={handleCartToggle} className="hover:text-primary">
              <i className="ri-shopping-cart-2-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">{products.length}</sup>
            </button>
          </span>
          <span>
            {user && user ? (
              <>
                <img 
                  onClick={handDropDownToggle} 
                  src={user?.profileImage || avatarImg} 
                  alt="" 
                  className="size-6 rounded-full cursor-pointer"
                />
                {isDropDownOPen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link onClick={() => setIsDropDownOpen(false)} className="dropdown-items" to={menu.path}>{menu.label}</Link>
                        </li>
                      ))}
                      <li><Link className="dropdown-items" onClick={handleLogout}>Logout</Link></li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login"><i className="ri-user-line"></i></Link>
            )}
          </span>
        </div>
      </nav>

      {/* Mobile Navigation Links (Positioned below navbar) */}
      {isNavOpen && (
        <div className="lg:hidden bg-white shadow-md mt-4 w-full px-4 py-2">
          <div className="flex justify-between items-center mb-4">
            {/* Close Button */}
            <button
              onClick={handleNavToggle}
              className="text-2xl text-gray-500"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
          <ul className="space-y-4">
            <li className="link"><Link to="/">Home</Link></li>
            <li className="link"><Link to="/shop">Shop</Link></li>
            <li className="link"><Link to="/contact">Contact us</Link></li>
          </ul>
        </div>
      )}

      

      {/* Cart Modal */}
      {isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
    </header>
  );
};

export default Navbar;
