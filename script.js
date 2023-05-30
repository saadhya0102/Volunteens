function menu(){
const menu = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menu.addEventListener('click',function(){
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
})
}




function fetchData(){

// Retrieve data from Airtable
fetch('https://api.airtable.com/v0/appVuPVt4NexTjNPj/Roles', {
  headers: {
    'Authorization': 'Bearer keyhRdrFmvbRGMKRk',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {

// Generate cards with data from Airtable
const dataContainer = document.getElementById('dataList');
dataContainer.innerHTML = '';

data.records.forEach(record => {
/*
  const card  = document.createElement('div');
  card.className = 'card';


  const cardImage = document.createElement('img');
  cardImage.className = 'card-image';
  cardImage.src = item.Picture;

  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';

  const cardTitle = document.createElement('h3');
  cardTitle.className = 'card-title';
  cardTitle.textContent = item.Name

  const cardOverview = document.createElement('p');
  cardOverview.className = 'card-overview';
  cardOverview.textContent = item.Overview;

  const cardOrganization = document.createElement('p');
  cardOrganization.className = 'card-organization';
  cardOrganization.textContent = item.Organization;
*/

         const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        const cardImage = document.createElement('img');
        cardImage.classList.add('card-image');
        cardImage.src = record.fields['Picture'] || '';

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = record.fields['Name'] || '';

        const cardOverview = document.createElement('p');
        cardOverview.classList.add('card-overview');
        cardOverview.textContent = record.fields['Overview'] || '';

        const cardOrganization = document.createElement('p');
        cardOrganization.classList.add('card-organization');
        cardOrganization.textContent = record.fields['Organization'] || '';

        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardOverview);
        cardContent.appendChild(cardOrganization);

        cardDiv.appendChild(cardImage);
        cardDiv.appendChild(cardContent);

        dataContainer.appendChild(cardDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


  /*
data.records.forEach(record => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const name = record.fields['Name'] || '';
  const description = record.fields['Overview'] || '';

  cardDiv.innerHTML = `
    <h2 class = "volunteer_title">${name}</h2>
    <p class = "overview">${description}</p>
  `;

  dataContainer.appendChild(cardDiv);
});
})
*/



function updateDataPeriodically(){
  fetchData();
  setInterval(fetchData,5000);
}




