document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const phone_company = document.getElementById('phone_company').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role_id = document.getElementById('role_id').value;

    const registerData = {
        name: name,
        description: description,
        phone_company: phone_company,
        address: address,
        email: email,
        password: password,
        role_id: role_id
    };

    console.log("XCVB : ", registerData);

    try {
        const response = await fetch('../php/register_charity.php', {
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
