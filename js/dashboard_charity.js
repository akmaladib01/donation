document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    console.log('userData:', userData); // Add this line to check the state of userData

    if (userData && userData.role_id === "3") {
        document.getElementById('charityName').innerText = `Welcome, ${userData.name}`;

        fetch(`../php/get_campaign.php?charity_id=${userData.charity_id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const campaignsContainer = document.getElementById('campaignsContainer');
                    if (data.campaigns.length === 0) {
                        // Display message when no campaigns are available
                        campaignsContainer.innerHTML = '<p>No available campaigns.</p>';
                    } else {
                        data.campaigns.forEach(campaign => {
                            const campaignBox = document.createElement('div');
                            campaignBox.className = 'campaign-box';
                            campaignBox.addEventListener('click', function() {
                                this.classList.toggle('enlarged');
                            });

                            const title = document.createElement('div');
                            title.className = 'campaign-title';
                            title.innerText = campaign.name;

                            const description = document.createElement('div');
                            description.className = 'campaign-description';
                            description.innerText = campaign.description;

                            const goal = document.createElement('div');
                            goal.className = 'campaign-goal';
                            goal.innerText = `Goal: RM ${campaign.goal_amount.toLocaleString()}`;

                            const collected = document.createElement('div');
                            collected.className = 'campaign-collected';
                            collected.innerText = `Amount Collected: RM ${campaign.raised_amount.toLocaleString()}`;

                            const deleteButton = document.createElement('button');
                            deleteButton.className = 'delete-btn';
                            deleteButton.innerText = 'Delete';
                            deleteButton.addEventListener('click', function(event) {
                                event.stopPropagation();
                                deleteCampaign(campaign.campaign_id);
                            });

                            campaignBox.appendChild(title);
                            campaignBox.appendChild(description);
                            campaignBox.appendChild(goal);
                            campaignBox.appendChild(collected);
                            campaignBox.appendChild(deleteButton);

                            campaignsContainer.appendChild(campaignBox);
                        });
                    }
                } else {
                    // Handle error when fetching campaigns
                    alert('No available campaigns.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while fetching campaigns.');
            });
    } else {
        window.location.href = 'login.html';
    }

    document.getElementById('sidebar-toggle').addEventListener('click', function() {
        var sidebarMenu = document.getElementById('sidebar-menu');
        sidebarMenu.classList.toggle('hidden');
    });

    document.getElementById('newCampaignLink').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'new_campaign.html';
    });

    // Logout function
    document.getElementById('logoutLink').addEventListener('click', function(event) {
        event.preventDefault();
        logout();
    });

    function logout() {
        if (confirm('Are you sure you want to log out?')) {
            // Clear session storage
            sessionStorage.removeItem('userData');

            // Clear browser history to prevent navigation back
            window.history.replaceState(null, '', 'index.html');

            // Redirect to login page
            window.location.href = 'index.html';
        }
    }
});

function deleteCampaign(campaign_id) {
    if (confirm('Are you sure you want to delete this campaign?')) {
        fetch('../php/delete_campaign.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ campaign_id: campaign_id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Campaign deleted successfully');
                location.reload(); // Reload the page to reflect the changes
            } else {
                alert('Error deleting campaign: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the campaign.');
        });
    }
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
