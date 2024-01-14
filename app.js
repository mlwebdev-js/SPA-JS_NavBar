// /path/to/app.js

// Function to dynamically load content using AJAX
function loadContent(href) {
    const templateUrl = `templates/${href}`;

    fetch(templateUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('HTTP error! status: ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            document.querySelector('main').innerHTML = html;
            saveState(href);
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

// Function to save the current state to local storage
function saveState(href) {
    localStorage.setItem('currentPage', href);
}

// Function to restore the state
function restoreState() {
    const savedHref = localStorage.getItem('currentPage');
    if (savedHref) {
        loadContent(savedHref);
    } else {
        loadContent('home.html');
    }
}

// Event listeners for navigation links
document.addEventListener('DOMContentLoaded', () => {
    ['home', 'services', 'about', 'contact'].forEach(id => {
        document.getElementById(id).addEventListener('click', event => {
            event.preventDefault();
            loadContent(`${id}.html`);
        });
    });

    restoreState();
});
