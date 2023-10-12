document.addEventListener("DOMContentLoaded", () => {
  fetchDogBreedDetails();
});

function fetchDogBreedDetails(energy = "3") {
  const myHeaders = new Headers();
  myHeaders.append("X-Api-Key", "2ujXDP62s+wRKQKcy/7fng==PsgZKBri0ByBkKtn");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  fetch(`https://api.api-ninjas.com/v1/dogs?energy=${energy}`, requestOptions)
    .then((response) => response.json())
    .then((result) => renderBreeds(result));
}

function renderBreeds(dogs) {
  const dogList = document.getElementById("breeds");
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

    cardDiv.addEventListener("click", () => {
      displayDogDetails(dog);
    });
  });
}

function displayDogDetails(dog) {

  const detailsDiv = document.getElementById("details");
  detailsDiv.style.display = "block";

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