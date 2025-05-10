const encodedApiKey = "OTA1ZmFkYWZlNjhiNzE1OTFlNDQ1N2QwNDM1OGIxMzc=";
const apiKey = atob(encodedApiKey);

function getCoord() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        document.querySelector(".weatherGPS").innerText =
          "Location access denied!";
      }
    );
  }
}

const getWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    const weatherGPS = document.querySelector(".weatherGPS");
    weatherGPS.classList.remove("hide");

    weatherGPS.innerHTML = `🌍 Location: ${data.name} <br> 💨 Wind Speed:${data.wind.speed} <br> ☁️ Weather: ${data.weather[0].description} <br> 🌡️ Temp: ${data.main.temp}°C<br><br>longitude:${data.coord.lon} <br>  latitude:${data.coord.lat}  `;
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.querySelector(".weatherGPS").innerText =
      "Failed to fetch weather data.";
  }
};
const getWeatherByName = async () => {
  try {
    let city = document.querySelector(".cityInput").value;
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );
    const data = await response.json();
    console.log(data);
    if (data.length > 0) {
      getWeather(data[0].lat, data[0].lon);
    } else {
      document.querySelector(".weatherSRCH").innerText = "City not found!";
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    document.querySelector(".weatherGPS").innerText =
      "Failed to fetch weather data.";
  }
};
