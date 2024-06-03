document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('campaignForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const userData = JSON.parse(sessionStorage.getItem('userData'));

        if (userData && userData.role_id === 3) {
            const formData = {
                name: document.getElementById('name').value,
                description: document.getElementById('description').value,
                goal_amount: document.getElementById('goal_amount').value,
                charity_id: userData.charity_id // Assuming the userData object contains the charity_id
            };

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
            window.location.href = 'login.html';
        }
    });
});
