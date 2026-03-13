const toggleButton = document.querySelector('.toggle-button');
const navbar = document.querySelector('.navbar');

toggleButton.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

const carsContainer = document.getElementById("carsContainer");
let cars = JSON.parse(localStorage.getItem("cars")) || [];

displayCars();

function displayCars() {
  carsContainer.innerHTML = "";

  if (cars.length === 0) {
    carsContainer.innerHTML = "<p>No cars available</p>";
    return;
  }

  cars.forEach((car) => {
    const card = document.createElement("div");
    card.classList.add("car-card");
    card.innerHTML = `
      <img src="${car.image}" alt="${car.model}">
      <div class="car-info">
        <h3>${car.model}</h3>
        <p>Year: ${car.year}</p>
        <p class="price">$${car.price}</p>
      </div>
    `;
    carsContainer.appendChild(card);

    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease";
      card.style.opacity = 1;
    }, 100);
  });
}
