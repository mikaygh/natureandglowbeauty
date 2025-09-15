// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');

  const isOpen = navLinks.classList.toggle('active');
  hamburger.classList.toggle('open', isOpen);

  if (isOpen) {
    navLinks.style.maxHeight = navLinks.scrollHeight + 'px';
    document.body.style.overflow = 'hidden'; // lock scroll
  } else {
    navLinks.style.maxHeight = null;
    document.body.style.overflow = '';
  }
}

// Close menu when clicking outside
document.addEventListener('click', function (event) {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');

  if (!navbar.contains(event.target) && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    navLinks.style.maxHeight = null;
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Close menu on scroll
window.addEventListener('scroll', function () {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.querySelector('.hamburger');

  if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    navLinks.style.maxHeight = null;
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }
});
