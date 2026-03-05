
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('API unavailable');
        const users = await response.json();
        displayUsers(users.slice(0, 10));
    } catch (error) {
        console.log('API fallback to mock data');
        const mockUsers = [
            { name: "A", email: "A@example.com", company: { name: "IT Corp" } },
            { name: "B", email: "B@example.com", company: { name: "Non-IT Ltd" } },
            { name: "C", email: "C@example.com", company: { name: "Tech Innovate" } }
        ];
        displayUsers(mockUsers);
    }
}

function displayUsers(users) {
    const tbody = document.getElementById('users-table');
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.company.name}</td>
        </tr>
    `).join('');
}

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        alert('Form submitted successfully! (Demo)');
        this.reset();
        clearErrors();
    }
});

function validateForm() {
    let isValid = true;

    const name = document.getElementById('name').value.trim();
    if (!name) {
        showError('name-error', 'Name is required.');
        isValid = false;
    }

    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
    if (!email) {
        showError('email-error', 'Email is required.');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email-error', 'Please enter a valid email.');
        isValid = false;
    }

    const phone = document.getElementById('phone').value.replace(/D/g, '');
    if (phone.length !== 10) {
        showError('phone-error', 'Phone must be exactly 10 digits.');
        isValid = false;
    }

    const message = document.getElementById('message').value.trim();
    if (!message) {
        showError('message-error', 'Message is required.');
        isValid = false;
    }

    return isValid;
}

function showError(errorId, message) {
    document.getElementById(errorId).textContent = message;
    document.getElementById(errorId).style.display = 'block';
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(error => {
        error.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', fetchUsers);