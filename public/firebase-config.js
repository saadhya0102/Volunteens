
const airtableApiKey = 'keyhRdrFmvbRGMKRk';
  const airtableBaseId = 'appVuPVt4NexTjNPj';
  const airtableTable = 'User';
  const airtableEndpoint = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTable}`;

// Signup Function
const signupForm = document.querySelector('.signup form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = signupForm['signup-name'].value;
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const zipcode = signupForm['signup-zipcode'].value;
  const birthday = signupForm['signup-date'].value;
  const gender = signupForm['signup-gender'].value;

  // Sign up with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed up successfully
      const user = userCredential.user;
      const userId = user.uid;
      alert("Registration successfully!!");

    const data = [
        {
          fields: {
            ID: userId,
            Name: name,
            Email: email,
            Zipcode: zipcode,
            Birthday: birthday,
            Gender: gender,
            AccountCreated: new Date().toISOString()
          }
        }
      ];

      console.log("Data", data);
      axios.post(airtableEndpoint, { records: data }, {

        headers: {
          'Authorization': `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          console.log('User information saved to Airtable:', response.data);
        })
        .catch((error) => {
            if (error.response && error.response.data) {
                // Handle validation errors
                const validationErrors = error.response.data;
                console.error('Validation errors:', validationErrors);
              } else {
                // Handle other errors
                console.error('Error saving user information to Airtable:', error);
                alert('An error occurred while saving user information.');

              }
            });

      // Redirect or perform other actions
      // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorMessage);
        alert(error);

    });
});

// Login Function
const loginForm = document.querySelector('.login form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // Sign in with email and password
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User logged in successfully
      const user = userCredential.user;
      const userId = user.uid;
      alert(user.email+" Login successfully!!!");
      // window.location.href = 'User.html'; 
      window.location.href = `User.html?userId=${userId}`;



      // Save last login time to Airtable
    //   const data = {
    //     LastLogin: new Date().toISOString()
    //   };
    const query = `filterByFormula={ID}='${userId}'&maxRecords=1`; // Adjust 'ID' to match your column name

    axios.get(`${airtableEndpoint}?${query}`, {
        headers: {
          'Authorization': `Bearer ${airtableApiKey}`,
          'Content-Type': 'application/json'
        }
      })

      .then((response) => {
        const records = response.data.records;
        if (records.length > 0) {
           const recordId = records[0].id; 


            console.log("record id: " + recordId);
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
      console.log("last login: ", new Date().toISOString());
      console.log("user id: ", userId);

        axios.patch(`${airtableEndpoint}`, data, {

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
        });
        } else {
            console.error('No matching record found for the provided userId');
        }
        })
      // Redirect or perform other actions
      // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);

    });
});



/// Google Sign-In button click event


document.getElementById("google-login").addEventListener("click", function() {
    console.log("Google Sign-In button clicked");
  
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        console.log("Google Sign-In success");
  
        const user = result.user;
        const currentTime = new Date().toISOString();

  
        // Check if the user exists in Airtable
        const query = `filterByFormula={ID}='${user.uid}'&maxRecords=1`; // Adjust 'ID' to match your column name
  
        axios.get(`${airtableEndpoint}?${query}`, {
          headers: {
            'Authorization': `Bearer ${airtableApiKey}`,
            'Content-Type': 'application/json'
          }
        })
          .then((response) => {
            const records = response.data.records;
            if (records.length > 0) {
              // User exists in Airtable, update LastLogin field
              const recordId = records[0].id;
              const data = {
                records: [
                  {
                    id: recordId,
                    fields: {
                      LastLogin: currentTime
                    }
                  }
                ]
              };
  
              // Make an API request to update the user's LastLogin field
              axios.patch(`${airtableEndpoint}`, data, {
                headers: {
                  'Authorization': `Bearer ${airtableApiKey}`,
                  'Content-Type': 'application/json'
                }
              })
                .then((response) => {
                  console.log('Last login time updated in Airtable:', response.data);
                  window.location.href = `User.html?userId=${userCredential.user.uid}`;
                })
                .catch((error) => {
                  console.error('Error updating last login time in Airtable:', error.message);
                });
            } else {
              // User does not exist in Airtable, create a new row with AccountCreated field
              const data = [
                {
                  fields: {
                    ID: user.uid,
                    Name: user.displayName,
                    Email: user.email,
                    LastLogin: currentTime,
                    AccountCreated: currentTime,
                    // Add more fields as needed
                  }
                }
              ];
  
              // Make an API request to create a new row in Airtable
              axios.post(airtableEndpoint, { records: data }, {
                headers: {
                  'Authorization': `Bearer ${airtableApiKey}`,
                  'Content-Type': 'application/json'
                }
              })
                .then((response) => {
                  console.log('New user information saved to Airtable:', response.data);
                  window.location.href = `User.html?userId=${userCredential.user.uid}`;
                })
                .catch((error) => {
                  if (error.response && error.response.data) {
                    // Handle validation errors
                    const validationErrors = error.response.data;
                    console.error('Validation errors:', validationErrors);
                  } else {
                    // Handle other errors
                    console.error('Error saving new user information to Airtable:', error);
                    alert('An error occurred while saving user information.');
                  }
                });
            }
  
          })
          .catch((error) => {
            console.error('Error checking user existence in Airtable:', error.message);
          });
      })
      .catch((error) => {
        console.error("Google Sign-In error:", error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = error.credential;
        // ...
        alert(errorMessage);
      });
  });
  