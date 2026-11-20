
const toggle = document.getElementById("irrigationToggle");
const status = document.getElementById("status");
const message = document.getElementById("message");
const controlBox = document.querySelector(".control-box");

// Restore previously saved setting
const savedSetting = localStorage.getItem("irrigation");

if (savedSetting === "ON") {
    toggle.checked = true;
}

// Update application behaviour
function updateIrrigation() {
    if (toggle.checked) {
        status.textContent = "Irrigation is ON";
        message.textContent =
            "Automatic water supply is enabled.";

        status.style.color = "green";
    } else {
        status.textContent = "Irrigation is OFF";
        message.textContent =
            "Water supply is currently disabled.";

        status.style.color = "red";
    }

    controlBox.classList.toggle("active", toggle.checked);

    // Save setting in Local Storage
    localStorage.setItem(
        "irrigation",
        toggle.checked ? "ON" : "OFF"
    );
}

// Listen for toggle changes
toggle.addEventListener("change", updateIrrigation);

// Display the saved setting on page load
updateIrrigation();
