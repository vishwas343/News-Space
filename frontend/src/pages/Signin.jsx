import { setCookie } from "../utils/Cookies";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LoggedInContext, UserContext } from "../main";
import { useNavigate } from "react-router-dom";
import { vkyreq } from "../utils/vkyreq";

function Signin() {
  // importing all environment variables
  const backend  = import.meta.env.VITE_BACKEND_URL;
  const JWTexpireIn = import.meta.env.VITE_JWT_EXPIRES_IN;

  const navigate = useNavigate();
  const { setLoggedin } = useContext(LoggedInContext);

  const {setUserData} = useContext(UserContext);

  const sendLogin = async (userData) => {
    try {
      const res = await axios.post(backend + "/auth/login", userData);
      
      setCookie("jwt", res.data.token, JWTexpireIn || 90);
      setLoggedin(true);
      const userDetailInfo = await vkyreq('get', '/users/me');
      setUserData(userDetailInfo.data.data)

      navigate(-1);

    } catch (error) {
      console.log(error);
    }
  };

  // to update the userInfo
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // to check if the state is updated in google oauth or not...
  const [updated, setUpdated] = useState(false);

  //  // Step 2: Create a state variable
  //  const [isChecked, setIsChecked] = useState(false);

  //  // Step 3: Update the state variable when the checkbox is clicked
  //  const handleCheckboxChange = (event) => {
  //    setIsChecked(event.target.checked);
  //  };
 
  // to send the data is
  useEffect(() => {
    const checkerFunc = () => {
      if (updated) {
        sendLogin(userInfo);
        setUpdated(false);
      }
    };

    checkerFunc();
  }, [updated]);

  return (
    <div className="bg-primary h-screen flex justify-center items-center flex-col">
      <div className="text-white text-3xl font-semibold">Sign In</div>

      <div className="w-11/12 flex flex-col justify-center text-center">
        <div className="text-white mt-5 text-xs text-left">Email</div>
        <div className="">
          <input
            type="text"
            className="h-12 rounded-md bg-secondary placeholder:text-center placeholder-gray-300 w-full text-white text-sm px-3 outline-none"
            placeholder="Enter your Email"
            onChange={() => {
              setUserInfo({ ...userInfo, email: event.target.value });
            }}
          />
        </div>
        <div className="text-white mt-5 text-xs text-left">Password</div>
        <div>
          <input
            type="text"
            className="h-12 rounded-md placeholder:text-center bg-secondary placeholder-gray-300 w-full text-white text-sm px-3 outline-none"
            placeholder="Enter your Password"
            onChange={() => {
              setUserInfo({ ...userInfo, password: event.target.value });
            }}
          />
        </div>
        <div>
          <div> 
            <button className="bg-white text-xl text-primary w-full mt-8 pt-3 pb-3 rounded-3xl" onClick={()=>sendLogin(userInfo)}>
              Login
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
