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
    return fetch(`https://api.airtable.com/v0/appVuPVt4NexTjNPj/Volunteer Opportunity/${recordId}`, {
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

    //Creating learn-more-container div
    const learnMoreContainer = document.getElementById('learnMoreContainer');

    //Creating learn-more-header div
    const learnMoreHeader = document.createElement('div');
    learnMoreHeader.classList.add('learn-more-header');


    //Name
    const nameValue = document.createElement('h1');
    nameValue.textContent = record.fields['Name of Volunteer Opportunity'] || '';
    learnMoreHeader.appendChild(nameValue);
  
    //Organization
    const organizationValue = document.createElement('h3');
    organizationValue.textContent = record.fields['Organization'] || '';
    learnMoreHeader.appendChild(organizationValue);

    //Apply Now Button
    const secondButton = document.createElement('button');
    secondButton.classList.add('card-button');
    secondButton.textContent = 'Apply Now';
    secondButton.addEventListener('click', () => {
      /// Check if the user is logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in, open the link in a new tab
        const applicationLink = record.fields['Application']; 
        window.open(applicationLink, '_blank');
      } else {
        // User is not logged in, prompt them to the login page
        alert('Please log in to apply.');
        // Redirect to the login page
        window.location.href = 'myAccount.html';
      }
    });
  });

  // Create the like button
  const likeButton = document.createElement('button');
  likeButton.innerHTML = ' <i class="fa-solid fa-heart"></i>';
  likeButton.classList.add('like-button');

   // Check if the user is logged in
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      // User is logged in, fetch the firebaseUserId
      const firebaseUserId = user.uid;
    
      // Fetch the current user's like status for this opportunity
      fetchUserRecordByFirebaseId(firebaseUserId)
        .then(userRecord => {
          if (!userRecord) {
            console.error('User record not found for the given Firebase user ID.');
            return;
          }
    
          const userRecordId = userRecord.id;
          const peopleLiked = record.fields['People Liked'] || [];
          const liked = peopleLiked.includes(userRecordId);
    
          // Add the 'liked' class to the like button if the user has already liked the opportunity
          if (liked) {
            likeButton.classList.add('liked');
          } else {
            likeButton.classList.remove('liked');
          }
        })
        .catch(error => {
          console.error('Error fetching user record:', error);
        });
      }
  })
   // Add event listener to the Like button
   likeButton.addEventListener('click', () => {
    console.log("record", record);
    handleLikeButtonClick(record,likeButton);
  });

    learnMoreHeader.appendChild(secondButton);
    learnMoreHeader.appendChild(likeButton);



    //const locationValue = document.createElement('p');
    //locationValue.textContent = record.fields['Location'] || '';
    //learnMoreHeader.appendChild(locationValue);

    //Creating hr divider
    const hr = document.createElement('hr');

    //Creating Learn More Container div
    const containerLearnMoreDiv = document.createElement('div');
    containerLearnMoreDiv.classList.add('learn-more-container');

    //Creating Learn More Info div
    const learnMoreInfoDiv = document.createElement('div');
    learnMoreInfoDiv.classList.add('learn-more-info');

    //Creating Learn More Details Div
    const learnMoreDetailDiv = document.createElement('div');
    learnMoreDetailDiv.classList.add('learn-more-detail');

    //In Person or Remote
    const inPersonOrRemoteBoxDiv = document.createElement('div');
    const inPersonOrRemoteIcon = document.createElement('div');
    inPersonOrRemoteIcon.innerHTML = '<i class="fa-solid fa-people-roof"></i>';
    inPersonOrRemoteIcon.classList.add('icon');
    const inPersonOrRemoteText = document.createElement('p');
    inPersonOrRemoteText.textContent = record.fields['In Person / Remote'] || '';
    inPersonOrRemoteText.classList.add('text');
    inPersonOrRemoteBoxDiv.appendChild(inPersonOrRemoteIcon);
    inPersonOrRemoteBoxDiv.appendChild(inPersonOrRemoteText);
    inPersonOrRemoteBoxDiv.classList.add('learn-more-box');
    
    //Type of Volunteer Work
    const typeBoxDiv = document.createElement('div');
    const typeIcon = document.createElement('div');
    typeIcon.innerHTML = '<i class="fa-sharp fa-solid fa-hand-holding-heart"></i>';
    typeIcon.classList.add('icon');
    const typeText = document.createElement('p');
    typeText.textContent = record.fields['Type of Volunteer Work'] || '';
    typeText.classList.add('text');
    typeBoxDiv.appendChild(typeIcon);
    typeBoxDiv.appendChild(typeText); 
    typeBoxDiv.classList.add('learn-more-box');

    //Age
    const ageBoxDiv = document.createElement('div');
    const ageIcon = document.createElement('div');
    ageIcon.innerHTML = '<i class="fa-solid fa-child-reaching"></i>';
    ageIcon.classList.add('icon');
    const ageText = document.createElement('p');
    ageText.textContent = record.fields['Age'] || '';
    ageText.classList.add('text');
    ageBoxDiv.appendChild(ageIcon);
    ageBoxDiv.appendChild(ageText);
    ageBoxDiv.classList.add('learn-more-box');

    //Individual or Group
    const individualOrGroupBoxDiv = document.createElement('div');
    const individualOrGroupIcon = document.createElement('div');
    individualOrGroupIcon.innerHTML = '<i class="fa-solid fa-user-plus"></i>';
    individualOrGroupIcon.classList.add('icon');
    const individualOrGroupText = document.createElement('p');
    individualOrGroupText.textContent = record.fields['Individual / Group'] || '';
    individualOrGroupText.classList.add('text');
    individualOrGroupBoxDiv.appendChild(individualOrGroupIcon);
    individualOrGroupBoxDiv.appendChild(individualOrGroupText);
    individualOrGroupBoxDiv.classList.add('learn-more-box');
    
    //Long/Short Commitment
    const commitmentBoxDiv = document.createElement('div');
    const commitmentIcon = document.createElement('div');
    commitmentIcon.innerHTML = '<i class="fa-solid fa-handshake"></i>';
    commitmentIcon.classList.add('icon');
    const commitmentText = document.createElement('p');
    commitmentText.textContent = record.fields['Long / Short Term Commitment '] || '';
    commitmentText.classList.add('text');
    commitmentBoxDiv.appendChild(commitmentIcon);
    commitmentBoxDiv.appendChild(commitmentText);
    commitmentBoxDiv.classList.add('learn-more-box');

    //Related Major
    const relatedMajorBoxDiv  = document.createElement('div');
    const relatedMajorIcon = document.createElement('div');
    relatedMajorIcon.innerHTML = '<i class="fa-solid fa-graduation-cap"></i>';
    relatedMajorIcon.classList.add('icon');
    const relatedMajorText = document.createElement('p');
    relatedMajorText.textContent = record.fields['Related Major '] || '';
    relatedMajorText.classList.add('text');
    relatedMajorBoxDiv.appendChild(relatedMajorIcon);
    relatedMajorBoxDiv.appendChild(relatedMajorText);
    relatedMajorBoxDiv.classList.add('learn-more-box');

    //One Time Event?
    const oneTimeEventBoxDiv  = document.createElement('div');
    const oneTimeEventIcon = document.createElement('div');
    oneTimeEventIcon.innerHTML = '<i class="fa-solid fa-calendar-days"></i>';
    oneTimeEventIcon.classList.add('icon');
    const oneTimeEventText = document.createElement('p');
    oneTimeEventText.textContent = record.fields['One Time Event?'] || '';
    oneTimeEventText.classList.add('text');
    oneTimeEventBoxDiv.appendChild(oneTimeEventIcon);
    oneTimeEventBoxDiv.appendChild(oneTimeEventText);
    oneTimeEventBoxDiv.classList.add('learn-more-box');

    //Learn More Boxes to Learn More Info
    learnMoreInfoDiv.appendChild(inPersonOrRemoteBoxDiv);
    learnMoreInfoDiv.appendChild(typeBoxDiv);
    learnMoreInfoDiv.appendChild(ageBoxDiv);
    learnMoreInfoDiv.appendChild(commitmentBoxDiv);
    learnMoreInfoDiv.appendChild(individualOrGroupBoxDiv);
    learnMoreInfoDiv.appendChild(relatedMajorBoxDiv);
    learnMoreInfoDiv.appendChild(oneTimeEventBoxDiv);

    //Learn More Info to Learn More Container
    containerLearnMoreDiv.appendChild(learnMoreInfoDiv);
    
    //Location
    //const locationBoxDiv = document.createElement('div');
    //locationBoxDiv.classList.add('learn-more-box');
    //const locationIcon = document.createElement('div');
    //locationIcon.innerHTML = '<i class="fa-solid fa-map-location-dot"></i>';
    //locationIcon.classList.add('icon');
    //const locationText = document.createElement('p');
    //locationText.textContent = record.fields['Location'] || '';
    //locationText.classList.add('text');
    //locationBoxDiv.appendChild(locationIcon);
    //locationBoxDiv.appendChild(locationText);
    //learnMoreInfoDiv.appendChild(locationBoxDiv);

    //Overview
    const overviewLabel = document.createElement('label');
    overviewLabel.textContent = 'Overview:';
    const overviewValue = document.createElement('p');
    overviewValue.textContent = record.fields['Overview'] || '';
    learnMoreDetailDiv.appendChild(overviewLabel);
    learnMoreDetailDiv.appendChild(overviewValue);

    //Mission
    const missionLabel = document.createElement('label');
    missionLabel.textContent = 'Organization Mission:';
    const missionValue = document.createElement('p');
    missionValue.textContent = record.fields['Mission'] || '';
    learnMoreDetailDiv.appendChild(missionLabel);
    learnMoreDetailDiv.appendChild(missionValue);

    //Requirements
    const requirementLabel = document.createElement('label');
    requirementLabel.textContent = 'Requirements:';
    const requirementValue = document.createElement('p');
    requirementValue.textContent = record.fields['Requirements'] || '';
    learnMoreDetailDiv.appendChild(requirementLabel);
    learnMoreDetailDiv.appendChild(requirementValue);

    //Responsibilities
    const responsibilitiesLabel = document.createElement('label');
    responsibilitiesLabel.textContent = 'Responsibilities: ';
    const responsibilitiesValue = document.createElement('p');
    responsibilitiesValue.textContent = record.fields['Responsibilities'] || '';
    learnMoreDetailDiv.appendChild(responsibilitiesLabel);
    learnMoreDetailDiv.appendChild(responsibilitiesValue);

    //Age Detail
    const ageDetailValue = document.createElement('p');
    ageDetailValue.textContent = record.fields['Age Detail'] || '';
    if(ageDetailValue.textContent.length !== 0)
    {
      const ageDetailLabel = document.createElement('label');
      ageDetailLabel.textContent = 'Age Information: '; 
      learnMoreDetailDiv.appendChild(ageDetailLabel);
      learnMoreDetailDiv.appendChild(ageDetailValue);
    }

    //Notes
    const notesValue = document.createElement('p');
    notesValue.textContent = record.fields['Notes'] || '';
    if(notesValue.textContent.length !== 0)
    {
      const notesLabel = document.createElement('label');
      notesLabel.textContent = 'Special Notes: '; 
      learnMoreDetailDiv.appendChild(notesLabel);
      learnMoreDetailDiv.appendChild(notesValue);
    }

    //Spot
    const spotValue = document.createElement('p');
    spotValue.textContent = record.fields['Spot'] || '';
    if(spotValue.textContent.length !== 0)
    {
      const spotLabel = document.createElement('label');
      spotLabel.textContent = 'Spot Information: '; 
      learnMoreDetailDiv.appendChild(spotLabel);
      learnMoreDetailDiv.appendChild(spotValue);
    }

    //Commitment Requirements
    const commitValue = document.createElement('p');
    commitValue.textContent = record.fields['Commitment Requirement'] || '';
    if(commitValue.textContent.length !== 0)
    {
      const commitLabel = document.createElement('label');
      commitLabel.textContent = 'Commitment Requirements: '; 
      learnMoreDetailDiv.appendChild(commitLabel);
      learnMoreDetailDiv.appendChild(commitValue);
    }

    //Schedule
    const scheduleLabel = document.createElement('label');
    scheduleLabel.textContent = 'Schedule:';
    const scheduleValue = document.createElement('p');
    scheduleValue.textContent = record.fields['Schedule'] || '';
    learnMoreDetailDiv.appendChild(scheduleLabel);
    learnMoreDetailDiv.appendChild(scheduleValue);

    //Contact
    const contactLabel = document.createElement('label');
    contactLabel.textContent = 'Contact:';
    const contactValue = document.createElement('p');
    contactValue.textContent = record.fields['Contact'] || '';
    learnMoreDetailDiv.appendChild(contactLabel);
    learnMoreDetailDiv.appendChild(contactValue);

    //Location
    const locationLabel = document.createElement('label');
    locationLabel.textContent = 'Location: ';
    const locationValue = document.createElement('p');
    locationValue.textContent = record.fields['Location'] || '';
    learnMoreDetailDiv.appendChild(locationLabel);
    learnMoreDetailDiv.appendChild(locationValue);

    //Application
    //const applicationLabel = document.createElement('label');
    //applicationLabel.textContent = 'Application / Sign up Sheet:';
    //const applicationValue = document.createElement('p');
    //applicationValue.textContent = record.fields['Application / Sign up Sheet'] || '';
    //learnMoreDetailDiv.appendChild(applicationLabel);
    //learnMoreDetailDiv.appendChild(applicationValue);

    //More Info
    const moreInfoLabel = document.createElement('label');
    moreInfoLabel.textContent = 'More Information:';
    const moreInfoValue = document.createElement('p');
    const tempLinkVal = record.fields['More Information'] || '';
    moreInfoValue.innerHTML = `<a href="${tempLinkVal}">Click Me</a>`;
    learnMoreDetailDiv.appendChild(moreInfoLabel);
    learnMoreDetailDiv.appendChild(moreInfoValue);


    //Learn More Detail to Learn More Container
    containerLearnMoreDiv.appendChild(learnMoreDetailDiv);

    //Everything to Learn More Container
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
  


    function fetchUserRecordByFirebaseId(firebaseUserId) {
      // Make a request to fetch the user record based on the Firebase user ID
      return fetch(`https://api.airtable.com/v0/appVuPVt4NexTjNPj/User?filterByFormula={ID}="${firebaseUserId}"`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer keyhRdrFmvbRGMKRk',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log("find user record", data.records[0]);
          return data.records[0]; // Assuming the filter will return at most one record
        })
        .catch(error => {
          console.error('Error fetching user record by Firebase ID:', error);
          return null;
        });
    }
    
    function updateVolunteerOpportunityRecord(recordId, updatedFields) {
      // Make a PATCH request to update the Volunteer Opportunity record
      fetch(`https://api.airtable.com/v0/appVuPVt4NexTjNPj/Volunteer%20Opportunity/${recordId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer keyhRdrFmvbRGMKRk',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: updatedFields }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Volunteer Opportunity record updated:', data);
        })
        .catch(error => {
          console.error('Error updating Volunteer Opportunity record:', error);
        });
    }
    
    // Function to handle liking and unliking a volunteer opportunity
    function handleLikeButtonClick(record,likeButton) {
      const user = firebase.auth().currentUser;
      const firebaseUserId = user ? user.uid : null;
    
      if (!firebaseUserId) {
        alert('Please log in to like the volunteer opportunity.');
        window.location.href = 'myAccount.html';
        return;
      }
    
      fetchUserRecordByFirebaseId(firebaseUserId)
        .then(userRecord => {
          if (!userRecord) {
            console.error('User record not found for the given Firebase user ID.');
            return;
          }
    
          const userRecordId = userRecord.id;
          const peopleLiked = record.fields['People Liked'] || [];
          const liked = peopleLiked.includes(userRecordId);
    
          if (liked) {
            // If the user already liked the opportunity, remove the link
            likeButton.classList.remove('liked');
            const updatedPeopleLiked = peopleLiked.filter(id => id !== userRecordId);
            Promise.all([
              updateVolunteerOpportunityRecord(record.id, { 'People Liked': updatedPeopleLiked }),
            ])
              .then(() => {
                console.log('Like removed successfully.');
                record.fields['People Liked'] = updatedPeopleLiked; // Update the record object with the new "People Liked" data
              })
              .catch(error => {
                console.error('Error removing like:', error);
              });
          } else {
            // If the user hasn't liked the opportunity, add the link
            likeButton.classList.add('liked');
            const updatedPeopleLiked = [...peopleLiked, userRecordId];
            Promise.all([
              updateVolunteerOpportunityRecord(record.id, { 'People Liked': updatedPeopleLiked }),
            ])
              .then(() => {
                console.log('Like added successfully.');
                record.fields['People Liked'] = updatedPeopleLiked; // Update the record object with the new "People Liked" data
              })
              .catch(error => {
                console.error('Error adding like:', error);
              });
          }
        })
        .catch(error => {
          console.error('Error fetching user record:', error);
        });
    }
    
    
    