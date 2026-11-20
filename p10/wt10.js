
/* Change Description */
let changeBtn = document.getElementById("change-btn");

changeBtn.addEventListener("click", function() {
    let description = document.getElementById("description");

    description.textContent = "Smart sensors help farmers monitor soil, temperature and crops in real time.";

    changeBtn.textContent = "Description Updated";
});


/* Add Sensor */
let addBtn = document.getElementById("add-sensor");

addBtn.addEventListener("click", function() {
    let container = document.getElementById("sensor-container");

    let card = document.createElement("div");

    card.setAttribute("class", "sensor-card");

    card.innerHTML = `
        <h3>Light Sensor</h3>
        <p>Light Level: 80%</p>
        <span>Normal</span>
        <button class="remove-btn">Remove</button>
    `;

    container.appendChild(card);

    // Remove the newly added card
    let removeBtn = card.querySelector(".remove-btn");

    removeBtn.addEventListener("click", function() {
        card.remove();
    });
});


/* Remove Existing Sensors */
let existingButtons = document.querySelectorAll(".remove-btn");

existingButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        button.parentElement.remove();
    });
});


/* Farmer Registration */
let form = document.getElementById("farmer-form");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("farmer-name").value;
    let location = document.getElementById("farm-location").value;

    let list = document.getElementById("farmer-list");

    let farmer = document.createElement("li");

    farmer.textContent = "Farmer Name: " + name + " | Location: " + location;

    list.appendChild(farmer);

    form.reset();
});
