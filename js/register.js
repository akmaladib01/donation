document.getElementById('role').addEventListener('change', function () {
    const adminCodeGroup = document.getElementById('admin-code-group');
    if (this.value === '1') { // Admin selected
        adminCodeGroup.style.display = 'block';
    } else {
        adminCodeGroup.style.display = 'none';
    }
});

document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const role_id = document.getElementById('role').value;
    const adminCode = document.getElementById('adminCode').value;

    if (!role_id) {
        document.getElementById('message').innerText = 'Please choose a role.';
        return;
    }

    const registerData = {
        fullname: fullname,
        username: username,
        email: email,
        phone: phone,
        password: password,
        role_id: role_id,
        adminCode: adminCode
    };

    try {
        const response = await fetch('../php/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        const result = await response.json();

        if (response.ok) {
            // Clear the form fields
            document.getElementById('registerForm').reset();
            // Display success message with clickable log in link
            document.getElementById('message').innerHTML = 'Registration successful! Please <a href="login.html">log in</a>.';
        } else {
            document.getElementById('message').innerText = result.error || 'Registration failed!';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred while registering.';
    }
});
