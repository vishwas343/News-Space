import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import logo_dark from "../assets/logo_dark.svg";
import dark_mode from "../assets/dark_mode_button.png";
import light_mode from "../assets/light_mode.png";
import { ModeContext, LoggedInContext } from "../main";
import { deleteCookie } from "../utils/Cookies";
import { useContext } from "react";

function Navbar() {
  const { isLoggedin, setLoggedin } = useContext(LoggedInContext);
  const { mode, toggleMode } = useContext(ModeContext);
  const navigate = useNavigate();
  return (
    <div
      className={`p-4 bg-gray-100 flex justify-between items-center relative z-10 duration-200 ${
        mode === "light" ? "bg-priOrange " : "bg-primary"
      } md:pl-10 md:pr-10 md:pt-7`}
    >
      <div className="md:ml-16">
        <Link to="/">
          <div className="flex justify-center items-center">
            <img
              src={mode === "light" ? logo : logo_dark}
              alt="logo of OnSpot"
              className="h-20 w-auto max-w-full"
            />
            <div className="flex-col justify-center items-center">
              <span
                className={`block ml-2 mt-5  ${
                  mode === "light" ? "text-black" : "text-gray-100"
                } duration-200 font-semibold text-[13px]`}
              >
                जन आक्रोश
              </span>
              <span
                className={`ml-2 ${
                  mode === "light" ? "text-black" : "text-gray-100"
                } text-[7px]`}
              >
                सत्यं वद, समाचारं प्रदर्शय
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Right section */}
      <div className="flex w-3/5 justify-end md:gap-x-14 md:mr-16 gap-x-4 items-center md:w-4/5 ">
        <div onClick={toggleMode} className="ml-3">
          <img src={mode === "light" ? dark_mode : light_mode} alt="Toggle mode" />
        </div>

        <div>
          {!isLoggedin ? (
            <Link to="/login">
              <button className="bg-primary text-white px-4 py-1 rounded">
                Login
              </button>
            </Link>
          ) : (
            <button
              className="bg-primary text-white px-4 py-1 rounded-xl"
              onClick={() => {
                deleteCookie("jwt");
                setLoggedin(false);
                navigate("/");
              }}
            >
              Logout
            </button>
          )}
        </div>

        
      </div>
    </div>
  );
}

export default Navbar;
