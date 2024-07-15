const SLIDES_PER_VIEW = 3;

const sliderContainer = document.querySelector('.reviews-slider');

const slides = document.querySelectorAll('.slider-item');

const nextButton = document.querySelector('.slider-button.prev');
console.log(nextButton);


slides.forEach((slide, index) => {
	if (index > SLIDES_PER_VIEW - 1) {
		slide.style.display = 'none';
	}
});

nextButton.addEventListener('click', () => {
	// const firstActiveSlide = slides.querySelector('');

	slides.forEach((slide, index) => {
		console.log(index, slide.style.display);


	});
});