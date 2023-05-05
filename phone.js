const loadPhone = (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data));
};

const displayPhone = (phones) => {
  const displayPhone = document.getElementById("phone-container");

  displayPhone.textContent = " "; //! textcontent or innertext

  // show all btn
  const showAll = document.getElementById("show-all");
  if (phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
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
    </div>
  </div>
     `;
    displayPhone.appendChild(creatDiv);
    // console.log(phone);
  });
  toggleLoader(false);
  //   console.log(phones);
};

document
  .getElementById("button-src")
  .addEventListener("click", function name(params) {
    toggleLoader(true);
    const srcInput = document.getElementById("src-input").value;
    loadPhone(srcInput);
    // console.log(srcInput);
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
// loadPhone("");
