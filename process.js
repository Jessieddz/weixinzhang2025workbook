
const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');
const sliderContainer = document.getElementById('sliderContainer');



const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentIndex = 0;


btnLeft.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  updateSliderPosition();
});


btnRight.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= totalSlides) {
    currentIndex = totalSlides - 1;
  }
  updateSliderPosition();
});

function updateSliderPosition() {
  
  const offsetX = -currentIndex * sliderContainer.parentElement.clientWidth;
  sliderContainer.style.transform = `translateX(${offsetX}px)`;
}


window.addEventListener('resize', updateSliderPosition);
