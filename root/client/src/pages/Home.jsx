import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Home.css"; // Make sure to create this CSS file
import Map from "./Map";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };


  return (
    <>
      <div className="home_page">
        <div className="header">
          <img src="/favicon.png" alt="Logo" className="form-logo" />
          <h4>Welcome <span>{username}</span></h4>
          <button onClick={Logout}>LOGOUT</button>
        </div>

          <div className="main-content">
            <div className="map-section">
              <Map></Map>
            </div>
            <div className="list-section">LIST IS HERE</div>
          </div>

      </div>

      <ToastContainer />
    </>
  );
};

export default Home;
