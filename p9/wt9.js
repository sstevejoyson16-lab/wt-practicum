
/* Explore Farming Button */
function showMessage() {
    let message = document.getElementById("message");

    message.textContent = "Welcome to the future of smart farming! 🌱";

    message.classList.add("show-message");

    setTimeout(function() {
        message.classList.remove("show-message");
    }, 3000);
}

/* Learn More Buttons */
let buttons = document.querySelectorAll(".info-btn");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {

        let info = button.nextElementSibling;

        info.classList.toggle("show");

        if (info.classList.contains("show")) {
            button.textContent = "Show Less";
        } else {
            button.textContent = "Learn More";
        }
    });
});

/* Show and Hide Benefits */
let benefitsBtn = document.getElementById("benefits-btn");
let benefits = document.getElementById("benefits-content");

benefitsBtn.addEventListener("click", function() {

    benefits.classList.toggle("hide");

    if (benefits.classList.contains("hide")) {
        benefitsBtn.textContent = "Show Benefits";
    } else {
        benefitsBtn.textContent = "Hide Benefits";
    }
});

/* Registration Notification */
let form = document.getElementById("register-form");
let notification = document.getElementById("notification");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    notification.classList.add("show");

    setTimeout(function() {
        notification.classList.remove("show");
    }, 3000);

    form.reset();
});
