document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };

    console.log("XCVB : ", loginData);

    try {
        const response = await fetch('../php/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (response.ok) {
            sessionStorage.setItem('userData', JSON.stringify(result));

            // Redirect user based on role_id
            switch (result.role_id) {
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
                    console.error("Unknown role_id:", result.role_id);
            }

            console.log(sessionStorage.getItem('userData'));
            document.getElementById('message').innerText = 'Login successful!';
            console.log(result);
        } else {
            document.getElementById('message').innerText = result.error || 'Login failed!';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred while logging in.';
    }
});
