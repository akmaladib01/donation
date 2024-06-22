document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('../php/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();
        console.log('Response from server:', result); // Debugging line

        if (response.ok && result.role_id) {
            login(result);
        } else {
            console.error('Login failed 2:', result.error); // Debugging line
            document.getElementById('message').innerText = result.error || 'Login failed!';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred while logging in.';
    }
});

const login = (userData) => {
    sessionStorage.setItem('userData', JSON.stringify(userData));
    console.log('User data saved to session storage:', userData); // Debugging line

    // Redirect user based on role_id
    switch (userData.role_id) {
        case "1":
            window.location.href = "dashboard_admin.html";
            break;
        case "2":
            window.location.href = "dashboard_donor.html";
            break;
        case "3":
            window.location.href = "dashboard_charity.html";
            break;
        default:
            console.error("Unknown role_id:", userData.role_id);
    }

    document.getElementById('message').innerText = 'Login successful!';
};
