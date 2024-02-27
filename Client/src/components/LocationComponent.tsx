import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
type Location = {
  latitude: number;
  longitude: number;
};
const initialState: Location = {
  latitude: 0,
  longitude: 0,
};

const LocationComponent = () => {
  const [currentLocation, setCurrentLocation] = useState(initialState);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    // Initialize react-geocode with  API key
    Geocode.setKey("AIzaSyAv9uMkrSWjx2RF2XeXjBDpfluL5TBc1NA");
    Geocode.setLanguage("en");

    // Fetch current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Get address from coordinates
        Geocode.fromLatLng(latitude, longitude).then(
          (response) => {
            const currentAddress = response.results[0].formatted_address;

            setCurrentLocation({ latitude, longitude });
            setAddress(currentAddress);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <div>
      {currentLocation && (
        <div>
          <p>Latitude: {currentLocation.latitude}</p>
          <p>Longitude: {currentLocation.longitude}</p>
        </div>
      )}

      {address && (
        <div>
          <p>Address: {address}</p>
        </div>
      )}
    </div>
  );
};

export default LocationComponent;
