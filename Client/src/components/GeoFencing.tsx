import { useState, useEffect } from "react";
import geolib from "geolib";
type coordinates = {
  lat: String;
  long: String;
};
const initialState: coordinates = {
  lat: "",
  long: "",
};

const GeofencingComponent = () => {
  const [coordinates, setCoordinates] = useState(initialState);
  const [isInsideGeofence, setIsInsideGeofence] = useState(false);

  useEffect(() => {
    // Function to get the current location using Geolocation API
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const latitudeCo = latitude.toString();
            const longitudeCo = longitude.toString();
            setCoordinates({ lat: latitudeCo, long: longitudeCo });

            // Check if the coordinates are inside a geofence
            const geofenceCoordinates = [
              { latitude: 37.7749, longitude: -122.4194 },
              // Add more geofence coordinates as needed
            ];

            const isInside = geolib.isPointInPolygon(
              { latitude, longitude },
              geofenceCoordinates
            );
            setIsInsideGeofence(isInside);
          },
          (error) => {
            console.error("Error getting current location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getCurrentLocation();
  }, []); // Only run this effect once on mount

  return (
    <div>
      {coordinates && (
        <div>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.long}</p>
        </div>
      )}
      {isInsideGeofence ? (
        <p>You are inside the geofence.</p>
      ) : (
        <p>You are outside the geofence.</p>
      )}
    </div>
  );
};

export default GeofencingComponent;
