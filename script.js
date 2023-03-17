"use strict";

const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const bmiBtn = document.getElementById("bmi-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tbodyEl = document.getElementById("tbody");

//Array chứa toàn bộ pet
const petArr = [];

//Validate data
const validateData = function (data) {
  // check id
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      return false;
    }
  }

  //check age
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }

  //check weight
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }

  //check length
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }

  //check type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }
  //check breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }

  return true;
};

//clear input
const clearInput = function () {
  (idInput.value = ""),
    (nameInput.value = ""),
    (ageInput.value = ""),
    (typeInput.value = ""),
    (weightInput.value = ""),
    (lengthInput.value = ""),
    (colorInput.value = "#000000"),
    (breedInput.value = ""),
    (vaccinatedInput.checked = false),
    (dewormedInput.checked = false),
    (sterilizedInput.checked = false);
};

//render table
const renderTableData = function (arr) {
  deleteTable();
  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${arr[i].id}</th>
      <td>${arr[i].name}</td>
      <td>${arr[i].age}</td>
      <td>${arr[i].type}</td>
      <td>${arr[i].weight} kg</td>
      <td>${arr[i].length} cm</td>
      <td>${arr[i].breed}</td>
      <td>
          <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
      </td>

      <td>
      ${
        petArr[i].vaccinated === true
          ? `<i class="bi bi-check-circle-fill"></i>`
          : `
        <i class="bi bi-x-circle-fill"></i>
      `
      }
      </td>
      <td>
      ${
        petArr[i].Dewormed === true
          ? `<i class="bi bi-check-circle-fill"></i>`
          : `
        <i class="bi bi-x-circle-fill"></i>
      `
      }
      </td>
      <td>
      ${
        petArr[i].Sterilized === true
          ? `<i class="bi bi-check-circle-fill"></i>`
          : `
        <i class="bi bi-x-circle-fill"></i>
      `
      }
      </td>
      <td>${petArr[i].bmi}</td>

      <td>${petArr[i].date}</td>
      <td><button type="button" class="btn btn-danger" onclick="deletePet('${
        petArr[i].id
      }')">Delete</button>
      </td>
      
      `;
    // console.log(row);

    tbodyEl.appendChild(row);
  }
};

//Delete table
const deleteTable = function () {
  tbodyEl.innerHTML = "";
};
deleteTable();

//Detele Pet
const deletePet = function (petId) {
  console.log("dang xóa");
  if (confirm("Are you sure??")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId) {
        petArr.splice(i, 1);
        renderTableData(petArr);
      }
    }
  }
};

// get value from input when click submit
submitBtn.addEventListener("click", function () {
  //object data lưu dữ liệu nhệp vào từ input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    Dewormed: dewormedInput.checked,
    Sterilized: sterilizedInput.checked,
    date: new Date().toLocaleString().split(",")[0],
    bmi: "?",
  };
  const validated = validateData(data);
  if (validated) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  }
});

//Healthy check
let healthyCheck = true;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    // Tạo danh sách healthhy pet từ danh sach pet
    const healthyPetArr = [];
    console.log(petArr);

    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].Dewormed && petArr[i].Sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    console.log(healthyPetArr);

    healthyBtn.textContent = "Show all pet";
    renderTableData(healthyPetArr);
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show healthy pet";

    healthyCheck = true;
  }
});

//caculate BMI
bmiBtn.addEventListener("click", function () {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].type === "Dog") {
      petArr[i].bmi =
        (petArr[i].weight * 703) / (petArr[i].length * petArr[i].length);
    } else {
      petArr[i].bmi =
        (petArr[i].weight * 886) / (petArr[i].length * petArr[i].length);
    }
  }
  renderTableData(petArr);
});
