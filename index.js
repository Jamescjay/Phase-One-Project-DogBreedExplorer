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

    parentDiv.appendChild(cardDiv);
    dogList.appendChild(parentDiv);
  });
}