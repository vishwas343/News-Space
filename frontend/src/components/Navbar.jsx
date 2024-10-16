import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import logo_dark from "../assets/logo_dark.svg";
import dark_mode from "../assets/dark_mode_button.png";
import light_mode from "../assets/light_mode.png";
import { FaPencilAlt } from "react-icons/fa"; // Import pencil icon
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
        mode === "light" ? "bg-priOrange" : "bg-primary"
      } md:pl-10 md:pr-10 md:pt-7`}
    >
      <div className="md:ml-16">
        <Link to="/">
          <div className="flex justify-center items-center">
            <img
              src={mode === "light" ? logo : logo_dark}
              alt="logo of OnSpot"
              className="h-24 w-auto max-w-full"
            />
            <div className="flex-col justify-center items-center ml-2">
              <span
                className={`block mt-5 ${
                  mode === "light" ? "text-black" : "text-gray-100"
                } duration-200 font-semibold text-xl`}
              >
              जन आक्रोशb
              </span>
              <span
                className={`mt-1 ${
                  mode === "light" ? "text-black" : "text-gray-100"
                } text-[12px]`}
              >
                सत्यं वद, समाचारं प्रदर्शय
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Right section */}
      <div className="flex w-3/5 justify-end md:gap-x-14 md:mr-16 gap-x-4 items-center md:w-4/5">
        <div onClick={toggleMode} className="ml-3">
          <img
            src={mode === "light" ? dark_mode : light_mode}
            alt="Toggle mode"
          />
        </div>

        <div className="flex items-center gap-2">
          {!isLoggedin ? (
            <Link to="/login">
              <button className="bg-primary text-white px-4 py-1 rounded">
                Login
              </button>
            </Link>
          ) : (
            <>
              <Link to="/write" className="flex items-center">
                <button className="bg-primary flex text-white px-4 py-1 rounded-xl">
                  <FaPencilAlt className="mr-1" /> {/* Pencil icon */}
                  Write
                </button>
              </Link>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
