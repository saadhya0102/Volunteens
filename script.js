function menu() {
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.querySelector('.navbar');

  menuIcon.addEventListener('click', function() {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('open');
  });
}

menu();



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

//Fetch linked records for each data record
const linkedRecordIds = data.records.map(record => {
  const linkedFieldOrganization = record.fields.Organization;
  const linkedFieldLocation = record.fields.Location;
  console.log('LinkedField:', linkedFieldOrganization);
  console.log('LinkeField:', linkedFieldLocation);
  return {
    record: record,
    organization: linkedFieldOrganization,
    location: linkedFieldLocation
  };
});

Promise.all(linkedRecordIds.map(record =>fetchLinkedRecord(record)))
  .then(linkedRecords =>{
    data.records.forEach((record,index)=> {
      const LinkedRecord = linkedRecords[index];
      

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
        cardOrganization.textContent = LinkedRecord.organization || '';

        const cardLocation = document.createElement('p');
        cardLocation.classList.add('card-location');
        cardLocation.textContent = LinkedRecord.location || '';


        cardContent.appendChild(cardTitle);
        cardContent.appendChild(cardOverview);
        cardContent.appendChild(cardOrganization);
        cardContent.appendChild(cardLocation);

        cardDiv.appendChild(cardImage);
        cardDiv.appendChild(cardContent);

        dataContainer.appendChild(cardDiv);
   
      });
    })
      .catch(error =>{
        console.error('Error fetching linked records:', error);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}



function fetchLinkedRecord(record) {
  console.log('Record:', record);
  // Fetch a linked record by its ID
  const url = `https://api.airtable.com/v0/appVuPVt4NexTjNPj/Volunteer%20Service?filterByFormula=AND(Organization="${record.organization}", Location="${record.location}")`;


  return fetch(url, {
    headers: {
      'Authorization': 'Bearer keyhRdrFmvbRGMKRk',
      'Content-Type': 'application/json'
    }

})
.then(response => {
  if (!response.ok) {
    throw new Error('Unable to fetch linked record');
  }
  return response.json();
})
.then(data => {
  console.log('Fetched LinkedRecord:', data);
    /*
    organization: data.fields['Organization'], // Replace 'Organization' with the actual field name
    // Add more fields as needed
    location: data.fields['Location']
    */
    if (data.records && data.records.length > 0) {
      const linkedRecord = data.records[0];
      const organization = linkedRecord.fields && linkedRecord.fields.Organization ? linkedRecord.fields.Organization : '';
      const location = linkedRecord.fields && linkedRecord.fields.Location ? linkedRecord.fields.Location : '';

      return {
        organization: organization,
        location: location
      };
    } 
    else {
      return {
        organization: '',
        location: ''
      };
    }
  });
}




function updateDataPeriodically(){
  fetchData();
}
