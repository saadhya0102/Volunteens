function menu() {
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.querySelector('.navbar');

  menuIcon.addEventListener('click', function() {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('open');
  });
}



function fetchDataCard() {
  showLoading();
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
            // Check if the user is logged in
            const user = firebase.auth().currentUser;
            if (user) {
              // User is logged in, fetch the firebaseUserId
              const firebaseUserId = user.uid;
      
              // Fetch the current user's like status for all opportunities
              fetchUserLikedOpportunities(firebaseUserId)
                      likeButton.classList.remove('liked');
                    }
                  });
                })
                .catch(error => {
            }
      

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
      
      const modalityFilter = document.getElementById('modalityFilter');
            modalityFilter.addEventListener('change', () => {
              filterModality(data.records);   
      })
    })

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

  // Create the like button
  const likeButton = document.createElement('button');
  likeButton.innerHTML = ' <i class="fa-solid fa-heart"></i>';
  likeButton.classList.add('like-button');

      // Check if the user is logged in
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is logged in, fetch the firebaseUserId
          const firebaseUserId = user.uid;
      
          // Show the loading spinner while fetching the user's liked status
          const loadingSpinner = document.createElement('div');
          loadingSpinner.classList.add('loading-spinner');
          likeButton.appendChild(loadingSpinner);
      
          // Fetch the current user's like status for this opportunity
          fetchUserRecordByFirebaseId(firebaseUserId)
            .then(userRecord => {
              // Remove the loading spinner
              likeButton.removeChild(loadingSpinner);
      
              console.log("checking liked status");
              if (!userRecord) {
                console.error('User record not found for the given Firebase user ID.');
                return;
              }
              const userRecordId = userRecord.id;
              const peopleLiked = record.fields['People Liked'] || [];
              const liked = peopleLiked.includes(userRecordId);
      
              // Set the initial state of the like button based on the user's like status
              if (liked) {
                likeButton.classList.add('liked');
              } else {
                likeButton.classList.remove('liked');
              }
            })
            .catch(error => {
              // Remove the loading spinner in case of an error
              likeButton.removeChild(loadingSpinner);
      
              console.error('Error fetching user record:', error);
            });
        } else {
          // User is not logged in, handle the like button state accordingly (e.g., remove "liked" class)
          likeButton.classList.remove('liked');
        }
      });

    // Add event listener to the Like button
    likeButton.addEventListener('click', () => {
      console.log("record", record);
      handleLikeButtonClick(record,likeButton);
    });
  

  // Add event listeners to the buttons
  firstButton.addEventListener('click', () => {
    // Handle first button click event here
    window.location.href = `LearnMore.html?id=${record.id}`;
  });

  secondButton.addEventListener('click', () => {
    // Check if the user is logged in
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

  buttonWrapper.appendChild(firstButton);
  buttonWrapper.appendChild(secondButton);
  buttonWrapper.appendChild(likeButton);


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


  // ... (previous code)
  
  

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
      // console.log("find user record", data.records[0]);
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
      console.log("checking 2");
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


function fetchUserLikedOpportunities(firebaseUserId) {
  // Fetch the user record based on the Firebase user ID
  return fetchUserRecordByFirebaseId(firebaseUserId)
    .then(userRecord => {
      if (!userRecord) {
        console.error('User record not found for the given Firebase user ID.');
        return [];
      }

      // Get the list of liked opportunity IDs from the user record
      return userRecord.fields['Liked Opportunities'] || [];
    })
    .catch(error => {
      console.error('Error fetching user liked opportunities:', error);
      return [];
    });
}

// loading function
function showLoading() {
  const loadingContainer = document.getElementById('loadingSpinner');
  loadingContainer.style.display = 'block';
}

function hideLoading() {
  const loadingContainer = document.getElementById('loadingSpinner');
  loadingContainer.style.display = 'none';
}