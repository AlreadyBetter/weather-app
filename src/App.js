import React from 'react';

import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "289919488e328f028d739a94edd57ee3";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  getWeather = async (event) => {
    event.preventDefault();
    var city = event.target.elements.city.value;
    if (city) {
      
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!api_url) {
        return this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          sunrise: undefined,
          sunset: undefined,
          error: "Weather server is not available"
        });
      }

      const weatherData = await api_url.json();
      console.log(api_url);

      if (weatherData.cod === '404') {
        return this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          sunrise: undefined,
          sunset: undefined,
          error: "City not found"
        });
      }

      var sunset = weatherData.sys.sunset * 1000;
      var date = new Date();
      date.setTime(sunset);
      var sunset_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      var sunrise = weatherData.sys.sunrise * 1000;
      date.setTime(sunrise);
      var sunrise_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      this.setState({
        temp: weatherData.main.temp,
        city: weatherData.name,
        country: weatherData.sys.country,
        sunrise: sunrise_time,
        sunset: sunset_time,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Please, enter city name"
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.getWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;