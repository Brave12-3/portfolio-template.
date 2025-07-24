// This event listener waits for the entire HTML document to be fully loaded and parsed
// before running the JavaScript code inside it. This prevents errors from trying to
// manipulate HTML elements that haven't been created yet.
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Typewriter Effect ---

    // Get the HTML element with the id 'typewriter' where the text will be displayed.
    const typewriterElement = document.getElementById('typewriter');
    // An array of strings that will be typed out.
    const words = ["Full Stack Developer", "Problem Solver", "Lifelong Learner"];
    // 'wordIndex' keeps track of which word in the array we are currently on.
    let wordIndex = 0;
    // 'charIndex' keeps track of the character position in the current word.
    let charIndex = 0;
    // 'isDeleting' is a boolean flag to switch between typing and deleting mode.
    let isDeleting = false;

    // This is the main function that drives the typewriter animation.
    function type() {
        // Get the current word from the array based on the wordIndex.
        const currentWord = words[wordIndex];
        
        // Check if we are in deleting mode.
        if (isDeleting) {
            // If deleting, remove the last character from the element's text.
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--; // Move the character index back by one.
        } else {
            // If typing, add the next character to the element's text.
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++; // Move the character index forward by one.
        }

        // --- Logic to switch modes ---

        // If the word is fully typed and we are NOT in deleting mode...
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true; // Switch to deleting mode.
            // Wait for 2 seconds before starting to delete, so the user can read the word.
            setTimeout(type, 2000); 
            return; // Exit the function for this cycle to wait for the timeout.
        }

        // If the word is fully deleted and we ARE in deleting mode...
        if (isDeleting && charIndex === 0) {
            isDeleting = false; // Switch back to typing mode.
            // Move to the next word in the array. The '%' (modulo) makes it loop back to the start.
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        // Determine the speed of the next character typing/deleting.
        const typeSpeed = isDeleting ? 100 : 200; // Delete faster (100ms) than typing (200ms).
        // Call the 'type' function again after the 'typeSpeed' delay. This creates a loop.
        setTimeout(type, typeSpeed);
    }

    // Start the typewriter effect for the first time.
    type();


    // --- Mobile Navigation (Hamburger Menu) ---

    // Get the hamburger menu icon element.
    const hamburger = document.getElementById('hamburger');
    // Get the navigation links container element.
    const navLinks = document.getElementById('nav-links');

    // Add a 'click' event listener to the hamburger icon.
    hamburger.addEventListener('click', () => {
        // When clicked, toggle the 'active' class on the nav-links container.
        // 'toggle' adds the class if it's not there, and removes it if it is.
        // This 'active' class is what our CSS uses to show/hide the menu.
        navLinks.classList.toggle('active');

        // This part changes the hamburger icon (☰) to an 'X' icon when the menu is open.
        const icon = hamburger.querySelector('i'); // Get the <i> element inside the hamburger div.
        if (navLinks.classList.contains('active')) {
            // If the menu is active (open), change the icon class to 'fa-times' (the 'X').
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            // If the menu is not active (closed), change it back to 'fa-bars' (the hamburger).
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // --- Close mobile nav when a link inside it is clicked ---
    
    // Get all the individual navigation links. querySelectorAll returns a list of elements.
    const allNavLinks = document.querySelectorAll('.nav-links li a');
    // Loop through each link in the list.
    allNavLinks.forEach(link => {
        // Add a click event listener to each link.
        link.addEventListener('click', () => {
            // Check if the mobile menu is currently open.
            if (navLinks.classList.contains('active')) {
                // If it is, remove the 'active' class to close it.
                navLinks.classList.remove('active');
                 // Also change the icon back from 'X' to the hamburger bars.
                 const icon = hamburger.querySelector('i');
                 icon.classList.remove('fa-times');
                 icon.classList.add('fa-bars');
            }
        });
    });

});