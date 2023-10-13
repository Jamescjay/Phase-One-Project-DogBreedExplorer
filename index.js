
//Manipulating the DOM
document.addEventListener("DOMContentLoaded", () => {
  // Add an event listener to the "input" event for the breed search input, which triggers the "searchBreeds" function
  const breedSearchInput = document.getElementById("breedSearch");
  breedSearchInput.addEventListener("input", searchBreeds);

  // Fetch dog breed details from the public API
  fetchDogBreedDetails();
});

let allBreeds = [];

// Function to fetch dog breed details, with a default energy level of "3"
function fetchDogBreedDetails(energy = "3") {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "2ujXDP62s+wRKQKcy/7fng==PsgZKBri0ByBkKtn");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  fetch(`https://api.api-ninjas.com/v1/dogs?energy=${energy}`, requestOptions)
    .then((response) => response.json()) // Parse the response as JSON
    .then((result) => {
      allBreeds = result; // Store the retrieved dog breed details in the "allBreeds" variable
      renderBreeds(allBreeds); // Render the list of dog breeds
    });
}

// Function to render the list of dog breeds
function renderBreeds(dogs) {
  const dogList = document.getElementById("breeds");

  // Clear the previous content of the dog list
  dogList.innerHTML = "";

  // Loop through the dog data and create a card for each dog
  dogs.forEach((dog) => {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("col");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = dog.image_link;
    img.alt = dog.name;
    img.height = 300;
    cardDiv.appendChild(img);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const title = document.createElement("h5");
    title.textContent = dog.name;
    cardBody.appendChild(title);

    cardDiv.appendChild(cardBody);

    parentDiv.appendChild(cardDiv);
    dogList.appendChild(parentDiv);

    // Add a click event listener to each card to display dog details when a card is clicked
    cardDiv.addEventListener("click", () => {
      displayDogDetails(dog);
      hideDogCards();
    });
  });
}


// Function to display dog details
function displayDogDetails(dog) {
  // Display the dog details container as a block
  const detailsDiv = document.getElementById("details");
  detailsDiv.style.display = "block";

  // Set various details about the dog using DOM manipulation and accessing them in the fetched API
  document.getElementById("dogImage").src = dog.image_link;
  document.getElementById("dogName").textContent = dog.name;
  document.getElementById("dogGrooming").textContent = dog.grooming;
  document.getElementById("strangerRel").textContent = dog.good_with_strangers;
  document.getElementById("dogPlayfulness").textContent = dog.playfulness;
  document.getElementById("dogTrainability").textContent = dog.trainability;
  document.getElementById("dogEnergy").textContent = dog.energy;
  document.getElementById("dogBarking").textContent = dog.barking;
  document.getElementById("maxMale").textContent = dog.max_weight_male;
  document.getElementById("maxFemale").textContent = dog.max_weight_female;
  document.getElementById("minMale").textContent = dog.min_weight_male;
  document.getElementById("minFemale").textContent = dog.min_weight_female;
}

// Function to hide the list of dog cards and other elements in the div by class name container
function hideDogCards() {
  const container = document.querySelector(".container");
  container.style.display = "none"; //applying a style to display none
}

// Function to search and filter dog breeds
function searchBreeds() {
  const searchQuery = document
    .getElementById("breedSearch")
    .value.toLowerCase(); // Get the search query from the input field

  // Filter the list of dog breeds based on the search query
  const filteredBreeds = allBreeds.filter((dog) =>
    dog.name.toLowerCase().includes(searchQuery)
  );

  if (filteredBreeds.length === 0) {
    alert(" Error!!! Breed not found, please try another one."); // Show this alert message if no matching breed is found
  }

  // Render the filtered list of dog breeds
  renderBreeds(filteredBreeds);
}
