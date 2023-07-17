function menu() {
	const menuIcon = document.getElementById('menu-icon');
	const navbar = document.querySelector('.navbar');
  
	menuIcon.addEventListener('click', function() {
		// menuIcon.classList.toggle('bx-menu');
	//   menuIcon.classList.toggle('bx-x');
	  navbar.classList.toggle('open');
	});
  }
  
  document.addEventListener('DOMContentLoaded', function() {
	// Hide the content of all sections except "Manage Volunteers" on page load
		const sections = document.querySelectorAll('#content > section');
		sections.forEach(section => {
			if (section.id !== 'overview-manage') {
			section.style.display = 'none';
			}
		});
	// Add event listeners to handle navigation clicks
	const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
	const contentSections = document.querySelectorAll('#content > section');
  
	allSideMenu.forEach(item => {
	  item.addEventListener('click', function () {
		const sectionId = item.getAttribute('data-section');
  
		// Show the clicked section and hide the rest
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
  

function sidebarMenu(){

	// TOGGLE SIDEBAR
	const menuBar = document.querySelector('#sidebar .bx.bx-menu');
	const sidebar = document.getElementById('sidebar');

	menuBar.addEventListener('click', function () {
		sidebar.classList.toggle('hide');
	})

}

// Load the Google Sheets API client library
gapi.load('client', initClient);

function initClient() {
	console.log('Initializing Google Sheets API client...');

		gapi.client.init({
		apiKey: 'AIzaSyC7tw8dMRcbxgVtEuBIpvihpNShlEaeiFs',
		clientId: '527569998356-ommqafq99gj1ma8cfcvmjla89ds3pksk.apps.googleusercontent.com',
		discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    	scope: 'https://www.googleapis.com/auth/spreadsheets',
		}).then(() => {
			 // Set the access token for the authenticated user
			 const accessToken = 'USER_ACCESS_TOKEN'; // Replace with the actual access token
			 gapi.auth.setToken({ access_token: accessToken });
			 
			// Call your function to fetch timestamp from the sheet
			fetchTimestampFromSheet(userEmail, volunteerName, organization)
			  .then(timestamp => {
				// Process the retrieved timestamp
				console.log('Timestamp:', timestamp);
			  })
			  .catch(error => {
				console.error('Error fetching timestamp from sheet:', error);
			  });
		  }).catch((error) => {
			console.error('Error initializing Google Sheets API:', error);
		  });
}
  
  const airtableApiKey = 'keyhRdrFmvbRGMKRk';
  const airtableBaseId = 'appVuPVt4NexTjNPj';
  const airtableUserTable = 'User';
  const airtableVolunteerTable ="Volunteer Opportunity";
  const airtableEndpoint = `https://api.airtable.com/v0/${airtableBaseId}`;

  // Get the user ID from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');
  console.log('User ID:', userId);

  // Function to fetch user data from Airtable based on the ID
  
  function fetchUserDataById(userId) {
	const query = `filterByFormula={ID}='${userId}'&maxRecords=1`; // Adjust 'ID' to match your column name
	const userEndpoint = `${airtableEndpoint}/${airtableUserTable}`;

    console.log('Fetching user data from Airtable...');
	// Before making the fetch request
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
  
  
  
  
// Function to display the user data in the placeholders or containers
function displayUserData(user, volunteerOpportunities) {
	console.log('Displaying user data', user);
	const settingProfileContainer = document.getElementById('setting-profile');
	settingProfileContainer.innerHTML = `<h2>${user.fields.Name}</h2><p>Email: ${user.fields.Email}</p>`;
  
	// Display volunteer opportunities
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
          `;
          tbody.appendChild(row);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching timestamps:', error);
    });
}
  

  // Fetch and display the user data
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


// Google Sheets API configuration
const spreadsheetId = '1V7QKDRUOzjhmI1GzMQj5ah9wUAs5nV3eDKJ2GRh5k5o';


function fetchTimestampFromSheet(userEmail, volunteerName, organization) {
	console.log('Fetching timestamp from Google Sheets...');
  
	const sheetTitle = `${volunteerName} - ${organization}`.trim();
	const spreadsheetId = '1V7QKDRUOzjhmI1GzMQj5ah9wUAs5nV3eDKJ2GRh5k5o'; // Replace with your actual spreadsheet ID

  
	return gapi.client.sheets.spreadsheets.get({
	  spreadsheetId: spreadsheetId,
      includeGridData: false,
	})
	.then(response => {
		const sheets = response.result.sheets;
  
		console.log('Sheet Titles:', sheets.map(sheet => sheet.properties.title));

		// Find the sheet that matches the volunteer opportunity title
		const sheet = sheets.find(sheet => sheet.properties.title.trim() === sheetTitle);
		
		if (sheet) {
		  const sheetId = sheet.properties.sheetId;
  
		  return gapi.client.sheets.spreadsheets.values.get({
			spreadsheetId: spreadsheetId,
			range: `'${sheetTitle}'!A:ZZ`, // Replace with the correct range for your sheet
		  })
			.then(response => {
			  const values = response.result.values;
			  if (values && values.length > 1) {
				const headerRow = values[0];
				const emailIndex = headerRow.findIndex(header => header.includes('Email'));
  
				if (emailIndex !== -1) {
				  // Find the row with matching email
				  const row = values.find(row => row[emailIndex] === userEmail);
  
				  if (row && row.length > 3) {
					return row[0]; // Assuming timestamp is in the 1st column (index 0)
				  }
				}
			  }
  
			  return null; // Return null if no matching row or timestamp found
			});
		} else {
		  throw new Error(`Sheet "${sheetTitle}" not found in the spreadsheet.`);
		}
	  })
	  .catch(error => {
		console.error('Error fetching timestamp from Google Sheet:', error);
		return null; // Return null in case of an error
	  });
  }