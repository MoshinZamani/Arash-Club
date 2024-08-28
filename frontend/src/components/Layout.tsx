import { Link } from "react-router-dom";
import headline from "../assets/images/main.jpg";
import portal from "../assets/images/portal.jpg";
const Layout = () => {
  return (
    <div className="flex flex-col items-center -mb-20">
      <header className="flex justify-center bg-white text-black p-4 h-20">
        <h1 className="text-lg font-bold">باشگاه کوه نوردی آرش</h1>
      </header>
      <div className="border-t-4 border-blue-800 h-200">
        <img src={headline} alt="headline" />
      </div>
      <div className="w-3/4 relative -top-10 flex justify-between bg-white">
        <Link to="/" className="link-mn border-l-2 border-gray-200">
          <img className="icon-mn" src={portal} />
          <p>خانه</p>
        </Link>
        <Link to="/about" className="link-mn border-l-2 border-gray-200">
          <img className="icon-mn" src={portal} />
          درباره ما
        </Link>
        <Link to="/events" className="link-mn border-l-2 border-gray-200">
          <img className="icon-mn" src={portal} />
          <p>رویدادها</p>
        </Link>
        <Link to="/gallery" className="link-mn border-l-2 border-gray-200">
          <img className="icon-mn" src={portal} />
          <p>گالری</p>
        </Link>
        <Link to="/contact" className="link-mn">
          <img className="icon-mn" src={portal} />
          <p>تماس با ما</p>
        </Link>
      </div>
    </div>
  );
};

export default Layout;
