// function menu() {
// 	const menuIcon = document.getElementById('menu-icon');
// 	const navbar = document.querySelector('.navbar');
  
// 	menuIcon.addEventListener('click', function() {
// 		// menuIcon.classList.toggle('bx-menu');
// 	//   menuIcon.classList.toggle('bx-x');
// 	  navbar.classList.toggle('open');
// 	});
//   }
  
//   document.addEventListener('DOMContentLoaded', function() {
// 	// Hide the content of all sections except "Manage Volunteers" on page load
// 		const sections = document.querySelectorAll('#content > section');
// 		sections.forEach(section => {
// 			if (section.id !== 'overview-manage') {
// 			section.style.display = 'none';
// 			}
// 		});
// 	// Add event listeners to handle navigation clicks
// 	const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
// 	const contentSections = document.querySelectorAll('#content > section');
  
// 	allSideMenu.forEach(item => {
// 	  item.addEventListener('click', function () {
// 		const sectionId = item.getAttribute('data-section');
  
// 		// Show the clicked section and hide the rest
// 		contentSections.forEach(section => {
// 		  if (section.id === sectionId) {
// 			section.style.display = 'block';
// 		  } else {
// 			section.style.display = 'none';
// 		  }
// 		});
// 	  });
// 	});
//   });
  

// function sidebarMenu(){

// 	// TOGGLE SIDEBAR
// 	const menuBar = document.querySelector('#sidebar .bx.bx-menu');
// 	const sidebar = document.getElementById('sidebar');

// 	menuBar.addEventListener('click', function () {
// 		sidebar.classList.toggle('hide');
// 	})

// }

// // Load the Google Sheets API client library
// gapi.load('client', initClient);

// function initClient() {
// 	console.log('Initializing Google Sheets API client...');

// 		gapi.client.init({
// 		apiKey: 'AIzaSyC7tw8dMRcbxgVtEuBIpvihpNShlEaeiFs',
// 		clientId: '527569998356-ommqafq99gj1ma8cfcvmjla89ds3pksk.apps.googleusercontent.com',
// 		discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//     	scope: 'https://www.googleapis.com/auth/spreadsheets',
// 		accessToken: 'ya29.a0AbVbY6NjLgfqpbGSxdzk4fd0VgS54UojzCrdG1lwLKDcbSA40Rt9V16w269K4-Dp39jui9XclsewQz7aUxb8YqX0nDmIaDmTajCXnoYrTicRIBtY2f-la6gp9hSi3KI9Ifv0VAZdadhPtenSlbwsAP9aatxFaCgYKAXASARMSFQFWKvPlXTv9VgN16giO8tOOXINvRA0163' // Replace with the obtained access token

// 		}).then(() => {
			 

// 			// Call your function to fetch timestamp from the sheet
// 			fetchTimestampFromSheet(userEmail, volunteerName, organization)
// 			  .then(timestamp => {
// 				// Process the retrieved timestamp
// 				console.log('Timestamp:', timestamp);
// 			  })
// 			  .catch(error => {
// 				console.error('Error fetching timestamp from sheet:', error);
// 			  });
// 		  }).catch((error) => {
// 			console.error('Error initializing Google Sheets API:', error);
// 		  });
// }
  
// function authenticateAndExecute(apiCall) {
// 	return new Promise((resolve, reject) => {
// 	  gapi.load('client:auth2', () => {
// 		gapi.client.init({
// 		  apiKey: 'AIzaSyC7tw8dMRcbxgVtEuBIpvihpNShlEaeiFs', // Replace with your API key
// 		  clientId: '527569998356-ommqafq99gj1ma8cfcvmjla89ds3pksk.apps.googleusercontent.com', // Replace with your client ID
// 		  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
// 		  scope: 'https://www.googleapis.com/auth/spreadsheets',
// 		}).then(() => {
// 		  gapi.auth2.getAuthInstance().signIn().then(() => {
// 			apiCall().then(resolve).catch(reject);
// 		  }).catch(reject);
// 		}).catch(reject);
// 	  });
// 	});
//   }
  


  
//   const airtableApiKey = 'keyhRdrFmvbRGMKRk';
//   const airtableBaseId = 'appVuPVt4NexTjNPj';
//   const airtableUserTable = 'User';
//   const airtableVolunteerTable ="Volunteer Opportunity";
//   const airtableEndpoint = `https://api.airtable.com/v0/${airtableBaseId}`;

//   // Get the user ID from the URL query parameter
//   const urlParams = new URLSearchParams(window.location.search);
//   const userId = urlParams.get('userId');
//   console.log('User ID:', userId);

//   // Function to fetch user data from Airtable based on the ID
  
//   function fetchUserDataById(userId) {
// 	const query = `filterByFormula={ID}='${userId}'&maxRecords=1`; // Adjust 'ID' to match your column name
// 	const userEndpoint = `${airtableEndpoint}/${airtableUserTable}`;

//     console.log('Fetching user data from Airtable...');
// 	// Before making the fetch request
// 	console.log('Airtable Endpoint:', userEndpoint);
// 	console.log('Query:', query);

// 	return fetch(`${userEndpoint}?${query}`, {
// 	  headers: {
// 		'Authorization': `Bearer ${airtableApiKey}`,
// 		'Content-Type': 'application/json'
// 	  }
// 	})
// 	  .then(response => response.json())
// 	  .then(data => {
// 		if (data.records && data.records.length > 0) {
// 		  const record = data.records[0];
// 		  const recordId = record.id;
// 		  console.log("fetched record id", recordId);

// 		  console.log('User record found. Fetching complete user data...');

// 		  return fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableUserTable}/${recordId}`, {
// 			headers: {
// 			  'Authorization': `Bearer ${airtableApiKey}`,
// 			  'Content-Type': 'application/json'
// 			}
// 		  })
// 			.then(response => response.json())
// 			.then(recordData => {
// 			  console.log('Fetched User Data:', recordData);
// 			  return recordData;
// 			});
// 		} else {
// 		  throw new Error('No matching record found for the provided userId');
// 		}
// 	  })
// 	  .catch(error => {
// 		console.error('Error fetching user data:', error);
// 		throw error;
// 	  });
//   }

//   function fetchVolunteerOpportunities(volunteerIds) {
// 	const volunteerEndpoint = `${airtableEndpoint}/${encodeURIComponent(airtableVolunteerTable)}`;
  
// 	console.log('Fetching volunteer opportunities from Airtable...');
// 	console.log('Volunteer Endpoint:', volunteerEndpoint);
  
// 	return fetch(volunteerEndpoint, {
// 	  headers: {
// 		'Authorization': `Bearer ${airtableApiKey}`,
// 		'Content-Type': 'application/json'
// 	  }
// 	})
// 	  .then(response => response.json())
// 	  .then(volunteerData => {
// 		const extractedVolunteerOpportunities = volunteerData.records
// 		  .filter(volunteer => volunteerIds.includes(volunteer.id))
// 		  .map(volunteer => volunteer);
  
// 		console.log('Filtered Volunteer Opportunities:', extractedVolunteerOpportunities);
  
// 		return extractedVolunteerOpportunities;
// 	  });
//   }
  
//   function fetchTimestampFromSheet(userEmail, volunteerName, organization) {
// 	console.log('Fetching timestamp from Google Sheets...');
// 	const SpreadSheetId = '1V7QKDRUOzjhmI1GzMQj5ah9wUAs5nV3eDKJ2GRh5k5o';

  
// 	const sheetTitle = `${volunteerName} - ${organization}`.trim();
// 	// const SpreadSheetId = '1V7QKDRUOzjhmI1GzMQj5ah9wUAs5nV3eDKJ2GRh5k5o'; // Replace with your actual spreadsheet ID

  
// 	return gapi.client.sheets.spreadsheets.get({
// 	  spreadsheetId: '1V7QKDRUOzjhmI1GzMQj5ah9wUAs5nV3eDKJ2GRh5k5o',
//       includeGridData: false,
// 	})
// 	.then(response => {
// 		const sheets = response.result.sheets;
  
// 		console.log('Sheet Titles:', sheets.map(sheet => sheet.properties.title));

// 		// Find the sheet that matches the volunteer opportunity title
// 		const sheet = sheets.find(sheet => sheet.properties.title.trim() === sheetTitle);
		
// 		if (sheet) {
// 		  const sheetId = sheet.properties.sheetId;
  
// 		  return gapi.client.sheets.spreadsheets.values.get({
// 			spreadsheetId: SpreadSheetId,
// 			range: `'${sheetTitle}'!A:ZZ`, // Replace with the correct range for your sheet
// 		  })
// 			.then(response => {
// 			  const values = response.result.values;
// 			  if (values && values.length > 1) {
// 				const headerRow = values[0];
// 				const emailIndex = headerRow.findIndex(header => header.includes('Email'));
  
// 				if (emailIndex !== -1) {
// 				  // Find the row with matching email
// 				  const row = values.find(row => row[emailIndex] === userEmail);
  
// 				  if (row && row.length > 3) {
// 					return row[0]; // Assuming timestamp is in the 1st column (index 0)
// 				  }
// 				}
// 			  }
  
// 			  return null; // Return null if no matching row or timestamp found
// 			});
// 		} else {
// 		  throw new Error(`Sheet "${sheetTitle}" not found in the spreadsheet.`);
// 		}
// 	  })
// 	  .catch(error => {
// 		console.error('Error fetching timestamp from Google Sheet:', error);
// 		return null; // Return null in case of an error
// 	  });
//   }
  
// // Function to display the user data in the placeholders or containers
// function displayUserData(user, volunteerOpportunities) {
// 	console.log('Displaying user data', user);
// 	const settingProfileContainer = document.getElementById('setting-profile');
// 	settingProfileContainer.innerHTML = `<h2>${user.fields.Name}</h2><p>Email: ${user.fields.Email}</p>`;
  
// 	// Display volunteer opportunities
// 	const volunteerTable = document.getElementById('volunteer-table');
// 	const tbody = volunteerTable.querySelector('tbody');
// 	tbody.innerHTML = '';
  
// 	const timestampPromises = volunteerOpportunities.map(volunteer => {
// 	  const volunteerName = volunteer.fields['Name of Volunteer Opportunity'];
// 	  const organization = volunteer.fields.Organization && volunteer.fields.Organization[0];
// 	  const type = volunteer.fields['Type of Volunteer Work'];
  
// 	  if (volunteerName && organization && type) {
// 		console.log('Fetching timestamp for:', volunteerName);
// 		return fetchTimestampFromSheet(user.fields.Email, volunteerName, organization)
// 		  .then(timestamp => ({
// 			volunteerName,
// 			type,
// 			organization,
// 			timestamp: timestamp || '',
// 		  }));
// 	  } else {
// 		console.warn('Missing required fields for volunteer:', volunteer);
// 		return null;
// 	  }
// 	});
  
// 	Promise.all(timestampPromises)
// 	  .then(timestamps => {
// 		console.log('Timestamps:', timestamps);
// 		timestamps.forEach(timestamp => {
// 		  if (timestamp !== null) {
// 			console.log('Adding row for:', timestamp.volunteerName);
// 			const row = document.createElement('tr');
// 			row.innerHTML = `
// 			  <td>${timestamp.volunteerName}</td>
// 			  <td>${timestamp.type}</td>
// 			  <td>${timestamp.organization}</td>
// 			  <td>${timestamp.timestamp || ''}</td>
// 			  <td>
// 				<input type="date" id="start-time-${timestamp.volunteerName}" value="${timestamp.timestamp}">
// 			  </td>
// 			  <td>
// 				<select id="status-${timestamp.volunteerName}">
// 				  <option value="Pending/Applied">Pending/Applied</option>
// 				  <option value="Current">Current</option>
// 				  <option value="Past">Past</option>
// 				</select>
// 			  </td>
// 			`;
// 			tbody.appendChild(row);
  
// 			// Attach event listeners to the input and select elements
// 			const startTimeInput = document.getElementById(`start-time-${timestamp.volunteerName}`);
// 			startTimeInput.addEventListener('change', () => {
// 			const newStartTime = startTimeInput.value;
// 			console.log(`Updated start Date for ${timestamp.volunteerName}: ${newStartTime}`);
// 			updateStartTimeInSheet(user.fields.Email, timestamp.volunteerName, timestamp.organization, newStartTime);
// 			});
  
// 			const statusSelect = document.getElementById(`status-${timestamp.volunteerName}`);
// 			statusSelect.addEventListener('change', () => {
// 			const newStatus = statusSelect.value;
// 			console.log(`Updated status for ${timestamp.volunteerName}: ${newStatus}`);
// 			updateStatusInSheet(user.fields.Email, timestamp.volunteerName, timestamp.organization, newStatus);
// 			});
// 		}
// 	});
// 	})
// 	.catch(error => {
// 	console.error('Error fetching timestamps:', error);
// 	});
// }


//   // Fetch and display the user data
// fetchUserDataById(userId)
// .then(user => {
//   const volunteerOpportunityNames = user.fields['All Volunteer Experience'];
//   if (volunteerOpportunityNames && volunteerOpportunityNames.length > 0) {
// 	return fetchVolunteerOpportunities(volunteerOpportunityNames)
// 	  .then(volunteerOpportunities => {
// 		displayUserData(user, volunteerOpportunities);
// 	  })
// 	  .catch(error => {
// 		console.error('Error fetching volunteer opportunities:', error);
// 	  });
//   } else {
// 	displayUserData(user, []);
//   }
// })
// .catch(error => {
//   console.error('Error fetching user data:', error);
// });


// // Google Sheets API configuration
// const SpreadSheetId = '1V7QKDRUOzjhmI1GzMQj5ah9wUAs5nV3eDKJ2GRh5k5o';





//   // Function to save the volunteer start time and status to localStorage
// function saveVolunteerData(volunteerName, startTime, status) {
// 	const data = {
// 	  startTime: startTime,
// 	  status: status,
// 	};
// 	localStorage.setItem(volunteerName, JSON.stringify(data));
//   }
  

// // Function to retrieve the volunteer start time and status from localStorage
// function getVolunteerData(volunteerName) {
// 	const data = localStorage.getItem(volunteerName);
// 	return JSON.parse(data);
//   }




  

// // Function to update the start time in the Google Sheet using Apps Script
// function updateStartTimeInSheet(userEmail, volunteerName, organization, newStartTime) {
// 	console.log("user email",userEmail, volunteerName, organization, newStartTime);

// 	const webAppUrl = 'https://script.google.com/macros/s/AKfycbwORAVTbwerxzGfCOoYSzf9ttXuGuohz-Y6vHu9TTN_a1F-dmf1WBixDXA0xcVrF5G-ig/exec'; // Replace with your Apps Script web app URL
// 	const url = `${webAppUrl}?email=${encodeURIComponent(userEmail)}&volunteerName=${encodeURIComponent(
// 	  volunteerName)}&organization=${encodeURIComponent(organization)}&newStartTime=${encodeURIComponent(newStartTime)}`;
//   console.log("web url", url);
// 	fetch(url, { method: 'POST' })
// 	  .then(response => {
// 		if (response.ok) {
// 		  console.log('Start time updated successfully');
// 		} else {
// 		  console.error('Failed to update start time:', response.status);
// 		}
// 	  })
// 	  .catch(error => {
// 		console.error('Error updating start time:', error);
// 	  });
//   }
  
//   // Example function to handle user interactions and trigger the update
//   function handleStartDateChange() {
// 	// Fetch the user's selected start date from the dashboard
// 	const newStartTime = document.getElementById('start-time-${timestamp.volunteerName}').value;
  
// 	// Fetch other necessary data (email, volunteerName, organization)
  

// 	// Call the function to update the start time in the Google Sheet
// 	updateStartTimeInSheet(userEmail, volunteerName, organization, newStartTime);
//   }
  
 
//   // Function to get the volunteer start time from localStorage
// function getStartTimeFromLocalStorage(volunteerName) {
// 	const volunteerData = getVolunteerData(volunteerName);
// 	return volunteerData ? volunteerData.startTime : '';
//   }
  
//   // Function to get the volunteer status from localStorage
//   function getStatusFromLocalStorage(volunteerName) {
// 	const volunteerData = getVolunteerData(volunteerName);
// 	return volunteerData ? volunteerData.status : '';
//   }

  //   function updateStartTimeInSheetAndSave(userEmail, volunteerName, organization, newStartTime) {
// 	console.log('Updating start time in the sheet...');
// 	const sheetTitle = `${volunteerName} - ${organization}`.trim();

// 	gapi.load('client', function () {
// 	  gapi.client.init({
// 		clientId: '527569998356-ommqafq99gj1ma8cfcvmjla89ds3pksk.apps.googleusercontent.com',
//     	discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//     	scope: 'https://www.googleapis.com/auth/spreadsheets',
// 	  }).then(function () {
// 		console.log('Fetching values from the sheet...');
// 		return gapi.client.sheets.spreadsheets.values.get({
// 		  spreadsheetId: SpreadSheetId, // Replace with your spreadsheet ID
// 		  range: `${sheetTitle}!A:ZZ`,
// 		});
// 	  }).then(function (response) {
// 		console.log('Values fetched successfully');
// 		var values = response.result.values;
// 		var headerRow = values[0];
// 		var emailIndex = headerRow.findIndex(header => header.includes('Email Address'));
// 		var startDateIndex = headerRow.findIndex(header => header === 'Start Date');
  
// 		console.log('Header Row:', headerRow);
// 		console.log('Email Index:', emailIndex);
// 		console.log('Start Date Index:', startDateIndex);
  
// 		if (emailIndex !== -1 && startDateIndex !== -1) {
// 		  // Find the row with matching email
// 		  var rowIndex = values.findIndex(row => row[emailIndex] === userEmail);
  
// 		  console.log('Row Index:', rowIndex);
  
// 		  if (rowIndex !== -1) {
// 			values[rowIndex][startDateIndex] = newStartTime;
  
// 			console.log('Updating values in the sheet...');
// 			return gapi.client.sheets.spreadsheets.values.update({
// 			  spreadsheetId: SpreadSheetId, // Replace with your spreadsheet ID
// 			  range: `'${volunteerName} - ${organization}'!A:ZZ`,
// 			  valueInputOption: 'USER_ENTERED',
// 			  resource: {
// 				values: values,
// 			  },
// 			});
// 		  }
// 		}
  
// 		throw new Error('No matching row or Start Date column found');
// 	  }).then(function () {
// 		console.log('Start time updated in the sheet');
// 		// Save the updated start time to localStorage
// 		saveVolunteerData(volunteerName, newStartTime, getStatusFromLocalStorage(volunteerName));
// 	  }).catch(function (error) {
// 		console.error('Error updating start time in the sheet:', error);
// 	  });
// 	});
//   }


const apiKey = 'AIzaSyC7tw8dMRcbxgVtEuBIpvihpNShlEaeiFs';
const clientId = '527569998356-ommqafq99gj1ma8cfcvmjla89ds3pksk.apps.googleusercontent.com';
// const accessToken= 'ya29.a0AbVbY6NjLgfqpbGSxdzk4fd0VgS54UojzCrdG1lwLKDcbSA40Rt9V16w269K4-Dp39jui9XclsewQz7aUxb8YqX0nDmIaDmTajCXnoYrTicRIBtY2f-la6gp9hSi3KI9Ifv0VAZdadhPtenSlbwsAP9aatxFaCgYKAXASARMSFQFWKvPlXTv9VgN16giO8tOOXINvRA0163';

// Global variables to store the access token and refresh token
let accessToken = '';
let refreshToken = '';

// Function to make an API request with the access token
function makeAPIRequest(url) {
  // Include the access token in the request headers
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  // Make the API request using fetch or your preferred HTTP library
  return fetch(url, { headers })
    .then(response => {
      // Check if the access token has expired
      if (response.status === 401) {
        // Access token expired, initiate token refresh
        return refreshAccessToken()
          .then(newAccessToken => {
            // Retry the API request with the new access token
            headers.Authorization = `Bearer ${newAccessToken}`;
            return fetch(url, { headers });
          });
      } else {
        // Access token is still valid, return the response
        return response;
      }
    });
}

// Function to refresh the access token using the refresh token
function refreshAccessToken() {
  // Make a request to the token refresh endpoint with the refresh token
  const refreshTokenEndpoint = 'https://oauth2.googleapis.com/token';
  const body = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: '527569998356-ommqafq99gj1ma8cfcvmjla89ds3pksk.apps.googleusercontent.com',
    client_secret: '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'
  };

  // Send the refresh token request
  return fetch(refreshTokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => {
      // Update the access token and refresh token with the new values
      accessToken = data.access_token;
      refreshToken = data.refresh_token;
	  console.log("Access token", accessToken);
      return accessToken;
    })
    .catch(error => {
      // Handle the refresh token request error
      console.error('Error refreshing access token:', error);
      throw error;
    });
}

// Call this function periodically to check token expiration and refresh it if needed
function checkTokenExpiration() {
	const expirationTime = getExpirationTime(); // Get the expiration time of the access token
	const currentTime = Date.now();
	const timeUntilExpiration = expirationTime - currentTime;
  
	if (timeUntilExpiration <= 0) {
	  // Access token has expired, refresh it
	  refreshAccessToken()
		.then(newAccessToken => {
		  console.log('Access token refreshed successfully');
		})
		.catch(error => {
		  console.error('Error refreshing access token:', error);
		});
	}
  
	// Schedule the next check
	setTimeout(checkTokenExpiration, timeUntilExpiration);
  }


function menu() {
	const menuIcon = document.getElementById('menu-icon');
	const navbar = document.querySelector('.navbar');
  
	menuIcon.addEventListener('click', function() {
	  navbar.classList.toggle('open');
	});
  }
  
  document.addEventListener('DOMContentLoaded', function() {
	const sections = document.querySelectorAll('#content > section');
	sections.forEach(section => {
	  if (section.id !== 'overview-manage') {
		section.style.display = 'none';
	  }
	});
  
	const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
	const contentSections = document.querySelectorAll('#content > section');
  
	allSideMenu.forEach(item => {
	  item.addEventListener('click', function() {
		const sectionId = item.getAttribute('data-section');
  
		contentSections.forEach(section => {
		  if (section.id === sectionId) {
			section.style.display = 'block';
		  } else {
			section.style.display = 'none';
		  }
		});
	  });
	});
  });
  
  function sidebarMenu() {
	const menuBar = document.querySelector('#sidebar .bx.bx-menu');
	const sidebar = document.getElementById('sidebar');
  
	menuBar.addEventListener('click', function() {
	  sidebar.classList.toggle('hide');
	});
  }
  


  const airtableApiKey = 'keyhRdrFmvbRGMKRk';
  const airtableBaseId = 'appVuPVt4NexTjNPj';
  const airtableUserTable = 'User';
  const airtableVolunteerTable = 'Volunteer Opportunity';
  const airtableEndpoint = `https://api.airtable.com/v0/${airtableBaseId}`;
  
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');
  console.log('User ID:', userId);
  
  function fetchUserDataById(userId) {
	const query = `filterByFormula={ID}='${userId}'&maxRecords=1`;
	const userEndpoint = `${airtableEndpoint}/${airtableUserTable}`;
  
	console.log('Fetching user data from Airtable...');
	console.log('Airtable Endpoint:', userEndpoint);
	console.log('Query:', query);
  
	return fetch(`${userEndpoint}?${query}`, {
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json'
	  }
	})
	  .then(response => response.json())
	  .then(data => {
		if (data.records && data.records.length > 0) {
		  const record = data.records[0];
		  const recordId = record.id;
		  console.log("fetched record id", recordId);
  
		  console.log('User record found. Fetching complete user data...');
  
		  return fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableUserTable}/${recordId}`, {
			headers: {
			  'Authorization': `Bearer ${airtableApiKey}`,
			  'Content-Type': 'application/json'
			}
		  })
			.then(response => response.json())
			.then(recordData => {
			  console.log('Fetched User Data:', recordData);
			  return recordData;
			});
		} else {
		  throw new Error('No matching record found for the provided userId');
		}
	  })
	  .catch(error => {
		console.error('Error fetching user data:', error);
		throw error;
	  });
  }
  
  function fetchVolunteerOpportunities(volunteerIds) {
	const volunteerEndpoint = `${airtableEndpoint}/${encodeURIComponent(airtableVolunteerTable)}`;
  
	console.log('Fetching volunteer opportunities from Airtable...');
	console.log('Volunteer Endpoint:', volunteerEndpoint);
  
	return fetch(volunteerEndpoint, {
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json'
	  }
	})
	  .then(response => response.json())
	  .then(volunteerData => {
		const extractedVolunteerOpportunities = volunteerData.records
		  .filter(volunteer => volunteerIds.includes(volunteer.id))
		  .map(volunteer => volunteer);
  
		console.log('Filtered Volunteer Opportunities:', extractedVolunteerOpportunities);
  
		return extractedVolunteerOpportunities;
	  });
  }
  
const spreadsheetId = '1V7QKDRUOzjhmI1GzMQj5ah9wUAs5nV3eDKJ2GRh5k5o';

  function fetchTimestampFromSheet(userEmail, volunteerName, organization) {
	console.log('Fetching timestamp from Google Sheets...');
  
	const sheetTitle = `${volunteerName} - ${organization}`.trim();
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetTitle)}!A:ZZ`;
  
	return fetch(url, {
	  headers: {
		'Authorization': `Bearer ${accessToken}`,
		'Content-Type': 'application/json',
		'X-Goog-Api-Key': apiKey // Include the API key in the request headers

	  }
	})
	.then(response => {
		if (response.status === 403) {
		  console.log('403 Error Response:', response);
		}
		return response.text(); // Use response.text() instead of response.json()
	  })
	  .then(data => {
		console.log('Response Data:', data); // Log the response data
		const values = JSON.parse(data).values; // Parse the response data as JSON and access the values array

		if (values && values.length > 1) {
		  const headerRow = values[0];
		  const emailIndex = headerRow.findIndex(header => header.includes('Email'));
  
		  if (emailIndex !== -1) {
			const row = values.find(row => row[emailIndex] === userEmail);
  
			if (row && row.length > 3) {
			  return row[0]; // Assuming timestamp is in the 1st column (index 0)
			}
		  }
		}
  
		return null; // Return null if no matching row or timestamp found
	  })
	  .catch(error => {
		console.error('Error fetching timestamp from Google Sheet:', error);
		return null; // Return null in case of an error
	  });
  }
  
  function displayUserData(user, volunteerOpportunities) {
	console.log('Displaying user data', user);
	const settingProfileContainer = document.getElementById('setting-profile');
	settingProfileContainer.innerHTML = `<h2>${user.fields.Name}</h2><p>Email: ${user.fields.Email}</p>`;
  
	const volunteerTable = document.getElementById('volunteer-table');
	const tbody = volunteerTable.querySelector('tbody');
	tbody.innerHTML = '';
  
	const timestampPromises = volunteerOpportunities.map(volunteer => {
	  const volunteerName = volunteer.fields['Name of Volunteer Opportunity'];
	  const organization = volunteer.fields.Organization && volunteer.fields.Organization[0];
	  const type = volunteer.fields['Type of Volunteer Work'];
  
	  if (volunteerName && organization && type) {
		console.log('Fetching timestamp for:', volunteerName);
		return fetchTimestampFromSheet(user.fields.Email, volunteerName, organization)
		  .then(timestamp => ({
			volunteerName,
			type,
			organization,
			timestamp: timestamp || '',
		}));
	  } else {
		console.warn('Missing required fields for volunteer:', volunteer);
		return null;
	  }
	});
  
	Promise.all(timestampPromises)
	  .then(timestamps => {
		console.log('Timestamps:', timestamps);
		timestamps.forEach(timestamp => {
		  if (timestamp !== null) {
			console.log('Adding row for:', timestamp.volunteerName);
			const row = document.createElement('tr');
			row.innerHTML = `
			  <td>${timestamp.volunteerName}</td>
			  <td>${timestamp.type}</td>
			  <td>${timestamp.organization}</td>
			  <td>${timestamp.timestamp || ''}</td>
			  <td>
				<input type="date" id="start-time-${timestamp.volunteerName}" value="${timestamp.timestamp}">
			  </td>
			  <td>
				<select id="status-${timestamp.volunteerName}">
				  <option value="Pending/Applied">Pending/Applied</option>
				  <option value="Current">Current</option>
				  <option value="Past">Past</option>
				</select>
			  </td>
			`;
			tbody.appendChild(row);
  
			const startTimeInput = document.getElementById(`start-time-${timestamp.volunteerName}`);
			startTimeInput.addEventListener('change', () => {
			  const newStartTime = startTimeInput.value;
			  console.log(`Updated start Date for ${timestamp.volunteerName}: ${newStartTime}`);
			  updateStartTimeInSheet(user.fields.Email, timestamp.volunteerName, timestamp.organization, newStartTime);
			});
  
			const statusSelect = document.getElementById(`status-${timestamp.volunteerName}`);
			statusSelect.addEventListener('change', () => {
			  const newStatus = statusSelect.value;
			  console.log(`Updated status for ${timestamp.volunteerName}: ${newStatus}`);
			  updateStatusInSheet(user.fields.Email, timestamp.volunteerName, timestamp.organization, newStatus);
			});
		  }
		});
	  })
	  .catch(error => {
		console.error('Error fetching timestamps:', error);
	  });
  }
  
  fetchUserDataById(userId)
	.then(user => {
	  const volunteerOpportunityNames = user.fields['All Volunteer Experience'];
	  if (volunteerOpportunityNames && volunteerOpportunityNames.length > 0) {
		return fetchVolunteerOpportunities(volunteerOpportunityNames)
		  .then(volunteerOpportunities => {
			displayUserData(user, volunteerOpportunities);
		  })
		  .catch(error => {
			console.error('Error fetching volunteer opportunities:', error);
		  });
	  } else {
		displayUserData(user, []);
	  }
	})
	.catch(error => {
	  console.error('Error fetching user data:', error);
	});
  
  function saveVolunteerData(volunteerName, startTime, status) {
	const data = {
	  startTime: startTime,
	  status: status,
	};
	localStorage.setItem(volunteerName, JSON.stringify(data));
  }
  
  function getVolunteerData(volunteerName) {
	const data = localStorage.getItem(volunteerName);
	return JSON.parse(data);
  }
  
  function updateStartTimeInSheet(email, volunteerName, organization, startTime) {
	const url = "https://script.google.com/macros/s/AKfycbwR3WvXLK3jHH25incdX8LFhKM8fJgj6Ha0Oh4rpyzmwHCHe2iwEHw3ZiTQVi3PtQN5Gw/exec";
	
	const formData = {
	  email: email,
	  volunteerName: volunteerName,
	  organization: organization,
	  startTime: startTime,
	};
  
	// Use Axios instead of fetch
	axios.post(url, formData)
	  .then(response => {
		console.log(response.data);
		// Handle success if needed
	  })
	  .catch(error => {
		console.error(error);
		// Handle error if needed
	  });
  }
  
  

  function updateStatusInSheet(email, volunteerName, organization, status) {
	const url = 'https://script.google.com/macros/s/AKfycbwR3WvXLK3jHH25incdX8LFhKM8fJgj6Ha0Oh4rpyzmwHCHe2iwEHw3ZiTQVi3PtQN5Gw/exec'; // Replace this with the web app URL from step 2
	const formData = new FormData();
	formData.append('email', email);
	formData.append('volunteerName', volunteerName);
	formData.append('organization', organization);
	formData.append('startTime', ''); // Set the start time value based on your requirements
	formData.append('status', status);
  
	fetch(url, {
	  method: 'POST',
	  body: formData,
	})
	  .then(response => {
		if (!response.ok) {
		  throw new Error('Failed to update status.');
		}
		console.log(`Status updated for ${volunteerName}.`);
	  })
	  .catch(error => {
		console.error(error);
	  });
  }
  
  
  
//   function handleStartDateChange() {
// 	const newStartTime = document.getElementById('start-time-${timestamp.volunteerName}').value;
// 	updateStartTimeInSheet(userEmail, volunteerName, organization, newStartTime);
//   }
  
  function getStartTimeFromLocalStorage(volunteerName) {
	const volunteerData = getVolunteerData(volunteerName);
	return volunteerData ? volunteerData.startTime : '';
  }
  
  function getStatusFromLocalStorage(volunteerName) {
	const volunteerData = getVolunteerData(volunteerName);
	return volunteerData ? volunteerData.status : '';
  }
  