
let form = document.getElementById("farmerForm");

let name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");

let success = document.getElementById("successMessage");

// Name validation
name.addEventListener("input", function() {
    let error = document.getElementById("nameError");

    if (name.validity.patternMismatch || name.validity.tooShort) {
        name.setCustomValidity("Name must contain at least 3 letters.");
        error.textContent = "Enter a valid name (minimum 3 letters).";
    } else {
        name.setCustomValidity("");
        error.textContent = "";
    }
});

// Email validation
email.addEventListener("input", function() {
    let error = document.getElementById("emailError");

    if (email.validity.typeMismatch) {
        email.setCustomValidity("Enter a valid email address.");
        error.textContent = "Please enter a valid email address.";
    } else {
        email.setCustomValidity("");
        error.textContent = "";
    }
});

// Phone validation
phone.addEventListener("input", function() {
    let error = document.getElementById("phoneError");

    if (phone.validity.patternMismatch) {
        phone.setCustomValidity("Enter a valid 10-digit mobile number.");
        error.textContent = "Number must start with 6–9 and contain 10 digits.";
    } else {
        phone.setCustomValidity("");
        error.textContent = "";
    }
});

// Form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (form.checkValidity()) {
        success.textContent = "Registration successful! Welcome to Smart Agriculture 🌱";
        form.reset();
    } else {
        form.reportValidity();
    }
});

// Clear success message when resetting
form.addEventListener("reset", function() {
    success.textContent = "";

    document.querySelectorAll(".error").forEach(function(error) {
        error.textContent = "";
    });

    name.setCustomValidity("");
    email.setCustomValidity("");
    phone.setCustomValidity("");
});
