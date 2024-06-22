document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('campaignForm');
    
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    console.log('userData at form submission:', userData); // Debugging line

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (userData && userData.role_id === "3") {
            const formData = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                goal_amount: document.getElementById('goal_amount').value,
                charity_id: userData.charity_id // Ensuring the charity_id is from logged-in user data
            };

            console.log('formData being submitted:', formData); // Debugging line

            fetch('../php/new_campaign.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Campaign created successfully!');
                    window.location.href = 'dashboard_charity.html';
                } else {
                    alert('Error creating campaign: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.log('User data not found or role_id is not 3, redirecting to login.'); // 3-second delay
        }
    });
});
