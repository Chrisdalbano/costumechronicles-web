const navbar = document.querySelector('.navbar');
let lastScrollPosition = 0;

// Add the visible class initially
navbar.classList.add('navbar-visible');

window.addEventListener('scroll', () => {
  event.preventDefault();
  const currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition < lastScrollPosition) {
    // Scrolling up
    navbar.classList.remove('navbar-hidden');
    navbar.classList.add('navbar-visible');
  } else {
    // Scrolling down
    navbar.classList.remove('navbar-visible');
    navbar.classList.add('navbar-hidden');
  }

  lastScrollPosition = currentScrollPosition;
});