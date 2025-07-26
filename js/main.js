document.addEventListener('DOMContentLoaded', function() {
    // References to DOM elements
    const registrationForm = document.getElementById('registration-form');
    const availableSpotsElement = document.getElementById('available-spots');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitButton = document.getElementById('submit-btn');
    
    // Fetch available spots from the server
    function fetchAvailableSpots() {
        fetch('/api/spots')
            .then(response => response.json())
            .then(data => {
                availableSpotsElement.textContent = data.availableSpots;
                
                // Disable registration if no spots are available
                if (data.availableSpots <= 0) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'No Spots Available';
                } else {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Register';
                }
            })
            .catch(error => {
                console.error('Error fetching available spots:', error);
                availableSpotsElement.textContent = 'Error';
            });
    }
    
    // Initial fetch of available spots
    fetchAvailableSpots();
    
    // Handle form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Disable submit button while processing
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            // Hide any previous messages
            successMessage.classList.add('d-none');
            errorMessage.classList.add('d-none');
            
            // Collect form data
            const formData = new FormData(registrationForm);
            const formDataJson = Object.fromEntries(formData.entries());
            
            // Send form data to server
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJson)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Registration failed');
                }
                return response.json();
            })
            .then(data => {
                // Show success message
                successMessage.classList.remove('d-none');
                
                // Reset form
                registrationForm.reset();
                
                // Update available spots
                fetchAvailableSpots();
                
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Register';
            })
            .catch(error => {
                // Show error message
                errorMessage.classList.remove('d-none');
                errorMessage.textContent = error.message || 'An error occurred. Please try again.';
                
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Register';
            });
        });
    }
});
