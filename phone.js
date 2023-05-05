const loadPhone = (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data, dataLimit));
};

const displayPhone = (phones, dataLimit) => {
  const displayPhone = document.getElementById("phone-container");

  displayPhone.textContent = " "; //! textcontent or innertext

  // show all btn
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 12) {
    phones = phones.slice(0, 12);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  // phones = phones.slice(0, 20); // ? aita dita joto gulo phone show korabo oita likhte hbe

  // ! no phone found
  const noPhone = document.getElementById("no-phone");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const creatDiv = document.createElement("div");
    creatDiv.classList.add("col");
    creatDiv.innerHTML = `
    <div class="card h-100">
    <img src="${phone.image}" class="card-img-top img-fluid" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">
       ${phone.brand}
      </p>
      <button onclick="phoneDetailsDisplay('${phone.slug}')"  href="#" class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#detailsModal">Details</button>
     
    </div>
  </div>
     `;
    displayPhone.appendChild(creatDiv);
    // console.log(phone);
  });
  toggleLoader(false);
  //   console.log(phones);
};

// common function
const prosessSearch = (dataLimit) => {
  toggleLoader(true);
  const searchText = document.getElementById("src-input").value;
  loadPhone(searchText, dataLimit);
};

//  src btn
document
  .getElementById("button-src")
  .addEventListener("click", function name(params) {
    prosessSearch(10);
  });

// ? enter click eventHandler
document
  .getElementById("src-input")
  .addEventListener("keypress", function nam(e) {
    // console.log(e.key);
    if (e.key === "Enter") {
      prosessSearch(10);
    }
  });
// ? showAll btn
document
  .getElementById("btn-showAll")
  .addEventListener("click", function name(params) {
    prosessSearch();
  });

// loader
const toggleLoader = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

// id funtion
const phoneDetailsDisplay = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  const displayPhone = document.getElementById("detailsModalLabel");
  displayPhone.innerText = phone.name;
  document.getElementById("modal-body").innerHTML = `
   <img class="img-fluid" src="${phone.image}">
   <p class="card-text mt-5"><small class="text-body-secondary mt-5">${
     phone.releaseDate ? phone.releaseDate : "Comming Soon"
   }</small></p>
   </div>
   `;
  console.log(phone);
};
loadPhone("a");
