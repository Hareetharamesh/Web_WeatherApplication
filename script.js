const apiKey = "978e96db64b9210c22f3e5889f57e44b"; // your key

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const resultBox = document.getElementById("weatherResult");
    const errorBox = document.getElementById("errorMessage");

    if (city === "") {
        errorBox.textContent = "Please enter a city name.";
        resultBox.classList.add("hidden");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
        document.getElementById("condition").innerText = `Condition: ${data.weather[0].description}`;
        document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").innerText = `Wind Speed: ${data.wind.speed} m/s`;

        resultBox.classList.remove("hidden");
        errorBox.textContent = "";

    } catch (error) {
        resultBox.classList.add("hidden");
        errorBox.textContent = "City not found or API error.";
    }
}
