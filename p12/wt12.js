
let refreshBtn = document.getElementById("refresh-btn");
let loading = document.getElementById("loading");
let error = document.getElementById("error");
let dataBody = document.getElementById("data-body");
let updatedTime = document.getElementById("updated-time");

// API endpoint (Madurai coordinates for demo)
let url = "https://api.open-meteo.com/v1/forecast?latitude=9.9252&longitude=78.1198&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m";


// Fetch data function
async function getFarmData() {

    loading.textContent = "Loading farm data...";
    loading.style.display = "block";

    error.textContent = "";
    dataBody.innerHTML = "";
    refreshBtn.disabled = true;

    try {

        // Fetch data from API
        let response = await fetch(url);

        // Check response
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        // Convert response into JSON
        let result = await response.json();

        // Get current weather values
        let current = result.current;
        let units = result.current_units;

        // Store sensor information
        let sensors = [
            ["Temperature", current.temperature_2m, units.temperature_2m],
            ["Humidity", current.relative_humidity_2m, units.relative_humidity_2m],
            ["Rainfall", current.precipitation, units.precipitation],
            ["Wind Speed", current.wind_speed_10m, units.wind_speed_10m]
        ];

        // Create table rows dynamically
        sensors.forEach(function(sensor) {

            let row = document.createElement("tr");

            let nameCell = document.createElement("td");
            let valueCell = document.createElement("td");
            let unitCell = document.createElement("td");

            nameCell.textContent = sensor[0];
            valueCell.textContent = sensor[1];
            unitCell.textContent = sensor[2];

            row.appendChild(nameCell);
            row.appendChild(valueCell);
            row.appendChild(unitCell);

            dataBody.appendChild(row);
        });

        // Display updated time
        updatedTime.textContent = "Weather observation time: " + current.time;

    } catch (err) {

        // Display error
        error.textContent = "Unable to load data. Please check your internet connection and try again.";

    } finally {

        // Hide loading message
        loading.style.display = "none";

        // Enable refresh button
        refreshBtn.disabled = false;
    }
}


// Button event
refreshBtn.addEventListener("click", getFarmData);

// Load data when webpage opens
getFarmData();
