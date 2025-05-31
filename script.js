async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = '45d74f52d94458848116ec4f9665ec3f'; 
  if (!city) {
    document.getElementById('weatherInfo').innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById('weatherInfo').innerHTML = `<p>City not found. Please try again.</p>`;
      return;
    }

    const { name, sys, main, weather, wind } = data;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    document.getElementById('weatherInfo').innerHTML = `
      <h2>${name}, ${sys.country}</h2>
      <img src="${iconUrl}" alt="${weather[0].description}">
      <p><strong>Temperature:</strong> ${main.temp} °C</p>
      <p><strong>Condition:</strong> ${weather[0].description}</p>
      <p><strong>Humidity:</strong> ${main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${wind.speed} km/h</p>
    `;

  } catch (error) {
    console.error(error);
    document.getElementById('weatherInfo').innerHTML = `<p>Error fetching weather data.</p>`;
  }
}
