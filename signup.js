document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const errorMessage = document.getElementById('errorMessage');
  
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      // Clear any previous error messages
      errorMessage.textContent = '';
  
      // Basic validation
      if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
      }
  
      if (password.length < 6) {
        errorMessage.textContent = 'Password should be at least 6 characters.';
        return;
      }
  
      // Submit the form or show success message
      alert('Sign up successful!');
    });
  });
  