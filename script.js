const API_KEY = "b79212870266b38989d673676bbbafb7";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const City_name = document.getElementById("city");
const Temperature = document.getElementById("temperature");
const Description = document.getElementById("description");
const Image = document.getElementById("weather-icon");
const City_input = document.getElementById("city-input");
const Search_Btn = document.getElementById("search-btn");
const statusMessage = document.getElementById("status-message");

function clearDisplay() {
  City_name.textContent = "";
  Temperature.textContent = "";
  Description.textContent = "";
  Image.style.display = "none";
}

const getWeatherData = async (city) => {
  if (!city) {
    statusMessage.textContent = "Please enter city name.";
    clearDisplay();
    return;
  }

  statusMessage.textContent = `Fetching weather for ${city}...`;
  clearDisplay();

  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if(!response.ok){
      if(response.status===404){
        statusMessage.textContent=`Error: City "${city}" not found.`;
      } else{
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return;
      }

    const data =await response.json();

    const { name } = data;
    const { temp } = data.main;
    const { description, icon } = data.weather[0];

    statusMessage.textContent='';

    City_name.textContent = name;
    Temperature.textContent = `${Math.round(temp)}°C`;
    Description.textContent = description.charAt(0).toUpperCase()+description.slice(1)

    Image.src= `http://openweathermap.org/img/wn/${icon}@2x.png`;
    Image.style = "block";

  } catch (error) {
    console.log('Fetch error:',error);
    statusMessage.textContent='An error occurred while fetching data. Check your network or API key.';
    clearDisplay();
  }
};

Search_Btn.addEventListener("click", () => {
  const city = City_input.value.trim();
  getWeatherData(city);
});

City_input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    Search_Btn.click();
  }
});