import React, { useState, useEffect } from 'react';
import './Country.css';
import axios from "axios";
import { set } from 'lodash';

/*
TODO:
-make the rendering work with the France example
-understand why and fix the fact that find does not work
-why is fetchCountryData not being called
-make sure the rendering of Home file with verifying cookie + fetchingData works

*/

const Country = ({ name, visitedCountries, wishlistedCountries }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [status, setStatus] = useState('Not Visited'); // Default status
  const [oldStatus, setOldStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCountryData = async (countryId) => {
        try {
          const response = await axios.get(`http://localhost:4000/country/getCountry/${countryId}`);
          setMessage(response.data.text);
        } catch (error) {
          console.error('Error fetching country data:', error);
        }
    };

    console.log(name); // Debugging purpose
    visitedCountries.forEach(c => {
        console.log("Visited Country: ", c.country);
    });
    

    const visitedCountry = visitedCountries.find(c => c.country === name);
    if (visitedCountry) {
        setStatus('Visited');
        setOldStatus('Visited');
        fetchCountryData(visitedCountry.id);
    }
    else{
        const wishlistedCountry = wishlistedCountries.find(c => c.country === name);
        if (wishlistedCountry) {
            setStatus('Wishlist');
            setOldStatus('Wishlist');
            fetchCountryData(wishlistedCountry.id);
        } 
    }



  }, [name, visitedCountries, wishlistedCountries]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSubmit = () => {
    console.log(`Status: ${status}, Message: ${message}`);
    setIsEditMode(false); // Switch to view mode
    

    //TODO
    if(oldStatus === "Not Visited" && status === "Visited"){
        //create country to add to db and update prop + update user list
    }
    if(oldStatus === "Not Visited" && status === "Wishlist"){
        //create country to add to db and update prop + update user list
    }
    if(oldStatus === "Visited" && status === "Wishlist"){
        //update prop, update user list, update country
    }
    if(oldStatus === "Wishlist" && status === "Visited"){
        //update prop, update user list, update country
    }
    if((oldStatus === "Wishlist" || oldStatus === "Visited") && status === "Not Visited"){
        //delete country, update prop, update user list
    }
  };

  return (
    <div className='country-container'>
        <div>
            {name}
        </div>
        <button onClick={toggleEditMode} className='mode-button'>
                {isEditMode ? ' Switch to View Mode' : ' Switch to Edit Mode'}
        </button>

        {isEditMode ? ( 
            <>
                <div>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Not Visited">Not Visited</option>
                        <option value="Visited">Visited</option>
                        <option value="Wishlist">Wishlist</option>
                    </select>
                </div>
      
                <div className='info'>
                    {status === 'Visited' && (
                        <>
                        Tell your friends about your visit!
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Share your experience..."
                        />
                        </>
                    )}
                    {status === 'Wishlist' && (
                        <>
                        Tell your friends why you want to visit!
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Why is this place on your wishlist?"
                        />
                        </>
                    )}
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </>
        ) : (
            <>
                <div>
                    <div>
                    {status === 'visited' && (
                        <>
                        <div className='prompt-view'>Let me tell you about my visit!</div>
                        <div className='text-view'>
                            {message}
                        </div>
                        </>
                    )}
                    {status === 'wishlist' && (
                        <>
                        <div className='prompt-view'>Let me tell you why I want to visit!</div>
                        <div className='text-view'>
                            {message}
                        </div>
                        </>
                    )}
                </div>
                </div>
                    
            </>
        )}

    </div>
  );
};

export default Country;
