import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Home.css"; // Make sure to create this CSS file
import Map from "./Map";
import Country from "./Country";
import Continent from "./Continent";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const continents = [
    { name: "World", id: "world" },
    { name: "Africa", id: "africa" },
    { name: "Asia", id: "asia" },
    { name: "Europe", id: "europe" },
    { name: "North America", id: "northAmerica" },
    { name: "South America", id: "southAmerica" },
    { name: "Australia", id: "australia" }
  ];
  const continentCoordinates = {
    africa: { latitude: 1.6591, longitude: 20.5277, zoomLevel: 3 },
    asia: { latitude: 34.0479, longitude: 100.6197, zoomLevel: 2 },
    europe: { latitude: 54.5260, longitude: 15.2551, zoomLevel: 4 },
    northAmerica: { latitude: 48.5260, longitude: -105.2551, zoomLevel: 3 },
    southAmerica: { latitude: -20.7832, longitude: -55.4915, zoomLevel: 3 },
    australia: { latitude: -25.2744, longitude: 133.7751, zoomLevel: 3 },
    world: { latitude: 0, longitude: 0, zoomLevel: 1 } // Default view for 'World'
  };
  const mapRef = useRef();
  
  

  const handleCountryClick = (countryName) => {
    setSelectedContinent("");
    setSelectedCountry(countryName);
  };
  const handleContinentSelect = (continentId) => {
    const continentData = continentCoordinates[continentId];
    if (continentData) {
      mapRef.current.zoomToCoordinates(continentData);
      setSelectedCountry("");
      setSelectedContinent(continentId);
    }
  };

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
            <Map ref={mapRef} onCountryClick={handleCountryClick} />
            <div className="continent-buttons">
              {continents.map((continent) => (
                <button
                  key={continent.id}
                  onClick={() => handleContinentSelect(continent.id)}
                  className="continent-button"
                >
                  <img src={`./${continent.id}.png`} alt={continent.name} className="continent-icon" />
                </button>
              ))}
            </div>
          </div>
          <div className="list-section">
            {selectedCountry 
              ? <Country name={selectedCountry} />
              : <Continent name={selectedContinent} />}
          </div>
        </div>

      </div>

      <ToastContainer />
    </>
  );
};

export default Home;
