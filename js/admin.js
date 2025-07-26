document.addEventListener('DOMContentLoaded', function() {
    // References to DOM elements
    const spotsForm = document.getElementById('spots-form');
    const totalSpotsInput = document.getElementById('total-spots');
    const availableSpotsElement = document.getElementById('available-spots');
    const registeredUsersElement = document.getElementById('registered-users');
    const registrationsList = document.getElementById('registrations-list');
    const adminMessage = document.getElementById('admin-message');

    // Fetch current stats
    function fetchStats() {
        fetch('/api/admin/stats')
            .then(response => response.json())
            .then(data => {
                availableSpotsElement.textContent = data.availableSpots;
                registeredUsersElement.textContent = data.registeredUsers;
                totalSpotsInput.value = data.totalSpots;
            })
            .catch(error => {
                console.error('Error fetching stats:', error);
                showMessage('Error fetching statistics. Please try again.', 'danger');
            });
    }

    // Fetch registrations
    function fetchRegistrations() {
        fetch('/api/admin/registrations')
            .then(response => response.json())
            .then(data => {
                // Clear current list
                registrationsList.innerHTML = '';
                
                // Add each registration to the table
                data.forEach(registration => {
                    const row = document.createElement('tr');
                    
                    const nameCell = document.createElement('td');
                    nameCell.textContent = registration.name;
                    
                    const surnameCell = document.createElement('td');
                    surnameCell.textContent = registration.surname;
                    
                    const emailCell = document.createElement('td');
                    emailCell.textContent = registration.email;
                    
                    const dateCell = document.createElement('td');
                    dateCell.textContent = new Date(registration.date).toLocaleString();
                    
                    row.appendChild(nameCell);
                    row.appendChild(surnameCell);
                    row.appendChild(emailCell);
                    row.appendChild(dateCell);
                    
                    registrationsList.appendChild(row);
                });
                
                // Show message if no registrations
                if (data.length === 0) {
                    const row = document.createElement('tr');
                    const cell = document.createElement('td');
                    cell.colSpan = 4;
                    cell.textContent = 'No registrations yet';
                    cell.className = 'text-center';
                    row.appendChild(cell);
                    registrationsList.appendChild(row);
                }
            })
            .catch(error => {
                console.error('Error fetching registrations:', error);
                showMessage('Error fetching registrations. Please try again.', 'danger');
            });
    }

    // Helper function to show messages
    function showMessage(message, type) {
        adminMessage.textContent = message;
        adminMessage.className = `alert alert-${type}`;
        adminMessage.classList.remove('d-none');
        
        // Hide message after 5 seconds
        setTimeout(() => {
            adminMessage.classList.add('d-none');
        }, 5000);
    }

    // Handle spots form submission
    if (spotsForm) {
        spotsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const totalSpots = totalSpotsInput.value;
            
            fetch('/api/admin/spots', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ totalSpots })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update spots');
                }
                return response.json();
            })
            .then(data => {
                showMessage('Spots updated successfully!', 'success');
                fetchStats();
            })
            .catch(error => {
                console.error('Error updating spots:', error);
                showMessage('Error updating spots. Please try again.', 'danger');
            });
        });
    }

    // Initial fetch
    fetchStats();
    fetchRegistrations();
});
