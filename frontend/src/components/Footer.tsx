import { Link } from "react-router-dom";
import About from "./About";

function Footer() {
  return (
    <footer className="bg-main-background bg-fixed bg-cover bg-bottom">
      <About />
      <div className="footer-sources flex justify-center py-8">
        <div className="w-1/5">
          <h2 className="border-b-2 border-white py-4">دسترسی سریع</h2>
          <ul>
            <li>
              <Link target="_self" to="https://msfi.ir/">
                فدراسیون کوهنوردی ایران
              </Link>
            </li>
            <li>
              <Link target="_self" to="https://insurance.ifsm.ir/">
                فدراسیون پزشکی ورزشی جمهوری اسلامی ایران
              </Link>
            </li>
            <li>
              <Link target="_self" to="https://farakouh.ir/">
                سامانه فراکوه
              </Link>
            </li>
            <li>
              <Link target="_self" to="http://www.farsmount.ir">
                هیات کوهنوردی و صعودهای ورزشی استان فارس
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="border-b-2 border-white mr-8 font-extrabold py-4">
            ارتباط با ما
          </h2>
          <div>
            <p></p>
            <p>&nbsp;&nbsp;</p>

            <p></p>

            <ul>
              <li>
                <Link
                  to="https://chat.whatsapp.com/FiRMMYGC4AT2bVo2f102lf"
                  rel="alternate"
                >
                  <img src="/files/whatsapp-logo-image-8.png" alt="" title="" />
                </Link>
              </li>

              <li>
                <Link
                  to="http://www.instagram.com/arashalpineclub.shiraz"
                  rel="alternate"
                >
                  <img
                    src="/files/download-instagram-png-logo-20.png"
                    alt=""
                    title=""
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="power_by text-center py-8">
        <p>کلیه حقوق وب سایت متعلق به باشگاه کوهنوردی آرش می باشد</p>
        <Link to="#">طراحی سایت و سئو : محسن زمانی</Link>
      </div>
    </footer>
  );
}

export default Footer;
