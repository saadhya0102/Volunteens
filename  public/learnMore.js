function menu() {
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.querySelector('.navbar');

  menuIcon.addEventListener('click', function() {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('open');
  });
}

function fetchRecordById(recordId) {
    // Fetch the specific record from Airtable based on the ID
    return fetch(`https://api.airtable.com/v0/appVuPVt4NexTjNPj/Roles/${recordId}`, {
      headers: {
        'Authorization': 'Bearer keyhRdrFmvbRGMKRk',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Record:', data);
        return data;
      });
  }
  
function displayRecordData(record) {

    const learnMoreContainer = document.getElementById('learnMoreContainer');

    const learnMoreHeader = document.createElement('div');
    learnMoreHeader.classList.add('learn-more-header');


    

    const nameValue = document.createElement('h1');
    nameValue.textContent = record.fields['Name'] || '';
  
    const organizationValue = document.createElement('h3');
    organizationValue.textContent = record.fields['Organization'] || '';

    const locationValue = document.createElement('p');
    locationValue.textContent = record.fields['Location'] || '';

    const secondButton = document.createElement('button');
    secondButton.classList.add('card-button');
    secondButton.textContent = 'Apply Now';

    secondButton.addEventListener('click', () => {
      // Handle second button click event here
      const applicationLink = record.fields['Application Form']; 
      window.open(applicationLink, '_blank'); // Open the link in a new tab
    });


    learnMoreHeader.appendChild(organizationValue);
    learnMoreHeader.appendChild(nameValue);
    learnMoreHeader.appendChild(locationValue);
    learnMoreHeader.appendChild(secondButton);


    const hr = document.createElement('hr');

    const containerLearnMoreDiv = document.createElement('div');
    containerLearnMoreDiv.classList.add('learn-more-container');


    const learnMoreInfoDiv = document.createElement('div');
    learnMoreInfoDiv.classList.add('learn-more-info');

    const learnMoreDetailDiv = document.createElement('div');
    learnMoreDetailDiv.classList.add('learn-more-detail');


    const inPersonOrRemoteBoxDiv = document.createElement('div');
    const typeBoxDiv = document.createElement('div');
    const ageBoxDiv = document.createElement('div');
    const locationBoxDiv = document.createElement('div');
    const commitmentBoxDiv = document.createElement('div');
    const individualOrGroupBoxDiv = document.createElement('div');

    inPersonOrRemoteBoxDiv.classList.add('learn-more-box');
    typeBoxDiv.classList.add('learn-more-box');
    ageBoxDiv.classList.add('learn-more-box');
    locationBoxDiv.classList.add('learn-more-box');
    commitmentBoxDiv.classList.add('learn-more-box');
    individualOrGroupBoxDiv.classList.add('learn-more-box');


    const inPersonOrRemoteIcon = document.createElement('div');
    inPersonOrRemoteIcon.innerHTML = '<i class="fa-solid fa-people-roof"></i>';
    inPersonOrRemoteIcon.classList.add('icon');

    const inPersonOrRemoteText = document.createElement('p');
    inPersonOrRemoteText.textContent = record.fields['In Person / Remote'] || '';
    inPersonOrRemoteText.classList.add('text');

    const typeIcon = document.createElement('div');
    typeIcon.innerHTML = '<i class="fa-sharp fa-solid fa-hand-holding-heart"></i>';
    typeIcon.classList.add('icon');

    const typeText = document.createElement('p');
    typeText.textContent = record.fields['Type of Volunteer Work'] || '';
    typeText.classList.add('text');

    const ageIcon = document.createElement('div');
    ageIcon.innerHTML = '<i class="fa-solid fa-child-reaching"></i>';
    ageIcon.classList.add('icon');

    const ageText = document.createElement('p');
    ageText.textContent = record.fields['Age'] || '';
    ageText.classList.add('text');

    const locationIcon = document.createElement('div');
    locationIcon.innerHTML = '<i class="fa-solid fa-map-location-dot"></i>';
    locationIcon.classList.add('icon');

    const locationText = document.createElement('p');
    locationText.textContent = record.fields['Location'] || '';
    locationText.classList.add('text');

    const commitmentIcon = document.createElement('div');
    commitmentIcon.innerHTML = '<i class="fa-solid fa-handshake"></i>';
    commitmentIcon.classList.add('icon');

    const commitmentText = document.createElement('p');
    commitmentText.textContent = record.fields['Long / Short Term Commitment '] || '';
    commitmentText.classList.add('text');

    const individualOrGroupIcon = document.createElement('div');
    individualOrGroupIcon.innerHTML = '<i class="fa-solid fa-user-plus"></i>';
    individualOrGroupIcon.classList.add('icon');

    const individualOrGroupText = document.createElement('p');
    individualOrGroupText.textContent = record.fields['Individual / Group'] || '';
    individualOrGroupText.classList.add('text');


    inPersonOrRemoteBoxDiv.appendChild(inPersonOrRemoteIcon);
    inPersonOrRemoteBoxDiv.appendChild(inPersonOrRemoteText);
    typeBoxDiv.appendChild(typeIcon);
    typeBoxDiv.appendChild(typeText); 
    ageBoxDiv.appendChild(ageIcon);
    ageBoxDiv.appendChild(ageText);
    locationBoxDiv.appendChild(locationIcon);
    locationBoxDiv.appendChild(locationText);
    commitmentBoxDiv.appendChild(commitmentIcon);
    commitmentBoxDiv.appendChild(commitmentText);
    individualOrGroupBoxDiv.appendChild(individualOrGroupIcon);
    individualOrGroupBoxDiv.appendChild(individualOrGroupText);
    learnMoreInfoDiv.appendChild(inPersonOrRemoteBoxDiv);
    learnMoreInfoDiv.appendChild(typeBoxDiv);
    learnMoreInfoDiv.appendChild(ageBoxDiv);
    learnMoreInfoDiv.appendChild(locationBoxDiv);
    learnMoreInfoDiv.appendChild(commitmentBoxDiv);
    learnMoreInfoDiv.appendChild(individualOrGroupBoxDiv);

    containerLearnMoreDiv.appendChild(learnMoreInfoDiv);

    const overviewLabel = document.createElement('label');
    overviewLabel.textContent = 'Overview:';
    const overviewValue = document.createElement('p');
    overviewValue.textContent = record.fields['Overview'] || '';
  
    learnMoreDetailDiv.appendChild(overviewLabel);
    learnMoreDetailDiv.appendChild(overviewValue);

    const missionLabel = document.createElement('label');
    missionLabel.textContent = 'Organization Mission:';
    const missionValue = document.createElement('p');
    missionValue.textContent = record.fields['Mission'] || '';
  
    learnMoreDetailDiv.appendChild(missionLabel);
    learnMoreDetailDiv.appendChild(missionValue);

    const requirementLabel = document.createElement('label');
    requirementLabel.textContent = 'Requirements:';
    const equirementValue = document.createElement('p');
    equirementValue.textContent = record.fields['Requirements'] || '';
  
    learnMoreDetailDiv.appendChild(requirementLabel);
    learnMoreDetailDiv.appendChild(equirementValue);


    const noteLabel = document.createElement('label');
    noteLabel.textContent = 'Notes:';
    const noteValue = document.createElement('p');
    noteValue.textContent = record.fields['Notes'] || '';
  
    learnMoreDetailDiv.appendChild(noteLabel);
    learnMoreDetailDiv.appendChild(noteValue);

    const scheduleLabel = document.createElement('label');
    scheduleLabel.textContent = 'Schedule:';
    const scheduleValue = document.createElement('p');
    scheduleValue.textContent = record.fields['Schedule'] || '';
  
    learnMoreDetailDiv.appendChild(scheduleLabel);
    learnMoreDetailDiv.appendChild(scheduleValue);

    const applicationLabel = document.createElement('label');
    applicationLabel.textContent = 'Application / Sign up Sheet:';
    const applicationValue = document.createElement('p');
    applicationValue.textContent = record.fields['Application / Sign up Sheet'] || '';
  
    learnMoreDetailDiv.appendChild(applicationLabel);
    learnMoreDetailDiv.appendChild(applicationValue);

    const contactLabel = document.createElement('label');
    contactLabel.textContent = 'Contact:';
    const contactValue = document.createElement('p');
    contactValue.textContent = record.fields['Contact'] || '';
  
    learnMoreDetailDiv.appendChild(contactLabel);
    learnMoreDetailDiv.appendChild(contactValue);

    const moreInfoLabel = document.createElement('label');
    moreInfoLabel.textContent = 'More Information:';
    const moreInfoValue = document.createElement('p');
    moreInfoValue.textContent = record.fields['More Information'] || '';
  
    learnMoreDetailDiv.appendChild(moreInfoLabel);
    learnMoreDetailDiv.appendChild(moreInfoValue);


    containerLearnMoreDiv.appendChild(learnMoreDetailDiv);

    learnMoreContainer.appendChild(learnMoreHeader);
    learnMoreContainer.appendChild(hr);
    learnMoreContainer.appendChild(containerLearnMoreDiv);

  }
  
  // Get the record ID from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const recordId = urlParams.get('id');
  
  // Fetch and display the record data
  fetchRecordById(recordId)
    .then(record => {
      displayRecordData(record);
    })
    .catch(error => {
      console.error('Error fetching record:', error);
    });
  