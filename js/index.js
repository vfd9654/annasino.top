async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", async () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });

  let slideshowCursor = 0;
  let currentSlide = document.querySelector(".slideshow #ss1");
  let nextSlide = document.querySelector(".slideshow #ss2");

  if (!currentSlide || !nextSlide) return;

  currentSlide.src = "images/0.jpg";
  currentSlide.style.opacity = 1;
  nextSlide.style.opacity = 0;
  const selfie = document.querySelector(".selfie");
  await sleep(1500);
  selfie.classList.add('is-hidden');
  setInterval(() => {
    slideshowCursor = (slideshowCursor + 1) % 30;
    nextSlide.src = `images/${slideshowCursor}.jpg`;
    nextSlide.style.opacity = 1;
    currentSlide.style.opacity = 0;

    [currentSlide, nextSlide] = [nextSlide, currentSlide];
  }, 5000);
});


// const selfie = document.querySelector(".selfie");
// let selfieHidden = false;

// if (selfie) {
//   window.addEventListener('wheel', (event) => {
//     if (event.deltaY > 0 && !selfieHidden) {
//       event.preventDefault();
//       selfieHidden = true;
//       selfie.classList.add('is-hidden');
//       selfie.parentElement?.classList.add('is-selfie-hidden');
//       return;
//     }

//     if (event.deltaY < 0 && selfieHidden && window.scrollY <= 150) {
//       event.preventDefault();
//       selfieHidden = false;
//       selfie.classList.remove('is-hidden');
//       selfie.parentElement?.classList.remove('is-selfie-hidden');
//     }
//   }, { passive: false });
// }