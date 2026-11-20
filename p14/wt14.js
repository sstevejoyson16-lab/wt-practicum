
// Select HTML elements
let search = document.getElementById("search");
let cards = document.querySelectorAll(".card");
let filterButtons = document.querySelectorAll(".filter-btn");

let information = document.querySelector("#information");
let infoTitle = document.querySelector("#info-title");
let infoDescription = document.querySelector("#info-description");

let noResult = document.getElementById("no-result");
let selectedCategory = "All";

// Technology information
let technologies = [
    {
        name: "Soil Monitoring",
        description: "Soil sensors measure moisture and soil conditions to help farmers maintain healthy soil."
    },
    {
        name: "Smart Irrigation",
        description: "Smart irrigation systems automatically provide water according to crop requirements."
    },
    {
        name: "Crop Monitoring",
        description: "Crop monitoring helps farmers observe plant growth and identify problems early."
    },
    {
        name: "IoT Technology",
        description: "IoT connects farming sensors and devices to collect and share agricultural information."
    },
    {
        name: "Farm Productivity",
        description: "Technology helps farmers improve efficiency and increase agricultural productivity."
    },
    {
        name: "Sustainable Farming",
        description: "Sustainable farming supports eco-friendly methods and conserves natural resources."
    }
];

// Search and Filter Function
function filterCards() {

    let searchText = search.value.toLowerCase();
    let visibleCount = 0;

    cards.forEach(function(card) {

        let name = card.querySelector("h3").textContent.toLowerCase();
        let category = card.getAttribute("data-category");

        let matchesSearch = name.includes(searchText);
        let matchesCategory =
            selectedCategory === "All" ||
            category === selectedCategory;

        let showCard = matchesSearch && matchesCategory;

        card.classList.toggle("hide", !showCard);

        if (showCard) {
            visibleCount++;
        }
    });

    noResult.style.display =
        visibleCount === 0 ? "block" : "none";
}

// Search Event
search.addEventListener("input", filterCards);

// Category Filter Buttons
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove active class from all buttons
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // Add active class to selected button
        button.classList.add("active");

        selectedCategory = button.getAttribute("data-category");

        filterCards();
    });
});

// Learn More Buttons
let learnButtons = document.querySelectorAll(".learn-btn");

learnButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let selectedName = button.getAttribute("data-name");

        // Find selected technology
        let technology = technologies.find(function(item) {
            return item.name === selectedName;
        });

        if (technology) {

            infoTitle.textContent = technology.name;
            infoDescription.textContent = technology.description;

            information.classList.add("show");

            information.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });
});

// Close Information
document.getElementById("close-info")
    .addEventListener("click", function() {

        information.classList.remove("show");
    });

// Accordion Interaction
let accordions = document.querySelectorAll("details");

accordions.forEach(function(item) {

    item.querySelector("summary").addEventListener("click", function() {

        // Close other accordion sections
        accordions.forEach(function(other) {
            if (other !== item) {
                other.open = false;
            }
        });

        item.classList.toggle("active");
    });
});

// Initial display
filterCards();
