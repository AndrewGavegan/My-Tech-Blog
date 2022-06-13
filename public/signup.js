const signUpSubmit = async (e) => {
    e.preventDefault();

    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        // create a post request with the details entered
        const res = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            // redirect to homepage
            document.location.replace('/');
        } else {
            //  alert user if request has failed
            alert('Error creating user, password must be minimum 8 characters long');
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signUpSubmit);