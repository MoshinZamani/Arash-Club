import { Link } from "react-router-dom";

import Logo from "../assets/images/logo.jpg";
const Layout = () => {
  return (
    <div className="flex flex-col items-center">
      <header className="flex flex-col justify-center bg-white text-black items-center">
        <img className="logo" src={Logo} />
        <h1 className="text-sm font-bold">باشگاه کوهنوردان آرش</h1>
      </header>
      <div className="menu w-full flex justify-between mt-4">
        <Link to="/" className="link-mn">
          <p>خانه</p>
        </Link>
        <Link to="/about" className="link-mn">
          <p>درباره ما</p>
        </Link>
        <Link to="/events" className="link-mn">
          <p>رویدادها</p>
        </Link>
        <Link to="/gallery" className="link-mn">
          <p>گالری</p>
        </Link>
        <Link to="/contact" className="link-mn">
          <p>تماس با ما</p>
        </Link>
      </div>
    </div>
  );
};

export default Layout;
