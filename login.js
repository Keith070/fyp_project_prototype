
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const alertMsg = document.getElementById('alertMsg');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent form from submitting normally

        // Get the email and password values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (!validateEmail(email)) {
            alertMsg.textContent = 'Please enter a valid email address.';
        } else if (password.length < 6) {
            alertMsg.textContent = 'Password should be at least 6 characters long.';
        } else {
            alertMsg.textContent = '';  // Clear the error message if validation passes
            form.submit();  // Submit the form after validation passes
        }
    });

    // Simple email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
