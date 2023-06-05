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
        const cardDiv = createCardDiv(record);
        dataContainer.appendChild(cardDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}



function createCardDiv(record) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('col-12');

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
  cardTitle.textContent = record.fields['Name'] || '';

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

  // Add event listeners to the buttons
  firstButton.addEventListener('click', () => {
    // Handle first button click event here
    window.location.href = `learnMore.html?id=${record.id}`;
  });

  secondButton.addEventListener('click', () => {
    // Handle second button click event here
    window.location.href = 'https://example.com/another-page';
  });

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

