document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const campaignId = urlParams.get('campaign_id');

    if (campaignId) {
        fetch(`../php/fetch_campaign_detail.php?campaign_id=${campaignId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Campaign detail data:', data);
                document.querySelector('.project-title').textContent = data.name;
                document.querySelector('.project-description').textContent = data.description;
                document.querySelector('.project-target').textContent = `Target: $${data.goal_amount}`;
                document.querySelector('.project-raisedAmount').textContent = `Currently Raised Amount: $${data.raised_amount}`;

                const donateButton = document.querySelector('.donate-now');
                donateButton.addEventListener('click', function() {
                    window.location.href = `donate_input.html?project_name=${encodeURIComponent(data.name)}`;
                });
            })
            .catch(error => console.error('Error fetching campaign details:', error));
    } else {
        console.error('No campaign ID found in URL.');
    }
});
