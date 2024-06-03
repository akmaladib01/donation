document.getElementById('sidebar-toggle').addEventListener('click', function() {
    var sidebarMenu = document.getElementById('sidebar-menu');
    sidebarMenu.classList.toggle('hidden');
});

document.getElementById('newCampaignLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    window.location.href = 'new_campaign.html'; // Redirect to new_campaign.html
});
