import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { PiMoonFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  // State to control mobile menu visibility
  const [hidden, setHidden] = useState(true);
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);

  const handleToggle = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?q=${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white border-b border-gray-200 px-4 lg:px-6 py-2 dark:bg-gray-900 dark:border-gray-700">
        {/* flex-wrap allows the menu links container to wrap underneath when it becomes visible */}
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center mx-auto max-w-screen-xl gap-2">
          
          {/* 1. Logo / Brand Name */}
          <Link to="/" className="flex items-center order-1 shrink-0">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Cine Comrade
            </span>
          </Link>

          {/* 2. Controls: Theme Toggle, Search Icon, & Hamburger */}
          <div className="flex items-center gap-2 sm:gap-4 order-2 lg:order-3 flex-nowrap shrink-0">
            
            <div id="mobileNav" className="block">
              <div className="flex flex-row items-center gap-2 sm:gap-4 flex-nowrap">
                
                {/* Theme Toggle Button */}
                <button 
                  onClick={handleToggle} 
                  className={`p-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 shrink-0 ${
                    darkMode ? 'bg-white text-yellow-400 border border-gray-200' : 'bg-gray-100 text-gray-600'
                  }`}
                  aria-label="Toggle theme"
                >
                  {darkMode ? (
                    <IoSunnyOutline className="w-5 sm:w-6 h-6" />
                  ) : (
                    <PiMoonFill className="w-5 sm:w-6 h-6" />
                  )}
                </button>
                
                {/* Isolated Search Input Container */}
                <div className="relative flex items-center">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <input
                      type="search"
                      placeholder="Search Movies..."
                      className="p-2 pl-10 w-10 sm:w-64 text-transparent focus:text-gray-900 bg-transparent sm:bg-gray-50 focus:bg-gray-50 rounded-lg border-0 sm:border border-gray-300 focus:border-gray-300 sm:text-sm focus:w-40 sm:focus:w-64 transition-all duration-300 outline-none cursor-pointer focus:cursor-text dark:bg-transparent dark:sm:bg-gray-700 dark:focus:bg-gray-700 dark:border-gray-600 dark:placeholder-transparent sm:dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            </div>

            {/* Hamburger Button */}
            <button 
              onClick={() => setHidden(!hidden)} 
              type="button" 
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 shrink-0" 
              aria-controls="mobile-menu-2" 
              aria-expanded={!hidden}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>

          {/* 3. Navigation Links Container (Forces clean break down below the navbar row) */}
          <div 
            id="mobile-menu-2" 
            className={`${hidden ? "hidden" : "block"} w-full order-3 lg:flex lg:w-auto lg:order-2 justify-between items-center`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:items-center lg:space-x-8 lg:mt-0">
              {/* Home */}
              <li>
                <NavLink to="/" end className="block py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-blue-600">Home</NavLink>
              </li>

              {/* Browse Dropdown */}
              <li className="relative group">
                <button className="py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  Browse 
                </button>
                <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg min-w-[180px] z-50">
                  <NavLink to="/movies/popular" className="block px-4 py-3 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Popular </NavLink>
                  <NavLink to="/movies/top" className="block px-4 py-3 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Top Rated  </NavLink>
                  <NavLink to="/movies/upcoming" className="block px-4 py-3 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"> Upcoming </NavLink>
                </div>
              </li>

              {/* Languages Dropdown */}
              <li className="relative group">
                <button className="py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  Languages 
                </button>
                <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg min-w-[180px] z-50">
                  <NavLink to="/language/en" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"> English </NavLink>
                  <NavLink to="/language/te" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Telugu</NavLink>
                  <NavLink to="/language/hi" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"> Hindi </NavLink>
                  <NavLink to="/language/ta" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"> Tamil </NavLink>
                  <NavLink to="/language/ml" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"> Malayalam </NavLink>
                  <NavLink to="/language/kn" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"> Kannada </NavLink>
                </div>
              </li>

              {/* Genres Dropdown */}
              <li className="relative group">
                <button className="py-2 px-3 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  Genres
                </button>
                <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg min-w-[180px] z-50">
                  <NavLink to="/genre/28" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Action</NavLink>
                  <NavLink to="/genre/35" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Comedy</NavLink>
                  <NavLink to="/genre/18" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Drama</NavLink>
                  <NavLink to="/genre/27" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Horror</NavLink>
                  <NavLink to="/genre/10749" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Romance</NavLink>
                  <NavLink to="/genre/878" className="block px-4 py-3 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Sci-Fi</NavLink>
                </div>
              </li>
            </ul>            
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Header;