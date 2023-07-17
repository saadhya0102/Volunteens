function menu() {
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.querySelector('.navbar');

  menuIcon.addEventListener('click', function() {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('open');
  });
}



function fetchDataCard() {
  // Retrieve data from Airtable
  fetch('https://api.airtable.com/v0/appVuPVt4NexTjNPj/Volunteer Opportunity', {
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

      let filteredData = data.records; // Initial data is unfiltered
      console.log('Initial data:', filteredData);


      // Render the initial cards
      filteredData.forEach(record => {
        const cardDiv = createCardDiv(record);
        dataContainer.appendChild(cardDiv);
      });

      // Add event listeners to the filters
      const filters = document.querySelectorAll('.filterContainer select');
      filters.forEach(filter => {
        filter.addEventListener('change', () => {
          filteredData = filterData(data.records);
          console.log('Filtered data:', filteredData);
          renderFilteredData(filteredData);
        });
      });

      const ageFilter = document.getElementById('ageFilter');
      ageFilter.addEventListener('input', () => {
        filteredData = filterData(data.records);
        console.log('Filtered data:', filteredData);
        renderFilteredData(filteredData);
      });
    })

/*
      data.records.forEach(record => {
        const cardDiv = createCardDiv(record);
        dataContainer.appendChild(cardDiv);
      });

      
      const modalityFilter = document.getElementById('modalityFilter');
            modalityFilter.addEventListener('change', () => {
              filterModality(data.records);
            });
          })
        */


    .catch(error => {
      console.error('Error fetching data:', error);
    });
}



function createCardDiv(record) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('col-12','custom-card');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card', 'mb-3');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'no-gutters');

  const imageColumn = document.createElement('div');
  imageColumn.classList.add('col-md-4');

  const cardImage = document.createElement('img');
  cardImage.classList.add('card-image');
  cardImage.src = record.fields['Picture'] || '';

  cardDiv.appendChild(cardBody);
  cardBody.appendChild(rowDiv);
  imageColumn.appendChild(cardImage);
  rowDiv.appendChild(imageColumn);

  const contentColumn = document.createElement('div');
  contentColumn.classList.add('col-md-8');

  const cardBodyInner = document.createElement('div');
  cardBodyInner.classList.add('card-body');

  const cardTitle = document.createElement('h3');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = record.fields['Name of Volunteer Opportunity'] || '';

  const cardOrganization = document.createElement('p');
  cardOrganization.classList.add('card-organization');
  cardOrganization.textContent = record.fields['Organization'] || '';

  const cardOverview = document.createElement('p');
  cardOverview.classList.add('card-overview');
  cardOverview.textContent = record.fields['Overview'] || '';

  const cardLocation = document.createElement('p');
  cardLocation.classList.add('card-location');
  cardLocation.textContent = record.fields['Location'] || '';

  const cardInPersonOrRemote = document.createElement('p');
  cardInPersonOrRemote.classList.add('card-inPersonOrRemote');
  cardInPersonOrRemote.textContent = record.fields['In Person / Remote'] || '';

  const cardAge = document.createElement('p');
  cardAge.classList.add('card-age');
  cardAge.textContent = record.fields['Age'] || '';

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('button-wrapper');

  const firstButton = document.createElement('button');
  firstButton.classList.add('card-button');
  firstButton.textContent = 'Learn More';

  const secondButton = document.createElement('button');
  secondButton.classList.add('card-button');
  secondButton.textContent = 'Apply Now';

  // const secondButton = document.createElement('button');
  // secondButton.classList.add('card-button');
  // secondButton.textContent = 'Apply Now';

  

  // Add event listeners to the buttons
  firstButton.addEventListener('click', () => {
    // Handle first button click event here
    window.location.href = `LearnMore.html?id=${record.id}`;
  });

  secondButton.addEventListener('click', () => {
    // Handle second button click event here
    const applicationLink = record.fields['Application Form']; 
    window.open(applicationLink, '_blank'); // Open the link in a new tab
  });

  // Add event listener to the button
  // secondButton.addEventListener('click', () => {
  //   // Handle second button click event here
  //   const applicationLink = record.fields['Application Form'];
  //   const formContainer = document.createElement('div');
  //   formContainer.innerHTML = `<iframe src="${applicationLink}" width="100%" height="600px" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>`;
  //   cardDiv.appendChild(formContainer);
  // });

  buttonWrapper.appendChild(firstButton);
  buttonWrapper.appendChild(secondButton);

  contentColumn.appendChild(cardBodyInner);
  cardBodyInner.appendChild(cardTitle);
  cardBodyInner.appendChild(cardOrganization);
  cardBodyInner.appendChild(cardOverview);
  cardBodyInner.appendChild(cardLocation);
  cardBodyInner.appendChild(cardAge);
  cardBodyInner.appendChild(cardInPersonOrRemote);
  cardBodyInner.appendChild(buttonWrapper);

  rowDiv.appendChild(contentColumn);


  return cardDiv;
}
/*
function filterModality(records) {
  const modalityFilter = document.getElementById('modalityFilter');
  const filterCriteria = modalityFilter.value.toLowerCase();

  // Filter the records based on the selected filter criteria
  const filteredRecords = records.filter(record => {
    const inPersonOrRemote = String(record.fields['In Person / Remote']).toLowerCase();
    return filterCriteria === 'all' || inPersonOrRemote === filterCriteria;
  });



  // Create a document fragment to build the filtered data cards
  const fragment = document.createDocumentFragment();

  // Generate cards with filtered data
  filteredRecords.forEach(record => {
    const cardDiv = createCardDiv(record);
    fragment.appendChild(cardDiv);
  });

  // Clear the data container
  const dataContainer = document.getElementById('dataList');
  dataContainer.textContent = '';

  // Append the fragment to the data container
  dataContainer.appendChild(fragment);

  console.log('Filtered Records:', filteredRecords);
  console.log('Data Container:', dataContainer);
}

*/

function filterData(records) {
  const modalityFilter = document.getElementById('modalityFilter');
  const typeFilter = document.getElementById('typeFilter');
  const ageFilter = document.getElementById('ageFilter');


  const modalityCriteria = modalityFilter.value;
  const typeCriteria = typeFilter.value;
  const ageCriteria = parseInt(ageFilter.value);


  // Filter the records based on the selected filter criteria
  const filteredRecords = records.filter(record => {
    const modality = record.fields['In Person / Remote'] || '';
    const type = record.fields['Type of Volunteer Work'] || '';
    const age = parseInt(record.fields['Minimum Age'] || 0);

    // Check if the record matches the selected filter criteria
    const modalityMatch = modalityCriteria === '' || modality === modalityCriteria;
    const typeMatch = typeCriteria === '' || type === typeCriteria;
    const ageMatch = isNaN(ageCriteria) || (ageCriteria === 0 && age === 0) || (ageCriteria > 0 && age <= ageCriteria);

    return modalityMatch && typeMatch && ageMatch;
  });
    return filteredRecords;
}

  function renderFilteredData(filteredData) {
    const dataContainer = document.getElementById('dataList');
    dataContainer.innerHTML = '';
  
    // Render the filtered cards
    filteredData.forEach(record => {
      const cardDiv = createCardDiv(record);
      dataContainer.appendChild(cardDiv);
    });
  }
  
  // Call fetchDataCard to start fetching and rendering data
  fetchDataCard();