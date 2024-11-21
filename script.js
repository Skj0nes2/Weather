const form = document.getElementById('location-form');
    const input = document.getElementById('location-input');
    const weatherInfo = document.getElementById('weather-info');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = input.value.trim();
      
      // variable called API Key
      const APIKey = 'b9de789d9e6f0bf6cbd501f7773e92ef';
      fetch(`https://api.weatherstack.com/current?access_key=${APIKey}&query=${encodeURIComponent(location)}`)
        .then(response => response.json())
        .then(data => {
          renderWeatherData(data);
        })
        .catch(error => {
          console.log(error);
          weatherInfo.innerHTML = '<p class="text-danger">Please try again!</p>';
        });

      input.value = '';
    });

    function renderWeatherData(data) {
      const location = data.location;
      const currentWeather = data.current;
      currentWeather.temperatureF = currentWeather.temperature * (9/5) + 32;
      currentWeather.feelslikeF = currentWeather.feelslike * (9/5) + 32;
      currentWeather.wind_speedF = currentWeather.wind_speed / 1.609;
      const html = `
        <h2 class="text-center">${location.name}, ${location.country}</h2>
        <div class="text-center">
          <img src="${currentWeather.weather_icons[0]}" alt="${currentWeather.weather_descriptions[0]}" class="weather-icon">
          <p>${currentWeather.weather_descriptions[0]}</p>
          <p>Temperature: ${currentWeather.temperatureF.toFixed(2)}°F or ${currentWeather.temperature} °C</p>
          <p>Feels Like: ${currentWeather.feelslikeF.toFixed(2)}°F or ${currentWeather.feelslike} °C</p>
          <p>Wind Speed: ${currentWeather.wind_speedF.toFixed(2)} MPH or ${currentWeather.wind_speed} Km/h</p>
          <p>Humidity: ${currentWeather.humidity}%</p>
          <p>UV Index: ${currentWeather.uv_index}</p>
        </div>
      `;
      weatherInfo.innerHTML = html;
    }