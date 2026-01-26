// OpenWeatherMap (One Call 3.0 is paid in many cases; this uses Current + 5-day/3-hour forecast)
const API_KEY = "PASTE_YOUR_OPENWEATHERMAP_KEY_HERE";

// Queen Creek, AZ (adjust if needed)
const LAT = 33.2487;
const LON = -111.6343;

const tempNowEl = document.querySelector("#tempNow");
const conditionsEl = document.querySelector("#conditions");

const day1Label = document.querySelector("#day1Label");
const day2Label = document.querySelector("#day2Label");
const day3Label = document.querySelector("#day3Label");

const day1Temp = document.querySelector("#day1Temp");
const day2Temp = document.querySelector("#day2Temp");
const day3Temp = document.querySelector("#day3Temp");

function formatDayLabel(dateObj) {
  return dateObj.toLocaleDateString("en-US", { weekday: "short" });
}

async function getCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=imperial`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Current weather fetch failed");
  return response.json();
}

async function getForecast() {
  // 5 day / 3 hour forecast endpoint
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=imperial`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Forecast fetch failed");
  return response.json();
}

function pickMiddayTemps(list) {
  // Picks forecast entries around 12:00:00 each day
  const byDate = new Map();

  list.forEach(item => {
    const [dateStr, timeStr] = item.dt_txt.split(" ");
    if (!byDate.has(dateStr)) byDate.set(dateStr, []);
    byDate.get(dateStr).push(item);
  });

  const dates = Array.from(byDate.keys());
  const results = [];

  // skip "today" and take next 3 days
  for (let i = 1; i <= 3; i++) {
    const dateStr = dates[i];
    const dayItems = byDate.get(dateStr) || [];

    // find closest to 12:00:00
    let best = null;
    let bestDiff = Infinity;

    dayItems.forEach(it => {
      const t = it.dt_txt.split(" ")[1]; // HH:MM:SS
      const hour = Number(t.split(":")[0]);
      const diff = Math.abs(12 - hour);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = it;
      }
    });

    if (best) results.push(best);
  }

  return results;
}

async function loadWeather() {
  try {
    const current = await getCurrentWeather();
    tempNowEl.textContent = Math.round(current.main.temp);
    conditionsEl.textContent = current.weather[0].description;

    const forecast = await getForecast();
    const picked = pickMiddayTemps(forecast.list);

    const now = new Date();
    const d1 = new Date(now); d1.setDate(now.getDate() + 1);
    const d2 = new Date(now); d2.setDate(now.getDate() + 2);
    const d3 = new Date(now); d3.setDate(now.getDate() + 3);

    day1Label.textContent = formatDayLabel(d1);
    day2Label.textContent = formatDayLabel(d2);
    day3Label.textContent = formatDayLabel(d3);

    day1Temp.textContent = picked[0] ? Math.round(picked[0].main.temp) : "--";
    day2Temp.textContent = picked[1] ? Math.round(picked[1].main.temp) : "--";
    day3Temp.textContent = picked[2] ? Math.round(picked[2].main.temp) : "--";
  } catch (err) {
    conditionsEl.textContent = "Weather unavailable";
    console.error(err);
  }
}

loadWeather();
