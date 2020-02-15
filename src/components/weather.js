import React from "react";

const Weather = props => (
    <div className="infoWeath">
        {props.city &&
            <div>
                <p>City: {props.city}, {props.country}</p>
                <p>Temperature: {props.temp}</p>
                <p>Sunrise: {props.sunrise}</p>
                <p>Sunset: {props.sunset}</p>
            </div>
        }
        <p className="error">{props.error}</p>
    </div>
);

export default Weather;