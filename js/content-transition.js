document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    '.fade-in-section, .fade-left, .fade-right, .fade-top, .fade-scale, .fade-rotate, .fade-blur, .slide-in, .slide-in-up, .slide-in-down, .slide-in-left, .slide-in-right, .fade-in-right'
  );

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible', 'visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (inView) {
      el.classList.add('is-visible', 'visible');
    } else {
      appearOnScroll.observe(el);
    }
  });
});
