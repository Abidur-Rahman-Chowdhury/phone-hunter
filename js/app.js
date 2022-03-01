// get showing error message element
const getError = document.getElementById("show-error");

// load data by onclick on search button

const loadData = () => {
  const searchInput = document.getElementById("search-btn");
  const searchText = searchInput.value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data));
};
//  display search result in UI
const displayData = (data) => {
  if (data.status == false) {
    getError.textContent = "Sorry, No phone is found";
    const searchInput = document.getElementById("search-btn");
      const searchText = searchInput.value;
      const showCard = document.getElementById("show-card");
      
      showCard.textContent = '';
      searchInput.value = "";
      
  } else {
    getError.textContent = "";
    const searchInput = document.getElementById("search-btn");
    const searchText = searchInput.value;
    const resultData = data.data.slice(0, 20);
    console.log(resultData);
      const showCard = document.getElementById("show-card");
      
      showCard.textContent = '';

    for (const result of resultData) {
        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.classList.add('border-1');
        div.classList.add('text-center');
        
         
        div.innerHTML = `
      
         <div>
             <img src="${result.image}" class="img-fluid" />
        </div>
        <div> 
            <h2 class="mt-2">${result.phone_name}</h2>
            <h4 class="mt-2">${result.brand}</h4>
            <button class="btn search-button" onclick="loadDetails('${result.slug}')"  type="button ">More Details</button>
        </div> 
            `;
        
        showCard.appendChild(div);
        
      }

  }
};

// load more details data 
const loadDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data));
}
// display more details of phone in UI
const displayDetails = (data) => {
    console.log(data.data);

    const showMoreDetails = document.getElementById('show-more-details');
    const div1 = document.createElement('div');
    div1.classList.add('col-5');
    const div2 = document.createElement('div');
    div2.classList.add('col-7');
    div1.innerHTML = `
      <img src="${data.data.image}" class="img-fluid" /> 
    `;

    showMoreDetails.appendChild(div1);
    
}

