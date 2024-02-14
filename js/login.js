$(document).ready(function () {
    const loginForm = document.getElementById('login-form');
    const loginLink = document.getElementById('login-link');
    const registerForm = document.getElementById('register-form');
    const registerLink = document.getElementById('register-link');

    registerLink.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    loginLink.addEventListener('click', () => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
});