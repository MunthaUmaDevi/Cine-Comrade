import {Link} from "react-router-dom";
const Footer = () => {
  return (
    <footer className="p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      
      {/* Copyright */}
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2030 <Link to="/" className="hover:underline">Cine Comrade</Link>. All Rights Reserved.
      </span>
 
      {/* Social Links */}
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6">Instagram</a>
        </li>
        <li>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6">Facebook</a>
        </li>
        <li>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6">YouTube</a>
        </li>
        <li>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter</a>
        </li>
      </ul>
 
    </footer>
  );
};
export default Footer