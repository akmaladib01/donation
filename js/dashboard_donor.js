document.addEventListener('DOMContentLoaded', function() {
    fetch('../php/fetch_campaigns.php')
        .then(response => {
            console.log('Response received:', response);
            return response.json();
        })
        .then(data => {
            console.log('Parsed JSON data:', data);
            const projectList = document.querySelector('.project-list');
            data.forEach(campaign => {
                console.log('Processing campaign:', campaign);
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');

                projectDiv.innerHTML = `
                    <div class="project-info">
                        <h3>${campaign.name}</h3>
                        <p class="target-amount">Target: $${campaign.goal_amount}</p>
                        <a href="project_detail.html?campaign_id=${campaign.campaign_id}" class="project-link">View more <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
                projectList.appendChild(projectDiv);
            });
        })
        .catch(error => console.error('Error fetching campaigns:', error));
});
