function menu() {
	const menuIcon = document.getElementById('menu-icon');
	const navbar = document.querySelector('.navbar');
	navbar.classList.add('open');

	menuIcon.addEventListener('click', function() {
	  navbar.classList.toggle('open');
	});
  }


  
  function sidebarMenu() {
	const menuBar = document.querySelector('#sidebar .bx.bx-menu');
	const sidebar = document.getElementById('sidebar');
  
	menuBar.addEventListener('click', function() {
	  sidebar.classList.toggle('hide');
	});

	// Check if the screen size is smaller than 1090px on page load
	if (window.innerWidth < 850) {
		sidebar.classList.add('hide');
	  }
	
	  // Add an event listener to toggle the "hide" class when the window is resized
	  window.addEventListener('resize', function () {
		if (window.innerWidth < 850) {
		  sidebar.classList.add('hide');
		} else {
		  sidebar.classList.remove('hide');
		}
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
  
	document.querySelector('#overview-manage').classList.add('active');

	allSideMenu.forEach(item => {
	  item.addEventListener('click', function() {
		const sectionId = item.getAttribute('data-section');
  
		contentSections.forEach(section => {
		  if (section.id === sectionId) {
			section.style.display = 'block';
			section.classList.add('active'); // Add the 'active-section' class
		  } else {
			section.style.display = 'none';
			section.classList.remove('active'); // Remove the 'active-section' class from other sections
		  }
		});
		// Remove the 'active' class from all menu items and add it to the clicked item
		allSideMenu.forEach(menuItem => {
			menuItem.parentElement.classList.remove('active');
		  });
		  item.parentElement.classList.add('active');
	  });
	});
  });

  document.addEventListener('DOMContentLoaded', () => {
	// Add an event listener to the "Log Out" button
	const logoutButton = document.querySelector('.btn-logout');
	logoutButton.addEventListener('click', () => {
	  // Sign out the user
	  firebase.auth().signOut()
		.then(() => {
		  // User signed out successfully
		  alert('Logged out successfully!');
		  // Redirect to the login page or any other desired page
		  window.location.href = 'myAccount.html'; // Change this to the login page URL
		})
		.catch((error) => {
		  // An error occurred while signing out
		  console.error('Error signing out:', error);
		  alert('An error occurred while signing out.');
		});
	});
  });
  

  
  //User Dashbaord Manage Overviews 
  const airtableApiKey = 'keyhRdrFmvbRGMKRk';
  const airtableBaseId = 'appVuPVt4NexTjNPj';
  const airtableEndpoint = `https://api.airtable.com/v0/${airtableBaseId}`;
  
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');
  console.log('User ID:', userId);

  function fetchUserDataById(userId) {
	const query = `filterByFormula={ID}='${userId}'&maxRecords=1`;
	const userEndpoint = `${airtableEndpoint}/User`;
  
	console.log('Airtable Endpoint:', userEndpoint);
  
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
		const user = record.fields; // Extract the user data from the record
		console.log('Fetched User Data2:', user);
		return user; // Return the user data
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
	const volunteerEndpoint = `${airtableEndpoint}/Volunteer Opportunity`;
  
	// console.log('Fetching volunteer opportunities from Airtable...');
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
		.map(volunteer => volunteer.fields); // Return only the 'fields' property
  
	  console.log('Filtered Volunteer Opportunities:', extractedVolunteerOpportunities);
  
	  return extractedVolunteerOpportunities;
	});
  }
  

  function fetchApplicationStatistics(applicationIds) {
	const applicationEndpoint = `${airtableEndpoint}/Application Statistics`;
  
	console.log('Fetching application statistics from Airtable...');
	console.log('Application Endpoint:', applicationEndpoint);
  
	return fetch(applicationEndpoint, {
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json'
	  }
	})
	.then(response => response.json())
	.then(applicationData => {
	  const extractedApplicationStatistics = applicationData.records
		.filter(application => applicationIds.includes(application.id))
		.map(application => application.fields); // Return only the 'fields' property
  
	  console.log('Filtered Application Statistics:', extractedApplicationStatistics);
  
	  return extractedApplicationStatistics;
	});
  }
  




 // Function to combine Volunteer Opportunities and Application Statistics data
 function combineVolunteerAndApplicationData(volunteerOpportunities, applicationStatistics) {
	const combinedData = [];
	for (let i = 0; i < volunteerOpportunities.length; i++) {
	  const volunteer = volunteerOpportunities[i];
	  const application = applicationStatistics[i];
	  const data = {
		applicationId: application['Application Record ID'], // Add volunteerId property
		volunteerName: volunteer['Name of Volunteer Opportunity'],
		organization: volunteer['Organization'],
		type: volunteer['Type of Volunteer Work'],
		contactInformation: volunteer['Contact'],
		submissionDate: application['Submission Date'],
		startDate: application['Volunteer Start Date'], 
		endDate: application['Volunteer End Date'], 
		status: application.Status,
		role: application['Role/Position'],
		schedule: application['Schedule'],
		hoursVolunteered: application['Hours of Volunteer'],
		volunteerCertificate: application['Volunteer Certificate/Award'], 
	  };
	  combinedData.push(data);
	}
	return combinedData;
  }

function updateStartDateInAirtable(applicationId, newStartDate) {
	console.log("update application ID", applicationId);
	const applicationEndpoint = `${airtableEndpoint}/Application Statistics`; // Assuming 'Application Statistics' is the table name
  
	const data = {
	  fields: {
		'Volunteer Start Date': newStartDate // Replace 'Start Date' with the actual field name in Airtable
	  }
	};
  
	return fetch(`${applicationEndpoint}/${applicationId}`, {
	  method: 'PATCH', // Use 'PATCH' for partial updates or 'PUT' for full updates
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(updatedRecord => {
	  console.log('Start Date updated successfully:', updatedRecord);
	})
	.catch(error => {
	  console.error('Error updating Start Date:', error);
	});
  }

  function updateEndDateInAirtable(applicationId, newEndDate) {
	const applicationEndpoint = `${airtableEndpoint}/Application Statistics`;
  
	const data = {
	  fields: {
		'Volunteer End Date': newEndDate // Replace 'End Date' with the actual field name in Airtable
	  }
	};
  
	return fetch(`${applicationEndpoint}/${applicationId}`, {
	  method: 'PATCH', // Use 'PATCH' for partial updates or 'PUT' for full updates
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	})
	  .then(response => response.json())
	  .then(updatedRecord => {
		console.log('End Date updated successfully:', updatedRecord);
	  })
	  .catch(error => {
		console.error('Error updating End Date:', error);
	  });
  }

function updateStatusInAirtable(applicationId, newStatus) {
	console.log("update application ID", applicationId);
	const applicationEndpoint = `${airtableEndpoint}/Application Statistics`; // Assuming 'Application Statistics' is the table name
  
	const data = {
	  fields: {
		'Status': newStatus // Replace 'Status' with the actual field name in Airtable
	  }
	};
  
	return fetch(`${applicationEndpoint}/${applicationId}`, {
	  method: 'PATCH', // Use 'PATCH' for partial updates or 'PUT' for full updates
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(updatedRecord => {
	  console.log('Status updated successfully:', updatedRecord);
	})
	.catch(error => {
	  console.error('Error updating Status:', error);
	});
  }

  function updateScheduleInAirtable(applicationId, newSchedule) {
	const applicationEndpoint = `${airtableEndpoint}/Application Statistics`;
  
	const data = {
	  fields: {
		'Schedule': newSchedule // Replace 'Schedule' with the actual field name in Airtable
	  }
	};
  
	return fetch(`${applicationEndpoint}/${applicationId}`, {
	  method: 'PATCH', // Use 'PATCH' for partial updates or 'PUT' for full updates
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(updatedRecord => {
	  console.log('Schedule updated successfully:', updatedRecord);
	})
	.catch(error => {
	  console.error('Error updating Schedule:', error);
	});
  }
  
  function updateCertificateAwardInAirtable(applicationId, fileUrl) {
	// Handle the file upload on your server and obtain the file URL or any relevant information
	// For example, you can use a third-party file storage service (e.g., AWS S3) to upload the file and get the URL
  
	// Once you have the file URL or relevant information, update the Airtable record
	const applicationEndpoint = `${airtableEndpoint}/Application Statistics`;
  
	const data = {
	  fields: {
		'Volunteer Certificate/Award': fileUrl 
	  }
	};
  
	return fetch(`${applicationEndpoint}/${applicationId}`, {
	  method: 'PATCH', // Use 'PATCH' for partial updates or 'PUT' for full updates
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	})
	  .then(response => response.json())
	  .then(updatedRecord => {
		console.log('Certificate/Award updated successfully:', updatedRecord);
	  })
	  .catch(error => {
		console.error('Error updating Certificate/Award:', error);
	  });
  }

  
  function updateTotalHoursInAirtable(applicationId, newTotalHours) {
	const applicationEndpoint = `${airtableEndpoint}/Application Statistics`;
  
	const data = {
	  fields: {
		'Hours of Volunteer': newTotalHours
	  }
	};
  
	return fetch(`${applicationEndpoint}/${applicationId}`, {
	  method: 'PATCH',
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(updatedRecord => {
	  console.log('Total Hours updated successfully:', updatedRecord);
	})
	.catch(error => {
	  console.error('Error updating Total Hours:', error);
	});
  }
  
  function updateRoleInAirtable(applicationId, newRole) {
	console.log("update application ID", applicationId);
	const applicationEndpoint = `${airtableEndpoint}/Application Statistics`; // Assuming 'Application Statistics' is the table name
  
	const data = {
	  fields: {
		'Role/Position': newRole // Replace 'Role/Position' with the actual field name in Airtable
	  }
	};
  
	return fetch(`${applicationEndpoint}/${applicationId}`, {
	  method: 'PATCH', // Use 'PATCH' for partial updates or 'PUT' for full updates
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(updatedRecord => {
	  console.log('Role/Position updated successfully:', updatedRecord);
	})
	.catch(error => {
	  console.error('Error updating Role/Position:', error);
	});
  }

  
// Display User Data in the Dashboard
function displayOverviewData(user, combinedData) {

	const volunteerTable = document.getElementById('volunteer-table');
	const tbody = volunteerTable.querySelector('tbody');
  
	// Clear the table body
	tbody.innerHTML = '';
	// Create the data rows
	combinedData.forEach(data => {
		const row = document.createElement('tr');
	
		// const headers = volunteerTable.querySelectorAll('thead th');
		// headers.forEach(header => {
		// const cell = document.createElement('td');
		// cell.textContent = data[header.dataset.key];
		// cell.setAttribute('data-title', header.innerText); // Set the data-title attribute to the th text
		// row.appendChild(cell);
		// });

	  row.innerHTML += `
		<td data-title="Name">${data.volunteerName}</td>
		<td data-title="Organization">${data.organization}</td>
		<td data-title="Type">${data.type}</td>
		<td data-title="Submission Date">${data.submissionDate}</td>
		<td data-title="Start Date">
		  <input type="date" id="start-date-${data.applicationId}" value="${data.startDate}" class="input-field">
		</td>
		<td data-title="Status">
		  <select id="status-${data.applicationId}">
			<option value="Pending/Applied" ${data.status === 'Pending/Applied' ? 'selected' : ''}>Pending/Applied</option>
			<option value="Current" ${data.status === 'Current' ? 'selected' : ''}>Current</option>
			<option value="Past" ${data.status === 'Past' ? 'selected' : ''}>Past</option>
		  </select>
		</td>
	  `;
	  tbody.appendChild(row);
  console.log('row', row);
	  // Add event listener to date input
	  const dateInput = row.querySelector(`#start-date-${data.applicationId}`);
	  dateInput.addEventListener('change', event => {
		const newStartDate = event.target.value;
		updateStartDateInAirtable(data.applicationId, newStartDate);
	  });
  
	  // Add event listener to status <select> element
	  const statusSelect = row.querySelector(`#status-${data.applicationId}`);
	  statusSelect.addEventListener('change', event => {
		const newStatus = event.target.value;
		updateStatusInAirtable(data.applicationId, newStatus);
	  });
	});
  }
  
  


  


function displayAppliedData(combinedData) {
	const appliedTable = document.getElementById('applied-table');
	const tbody = appliedTable.querySelector('tbody');
  
	tbody.innerHTML = '';
  
	const appliedData = combinedData.filter(data => data.status === 'Pending/Applied');
    if (appliedData.length > 0) {
	appliedData.forEach(data => {
	  const row = document.createElement('tr');
	  row.innerHTML = `
		<td data-title="Name">${data.volunteerName}</td>
		<td data-title="Organization">${data.organization}</td>
		<td data-title="Role">
		  <input type="text" id="role-${data.applicationId}" value="${data.role}" class="input-field"/>
		</td>
		<td data-title="Submission Date">${data.submissionDate}</td>
		<td data-title="Contact Information">${data.contactInformation}</td>
	  `;
	  tbody.appendChild(row);
  
	  // Add event listener to role input
	  const roleInput = row.querySelector(`#role-${data.applicationId}`);
	  roleInput.addEventListener('input', event => {
		const newRole = event.target.value;
		updateRoleInAirtable(data.applicationId, newRole);
	  });
	});
	}else {
		// Display message and "Apply Now" button when there are no applied volunteer opportunities
		displayNoOpportunitiesMessage('applied-table');
	  }
  }
  

  // Function to display Current Volunteer Data
function displayCurrentData(combinedData) {
	const currentTable = document.getElementById('current-table');
	const tbody = currentTable.querySelector('tbody');
  
	tbody.innerHTML = '';
  
	const currentData = combinedData.filter(data => data.status === 'Current');

	if (currentData.length > 0) {
	currentData.forEach(data => {
	  const row = document.createElement('tr');
	  row.innerHTML = `
		<td data-title="Name">${data.volunteerName}</td>
		<td data-title="Organization">${data.organization}</td>
		<td data-title="Role">
		  <input type="text" id="role-${data.applicationId}" value="${data.role}" class="input-field"/>
		</td>
		<td data-title="Start Date">
		  <input type="date" id="start-date-${data.applicationId}" value="${data.startDate}" class="input-field"/>
		</td>
		<td data-title="Schedule">
		  <input type="text" id="schedule-${data.applicationId}" value="${data.schedule}" class="input-field small-input"/>
		</td>
		<td data-title="Total Hours">
    	<input type="number" id="total-hours-${data.applicationId}" value="${data.hoursVolunteered}" min="0" class="input-field"/>
  		</td>
	  	<td data-title="Contact Information">${data.contactInformation}</td>
	  `;
	  tbody.appendChild(row);
	  
	  // Add event listener to role input
	  const roleInput = row.querySelector(`#role-${data.applicationId}`);
	  roleInput.addEventListener('input', event => {
		const newRole = event.target.value;
		updateRoleInAirtable(data.applicationId, newRole);
	  });
  
	  // Add event listener to start date input
	  const startDateInput = row.querySelector(`#start-date-${data.applicationId}`);
	  startDateInput.addEventListener('change', event => {
		const newStartDate = event.target.value;
		updateStartDateInAirtable(data.applicationId, newStartDate);
	  });

	  // Add event listener to schedule input
		const scheduleInput = row.querySelector(`#schedule-${data.applicationId}`);
		scheduleInput.addEventListener('input', event => {
			const newSchedule = event.target.value;
			updateScheduleInAirtable(data.applicationId, newSchedule);
		});

		// Add event listener to hours input
		const hoursInput = row.querySelector(`#total-hours-${data.applicationId}`);
		hoursInput.addEventListener('input', event => {
			const newHours = event.target.value;
			updateTotalHoursInAirtable(data.applicationId, newHours);
  });
	 
	});
	}else {
		// Display message and "Apply Now" button when there are no applied volunteer opportunities
		displayNoOpportunitiesMessage('current-table');
	  }
  }


  function displayPastData(combinedData) {
	const pastTable = document.getElementById('past-table');
	const tbody = pastTable.querySelector('tbody');
  
	tbody.innerHTML = '';
  
	const pastData = combinedData.filter(data => data.status === 'Past');

    if (pastData.length > 0) {
	pastData.forEach(data => {
	  const row = document.createElement('tr');
	  row.innerHTML = `
		<td data-title="Name">${data.volunteerName}</td>
		<td data-title="Organization">${data.organization}</td>
		<td data-title="Role">
		  <input type="text" id="role-${data.applicationId}" value="${data.role}" />
		</td>
		<td data-title="Start Date">
		  <input type="date" id="start-date-${data.applicationId}" value="${data.startDate}" />
		</td>
		<td data-title="End Date">
		  <input type="date" id="end-date-${data.applicationId}" value="${data.endDate}" />
		</td>
		<td data-title="Total Hours">
		  <input type="number" id="total-hours-${data.applicationId}" value="${data.hoursVolunteered}" min="0" step="1" />
		</td>
	  `;
	  tbody.appendChild(row);
  
	//   const savePastButton = document.getElementById('save-button-past');
	//   savePastButton.addEventListener('click',event=>{
	// 	const roleInput = row.querySelector(`#role-${data.applicationId}`);
	// 	const newRole = roleInput.value;
	// 	updateRoleInAirtable(data.applicationId, newRole);
	// 	const startDateInput = row.querySelector(`#start-date-${data.applicationId}`);
	// 	const newStartDate = startDateInput.value;
	// 	updateStartDateInAirtable(data.applicationId, newStartDate);
	// 	const endDateInput = row.querySelector(`#end-date-${data.applicationId}`);
	// 	const newEndDate = endDateInput.value;
	// 	updateEndDateInAirtable(data.applicationId, newEndDate);
	// 	const totalHoursInput = row.querySelector(`#total-hours-${data.applicationId}`);
	// 	const newTotalHours = totalHoursInput.value;
	// 	updateTotalHoursInAirtable(data.applicationId, newTotalHours);

	//   }
	//   )

	  // Add event listener to role input
	  const roleInput = row.querySelector(`#role-${data.applicationId}`);
	  roleInput.addEventListener('input', event => {
		const newRole = event.target.value;
		updateRoleInAirtable(data.applicationId, newRole);
	  });
  
	  // Add event listener to start date input
	  const startDateInput = row.querySelector(`#start-date-${data.applicationId}`);
	  startDateInput.addEventListener('input', event => {
		const newStartDate = event.target.value;
		updateStartDateInAirtable(data.applicationId, newStartDate);
	  });
  
	  // Add event listener to end date input
	  const endDateInput = row.querySelector(`#end-date-${data.applicationId}`);
	  endDateInput.addEventListener('input', event => {
		const newEndDate = event.target.value;
		updateEndDateInAirtable(data.applicationId, newEndDate);
	  });
  
	  // Add event listener to total hours input
	  const totalHoursInput = row.querySelector(`#total-hours-${data.applicationId}`);
	  totalHoursInput.addEventListener('input', event => {
		const newTotalHours = event.target.value;
		updateTotalHoursInAirtable(data.applicationId, newTotalHours);
	  });
  
	//   // Add event listener to certificate file input
	//   const certificateFileInput = row.querySelector(`#certificate-file-${data.applicationId}`);
	//   certificateFileInput.addEventListener('change', event => {
	// 	const file = event.target.files[0]; // Get the uploaded file
	// 	updateCertificateAwardInAirtable(data.applicationId, file);
	//   });
	});
	}else {
		// Display message and "Apply Now" button when there are no volunteer opportunities
		displayNoOpportunitiesMessage('past-table');
	  }
  }
  
// Function to display the liked volunteer opportunities as cards in the "Favorites/Considering" section
function displayLikedData(likedVolunteerOpportunityIds) {
	console.log("displaying liked now");
	// Fetch the liked volunteer opportunities
	const volunteerEndpoint = `${airtableEndpoint}/Volunteer Opportunity`;
  
	return fetch(volunteerEndpoint, {
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json'
	  }
	})
	  .then(response => response.json())
	  .then(volunteerData => {
		const likedVolunteerOpportunities = volunteerData.records
		  .filter(volunteer => likedVolunteerOpportunityIds.includes(volunteer.id))
		  .map(volunteer => volunteer.fields); // Return only the 'fields' property
  
		console.log('Liked Volunteer Opportunities:', likedVolunteerOpportunities);
  
		// Display the liked volunteer opportunities as cards
		const likedOpportunitiesSection = document.getElementById('favorites-considering-cards');
		likedOpportunitiesSection.innerHTML = ''; // Clear the existing content

        if (likedVolunteerOpportunities.length > 0) {
		likedVolunteerOpportunities.forEach(record => {
		  const cardDiv = createCardDiv(record);
		  likedOpportunitiesSection.appendChild(cardDiv);
		});
		}else{
			// Display a message when there are no liked volunteer opportunities
			const messageDiv = document.createElement('div');
			messageDiv.textContent = "You haven't liked any volunteer opportunities yet.";
			const applyNowButton = document.createElement('button');
			applyNowButton.textContent = 'Add favorites Now';
			applyNowButton.addEventListener('click', () => {
			  // Redirect the user to the "Volunteer.html" page when they click the "Apply Now" button
			  window.location.href = 'Volunteer.html';
			});
			messageDiv.appendChild(applyNowButton);
			likedOpportunitiesSection.appendChild(messageDiv);
		}
	  })
	  .catch(error => {
		console.error('Error fetching liked volunteer opportunities:', error);
	  });
  }


  function createCardDiv(record) {
	console.log("checking record", record);

	// Add more console.log statements to check specific fields
  console.log('Card Image:', record['Picture']);
  console.log('Name of Volunteer Opportunity:', record['Name of Volunteer Opportunity']);
  console.log('Organization:', record['Organization']);
  console.log('Overview:', record['Overview']);

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
	cardImage.src = record['Picture'] || ''; 
  
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
	cardTitle.textContent = record['Name of Volunteer Opportunity'] || '';
  
	const cardOrganization = document.createElement('p');
	cardOrganization.classList.add('card-organization');
	cardOrganization.textContent = record['Organization'] || '';
  
	const cardOverview = document.createElement('p');
	cardOverview.classList.add('card-overview');
	cardOverview.textContent = record['Overview'] || '';
  
	const cardLocation = document.createElement('p');
	cardLocation.classList.add('card-location');
	cardLocation.textContent = record['Location'] || '';
  
	const cardInPersonOrRemote = document.createElement('p');
	cardInPersonOrRemote.classList.add('card-inPersonOrRemote');
	cardInPersonOrRemote.textContent = record['In Person / Remote'] || '';
  
	const cardAge = document.createElement('p');
	cardAge.classList.add('card-age');
	cardAge.textContent = record['Age'] || '';
  
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
			const peopleLiked = record['People Liked'] || [];
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
  console.log("recordId", recordId);
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
      const peopleLiked = record['People Liked'] || [];
	  console.log("people liked", peopleLiked);
      const liked = peopleLiked.includes(userRecordId);
	  console.log("liked is true or false", liked);

      if (liked) {
        // If the user already liked the opportunity, remove the link
        likeButton.classList.remove('liked');
        const updatedPeopleLiked = peopleLiked.filter(id => id !== userRecordId);
        Promise.all([
          updateVolunteerOpportunityRecord(record['VolunteerOpportunityID'], { 'People Liked': updatedPeopleLiked }),
        ])
          .then(() => {
            console.log('Like removed successfully.');
            record['People Liked'] = updatedPeopleLiked; // Update the record object with the new "People Liked" data
          })
          .catch(error => {
            console.error('Error removing like:', error);
          });
      } else {
        // If the user hasn't liked the opportunity, add the link
        likeButton.classList.add('liked');
        const updatedPeopleLiked = [...peopleLiked, userRecordId];
        Promise.all([
          updateVolunteerOpportunityRecord(record['VolunteerOpportunityID'], { 'People Liked': updatedPeopleLiked }),
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


function displayAccountData(user) {	
	// Check if the user data is available
	if (user) {
	  // Display email and name
	  document.getElementById('email').textContent = user.Email || '';
	  document.getElementById('name').value = user.Name || '';
  	  document.getElementById('zipcode').value = user.Zipcode || '';
	  document.getElementById('birthday').value = user.Birthday || '';
	  document.getElementById('gender').value = user.Gender || '';

	  // Add event listener to the "Save" button
	  const saveButton = document.getElementById('save-btn');
	  saveButton.addEventListener('click', () => {
		const updatedData = {
		  'Name': document.getElementById('name').value,
		  'Zipcode': document.getElementById('zipcode').value,
		  'Birthday': document.getElementById('birthday').value,
		  'Gender': document.getElementById('gender').value,
		};
		// Update the user object
		// Assuming you have a function to update the user data in the "User" table
		updateUserRecord(user, updatedData)
		  .then(() => {
			alert('Account information updated successfully!');
		  })
		  .catch((error) => {
			console.error('Error updating user record:', error);
		  });
	  });
  
	  // Add event listener to the "Reset Password" button
	  const resetPasswordButton = document.getElementById('reset-password-btn');
	  resetPasswordButton.addEventListener('click', () => {
		// Redirect the user to the "forgetPassword.html" page
		window.location.href = 'forgetPassword.html';
	  });
	}
  }
  
  
  function updateUserRecord(user, updatedData) {
	const applicationEndpoint = `${airtableEndpoint}/User`;
	const userRecordId = user['User Record ID'];
  
	const data = {
	  records: [
		{
		  id: userRecordId,
		  fields: updatedData,
		},
	  ],
	};
  
	return fetch(applicationEndpoint, {
	  method: 'PATCH',
	  headers: {
		'Authorization': `Bearer ${airtableApiKey}`,
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(data),
	})
	  .then(response => response.json())
	  .then(updatedRecords => {
		console.log('User record updated successfully:', updatedRecords);
	  })
	  .catch(error => {
		console.error('Error updating user record:', error);
	  });
  }
  
  // Function to display the message and "Apply Now" button when there are no volunteer opportunities
function displayNoOpportunitiesMessage(tableId) {
	console.log('testing');
	const table = document.getElementById(tableId);
	const tbody = table.querySelector('tbody');
	tbody.innerHTML = '';
  
	const row = document.createElement('tr');
	row.innerHTML = `
	  <td colspan="6">
		<p>You don't have any volunteer opportunity right now. Apply for volunteer opportunities now!</p>
		<button id="apply-now-btn-${tableId}">Apply Now</button>
	  </td>
	`;
	tbody.appendChild(row);
  
	// Add event listener to the "Apply Now" button
	const applyNowButton = row.querySelector(`#apply-now-btn-${tableId}`);
	applyNowButton.addEventListener('click', () => {
	  // Redirect the user to the "Volunteer.html" page for applying
	  window.location.href = 'Volunteer.html';
	});
  }


  // Function to show the loading spinner
function showLoading() {
	const loadingSpinner = document.getElementById('loadingSpinner');
	loadingSpinner.style.display = 'block';
  }
  
  // Function to hide the loading spinner
  function hideLoading() {
	const loadingSpinner = document.getElementById('loadingSpinner');
	loadingSpinner.style.display = 'none';
  }
  


console.log("before test");
  // Fetch User Data and handle Volunteer Opportunities and Application Statistics
fetchUserDataById(userId)
.then(user => {
  showLoading();
  const volunteerOpportunityIds = user['All Volunteer Experience'];
  const applicationStatisticsIds = user['Application'];
  const likedVolunteerOpportunityIds = user['Liked Volunteer Opportunity'] || [];
  displayAccountData(user);
  displayLikedData(likedVolunteerOpportunityIds);



  // Fetch Volunteer Opportunities
  if (volunteerOpportunityIds && volunteerOpportunityIds.length > 0) {
	fetchVolunteerOpportunities(volunteerOpportunityIds)
	  .then(volunteerOpportunities => {
		console.log('Volunteer Opportunities:', volunteerOpportunities);

		// Fetch Application Statistics
		if (applicationStatisticsIds && applicationStatisticsIds.length > 0) {
		  fetchApplicationStatistics(applicationStatisticsIds)
			.then(applicationStatistics => {
			  console.log('Application Statistics:', applicationStatistics);

			  const combinedData = combineVolunteerAndApplicationData(
				volunteerOpportunities,
				applicationStatistics
			  );

			  console.log("Combined Data:", combinedData);
			  displayOverviewData(user, combinedData);
			  displayAppliedData(combinedData);
			  displayCurrentData(combinedData);
			  displayPastData(combinedData);
			  hideLoading();
			})
			.catch(error => {
			  console.error('Error fetching application Statistics:', error);
			});
		} else {
		  console.log('No application Statistics found for the user.');
		}
	  })
	  .catch(error => {
		console.error('Error fetching volunteer opportunities:', error);
	  });
  } else {
	console.log('No Volunteer Opportunities found for the user.');
			displayNoOpportunitiesMessage('volunteer-table');
		  displayNoOpportunitiesMessage('applied-table');
		  displayNoOpportunitiesMessage('current-table');
		  displayNoOpportunitiesMessage('past-table');
		  hideLoading(); // Hide the loading spinner if no volunteer opportunities are found
   }
 })
.catch(error => {
  console.error('Error fetching user data:', error);
});