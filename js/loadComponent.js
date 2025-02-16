// js/loadComponents.js

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load navbar
        const navResponse = await fetch('../components/navbar.html');
        if (!navResponse.ok) {
            throw new Error(`Failed to load navbar: ${navResponse.status}`);
        }
        const navHtml = await navResponse.text();
        document.getElementById('navbar-placeholder').innerHTML = navHtml;
        
        // Initialize mobile menu after navbar is loaded
        initializeMobileMenu();

        // Load footer
        const footerResponse = await fetch('../components/footer.html');
        if (!footerResponse.ok) {
            throw new Error(`Failed to load footer: ${footerResponse.status}`);
        }
        const footerHtml = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerHtml;

        // Initialize interactive features if on comprehensive page
        if (window.location.pathname.includes('comprehensive.html')) {
            initializeInteractiveFeatures();
        }

    } catch (error) {
        console.error('Error loading components:', error);
        // Show error message on the page
        const errorStyle = 'color: red; padding: 20px; background: #ffebee; border: 1px solid #ffcdd2; margin: 10px;';
        document.getElementById('navbar-placeholder').innerHTML = 
            `<div style="${errorStyle}">Error loading navbar. Please check your file paths and server setup.</div>`;
        document.getElementById('footer-placeholder').innerHTML = 
            `<div style="${errorStyle}">Error loading footer. Please check your file paths and server setup.</div>`;
    }
});

function initializeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        // Remove any existing event listeners
        const newMobileMenu = mobileMenu.cloneNode(true);
        mobileMenu.parentNode.replaceChild(newMobileMenu, mobileMenu);

        newMobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            newMobileMenu.classList.toggle('active');
        });
    }
}

function initializeInteractiveFeatures() {
    // Add event listeners for control panel elements
    const controls = [
        'timeRange',
        'sectorFilter',
        'modelType',
        'confidenceLevel'
    ];

    controls.forEach(controlId => {
        const element = document.getElementById(controlId);
        if (element) {
            element.addEventListener('change', updatePlots);
        }
    });

    // Initialize info buttons
    const infoButtons = document.querySelectorAll('.info-button');
    infoButtons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const tooltipId = e.target.getAttribute('data-tooltip');
            const tooltip = document.getElementById(tooltipId);
            if (tooltip) {
                tooltip.style.display = 'block';
            }
        });
        button.addEventListener('mouseleave', (e) => {
            const tooltipId = e.target.getAttribute('data-tooltip');
            const tooltip = document.getElementById(tooltipId);
            if (tooltip) {
                tooltip.style.display = 'none';
            }
        });
    });

    // Initialize plots if Plotly is available
    if (typeof Plotly !== 'undefined') {
        updatePlots();
    }
}

// Function to handle path differences between pages
function getRelativePath() {
    const path = window.location.pathname;
    return path.includes('/pages/') ? '../' : './';
}