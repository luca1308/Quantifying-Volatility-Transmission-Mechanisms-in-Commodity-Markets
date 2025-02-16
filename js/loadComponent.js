// js/loadComponents.js
document.addEventListener('DOMContentLoaded', function () {
    // Load navbar
    fetch('../components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            // Initialize mobile menu after navbar is loaded
            initializeMobileMenu();
        });

    // Load footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});

function initializeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Remove any existing event listeners by cloning and replacing the element
    const newMobileMenu = mobileMenu.cloneNode(true);
    mobileMenu.parentNode.replaceChild(newMobileMenu, mobileMenu);

    newMobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        newMobileMenu.classList.toggle('active');
    });
}