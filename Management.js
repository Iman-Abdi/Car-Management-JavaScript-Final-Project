const toggleButton = document.querySelector('.toggle-button');
const navbar = document.querySelector('.navbar');

toggleButton.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

const form = document.getElementById("carForm");
const carList = document.getElementById("carList");

let cars = JSON.parse(localStorage.getItem("cars")) || [];
let editIndex = null;

displayCars();

form.addEventListener("submit", function(e){
  e.preventDefault();

  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;

  const car = { model, year, price, image };

  if(editIndex === null){
    cars.push(car);
    alert("✅ Car added successfully!");
  } else {
    cars[editIndex] = car;
    editIndex = null;
    alert("✏️ Car updated successfully!");
  }

  localStorage.setItem("cars", JSON.stringify(cars));
  displayCars();
  form.reset();
});

function displayCars() {
  carList.innerHTML = "";
  cars.forEach((car, index) => {
    carList.innerHTML += `
      <div class="car">
        <img src="${car.image}" alt="${car.model}">
        <div class="car-info">
          <h3>${car.model}</h3>
          <p>Year: ${car.year}</p>
          <p class="price">$${car.price}</p>
          <button onclick="editCar(${index})"><i class="fas fa-edit"></i> Edit</button>
          <button onclick="deleteCar(${index})"><i class="fas fa-trash"></i> Delete</button>
        </div>
      </div>
    `;
  });
}

function deleteCar(index) {
  if (confirm("Are you sure you want to delete this car?")) {
    cars.splice(index, 1);
    localStorage.setItem("cars", JSON.stringify(cars));
    displayCars();
    alert("🗑️ Car deleted successfully!");
  }
}

function editCar(index) {
  const car = cars[index];
  document.getElementById("model").value = car.model;
  document.getElementById("year").value = car.year;
  document.getElementById("price").value = car.price;
  document.getElementById("image").value = car.image;

  editIndex = index;

  window.scrollTo({ top: 0, behavior: "smooth" });
}
