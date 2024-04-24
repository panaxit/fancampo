const video = document.querySelector('video');
if (video) {
    // Options for the intersection observer
    //const options = {
    //  root: null,
    //  rootMargin: '0px',
    //  threshold: .2
    //};

    //// Intersection Observer callback function
    //const callback = (entries, observer) => {
    //  entries.forEach(entry => {
    //    if (entry.isIntersecting) {
    //      video.play();
    //      //video.style.transform = 'scale(1)'; // Example rescaling value
    //    } else {
    //        console.log(`Scrolling`)
    //      video.pause();
    //      //video.style.transform = 'scale(.4)';
    //    }
    //  });
    //};

    //// Create intersection observer
    //const observer = new IntersectionObserver(callback, options);

    //// Observe the video
    //observer.observe(video);

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        //let scale = 1 - (scrollPosition / (2 * viewportHeight)); // Scale factor
        //scale = Math.max(scale, 0.5); // Ensure scale doesn't go below 0.5

        //// Calculate translate position in percentage
        //const translateX = -50 + (1 - scale) * 50;
        //// Set transform and translate
        //video.style.top = scrollPosition >= viewportHeight/2 ? '270px' : '50%';
        //video.style.transform = `translate(${translateX}%, -50%) scale(${scale})`;
        //if (scrollPosition) {
        //    video.style.transform = `translate(0, 10px) scale(0.5)`;
        //    video.style.top = '70px';
        //} else {
        //    video.style.transform = `translate(0, 0) scale(1)`;
        //    video.style.top = '0';
        //}
        if (scrollPosition) {
            video.closest('section').classList.add('scrolled');
        } else {
            video.closest('section').classList.remove('scrolled');
        }
    });
}


// Set the scroll position where you want to stop scrolling
const stopScrollPosition = 500; // Change this value to your desired scroll position

// Set the cooldown time in milliseconds
const cooldownTime = 1000; // Change this value to your desired cooldown time

let cooldownTimeout = null;
let lastScrollTime = 0;
let isScrollStopped = false;
let lastScrollPosition = window.scrollY || window.pageYOffset;

// Function to handle the scroll event
function handleScroll(event) {
    // Get the current scroll position
    const scrollY = window.scrollY || window.pageYOffset;

    if (isScrollStopped && scrollY <= 20) {
        isScrollStopped = false;
    }

    // Check if the scroll position is beyond the stop point
    if (scrollY > stopScrollPosition && !isScrollStopped) {
        //console.info(`${lastScrollPosition}: ${scrollY}`)
        event.preventDefault();

        // Force the scroll position to remain at the stop point
        window.scrollTo(0, stopScrollPosition);
        if (!cooldownTimeout) {
            // Clear any existing cooldown timeout
            // Wait for the cooldown time before allowing scrolling again
            cooldownTimeout = setTimeout(() => {
                isScrollStopped = true;
                clearTimeout(cooldownTimeout);
                cooldownTimeout = null;
            }, cooldownTime);
        }
    }
    lastScrollPosition = window.scrollY || window.pageYOffset;

    // Update the last scroll time
    lastScrollTime = Date.now();
}

// Add scroll event listener
window.addEventListener('scroll', handleScroll);
