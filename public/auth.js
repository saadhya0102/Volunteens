// Function to show the loading spinner
function showLoading() {
  const loadingSpinner = document.getElementById('loadingSpinner');
  if (loadingSpinner) {
    loadingSpinner.style.display = 'block';
  }
}

// Function to hide the loading spinner
function hideLoading() {
  const loadingSpinner = document.getElementById('loadingSpinner');
  if (loadingSpinner) {
    loadingSpinner.style.display = 'none';
  }
}  

// Function to update last login time and redirect to dashboard
function updateLastLogin(userId) {
  const airtableApiKey = 'keyhRdrFmvbRGMKRk';
  const airtableBaseId = 'appVuPVt4NexTjNPj';
  const airtableTable = 'User';
  const airtableEndpoint = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTable}`;

  const query = `filterByFormula={ID}='${userId}'&maxRecords=1`;

  return axios.get(`${airtableEndpoint}?${query}`, {
    headers: {
      'Authorization': `Bearer ${airtableApiKey}`,
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    const records = response.data.records;
    if (records.length > 0) {
      const recordId = records[0].id;
      const data = {
        records: [
          {
            id: recordId,
            fields: {
              LastLogin: new Date().toISOString()
            }
          }
        ]
      };

      return axios.patch(`${airtableEndpoint}`, data, {
        headers: {
          'Authorization': `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('Last login time saved to Airtable:', response.data);
      })
      .catch((error) => {
        console.error('Error saving last login time to Airtable:', error.message);
        throw error;
      });
    } else {
      console.error('No matching record found for the provided userId');
      // Return a resolved Promise here
      return Promise.resolve();
    }
  })
  .catch((error) => {
    console.error('Error checking user existence in Airtable:', error.message);
    throw error;
  });
}

// Replace with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAygw0ibV2LBXCyPScjPCHO9ejpdqPKZzk",
    authDomain: "volunteen-7bac7.firebaseapp.com",   
    databaseURL: "https://volunteen-7bac7-default-rtdb.firebaseio.com",
    projectId: "volunteen-7bac7",
    storageBucket: "volunteen-7bac7.appspot.com",
    messagingSenderId: "461858974316",
    appId: "1:461858974316:web:bbc6771fd16120f881c649",
    measurementId: "G-BFK4TCD0DE"
};

firebase.initializeApp(firebaseConfig);
  // Enable Firebase Auth persistence
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  // Add authentication state change listener to redirect users to login if not authenticated
  
  
// Check if the user is already logged in, and if so, redirect to the dashboard
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const currentUrl = window.location.href;
    if (currentUrl.includes('myAccount.html')) {
      showLoading(); // Show the loading spinner before redirecting
      const userId = user.uid;
      updateLastLogin(userId)
        .then(() => {
          hideLoading(); // Hide the loading spinner after the dashboard page is loaded
          window.location.href = `User.html?userId=${userId}`;
        })
        .catch((error) => {
          console.error('Error updating last login time:', error);
          // Handle error if necessary
        });
    }
  }
});

// Add an event listener for the 'load' event of the window
window.addEventListener('load', () => {
  // Add a slight delay (e.g., 500 milliseconds) before hiding the spinner
  setTimeout(() => {
    hideLoading(); // Hide the loading spinner after a slight delay
  }, 500);
});

    // Function to log out the user after a specified timeout
  const logoutAfterTimeout = () => {
      firebase.auth().signOut()
        .then(() => {
          alert('You have been automatically logged out due to inactivity.');
          // window.location.href = `myAccount.html`; 
        })
        .catch((error) => {
          console.error('Error logging out:', error);
        });
    };
    
    // Set the timeout (e.g., 30 minutes for 1800000 milliseconds)
    const timeoutDuration = 1800000; // 30 minutes
    let timeout;
    
    // Start the timer when the user is logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Clear the previous timeout (if any) to avoid multiple timeouts
        if (timeout) {
          clearTimeout(timeout);
        }
        // Set the new timeout
        timeout = setTimeout(logoutAfterTimeout, timeoutDuration);
      }
    });



    


  
