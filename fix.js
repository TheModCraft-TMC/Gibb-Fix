// JavaScript Code
// Get the sidebar element
const sidebar = document.querySelector('[data-drawer-type="secondary"]');

// Function to toggle based on data-sidebar-open attribute
function toggleSidebar() {
    // Get the current state of the data-sidebar-open attribute
    const isOpen = sidebar.getAttribute('data-sidebar-open') === 'true';

    if (isOpen) {
        // If open, hide the sidebar
        sidebar.classList.add('hide');
        sidebar.setAttribute('data-sidebar-open', 'false'); // Set attribute to false
    } else {
        // If hidden, show the sidebar
        sidebar.classList.remove('hide');
        sidebar.setAttribute('data-sidebar-open', 'true'); // Set attribute to true
    }
}

// Check the initial state of the sidebar based on data-sidebar-open attribute
document.addEventListener('DOMContentLoaded', function() {
    if (sidebar.getAttribute('data-sidebar-open') === 'false') {
        sidebar.classList.add('hide'); // Hide sidebar initially if data-sidebar-open is false
    }

    const toggleSidebarButton = document.getElementById('toggle-sidebar-button');
    toggleSidebarButton.addEventListener('click', toggleSidebar);

    function darkenColor(color, factor) {
        // Convert color to RGB format
        let rgb = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        if (!rgb) {
            rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        }
        if (!rgb) {
            console.error('Invalid color format:', color);
            return color;
        }

        // Extract RGB values
        const r = parseInt(rgb[1], 16) || parseInt(rgb[1]);
        const g = parseInt(rgb[2], 16) || parseInt(rgb[2]);
        const b = parseInt(rgb[3], 16) || parseInt(rgb[3]);

        // Darken each channel by reducing its value by a factor
        const darkenedRgb = [
            Math.max(Math.floor(r / factor), 0),
            Math.max(Math.floor(g / factor), 0),
            Math.max(Math.floor(b / factor), 0)
        ];

        // Return the new darkened color as rgb
        return `rgb(${darkenedRgb.join(", ")})`;
    }

    document.querySelectorAll('.export-highlight').forEach((element) => {
        // Get the computed styles for the element
        const computedStyle = window.getComputedStyle(element);

        // Extract the left border color
        const borderColor = computedStyle.getPropertyValue('border-left-color');

        if (borderColor) {
            // Darken the border color 2x (adjust factor value as needed)
            const darkenedColor = darkenColor(borderColor, 2);

            // Set the darkened color as the background color with !important
            element.style.setProperty('background-color', darkenedColor, 'important');
        }
    });
});
