document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple username and password check
    if (username === 'teameta' && password === 'teameta123') {
        // On successful login, redirect to a new page
        window.location.href = 'index.html';
    } else {
        // Show error message
        document.getElementById('error-message').style.display = 'block';
    }
});
