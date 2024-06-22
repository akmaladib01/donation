document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData) {
        document.getElementById('profileName').innerText = userData.name;
        document.getElementById('profileDescription').innerText = userData.description;
        document.getElementById('profileEmail').innerText = userData.email;
        document.getElementById('profilePhone').innerText = userData.phone_company;
        document.getElementById('profileAddress').innerText = userData.address;
    } else {
        console.error('User data not found in session storage.');
    }
});
