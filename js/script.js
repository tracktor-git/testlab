'use strict';

const burgerButton = document.querySelector('.burger-menu-button');
const nav = document.querySelector('.nav');
const logo = document.querySelector('.logo');
const navOpenItems = document.getElementsByClassName('nav-open');
const agreeCheckbox = document.getElementById('agree');

const closeMobileNav = () => Array.from(navOpenItems)
	.forEach(element => element.classList.remove('nav-open'));

burgerButton.addEventListener('click', function() {
	nav.classList.toggle('nav-open');
	logo.classList.toggle('nav-open');
	document.body.classList.toggle('nav-open');
});

agreeCheckbox.addEventListener('change', function() {
	document.querySelector('form button[type="submit"]').disabled = !this.checked;
});

nav.addEventListener('click', (event) => {
	event.preventDefault();

	closeMobileNav();

	if (event.target.tagName === 'A') {
		const id = event.target.getAttribute('href').slice(1);
		const element = document.getElementById(id);
		element.scrollIntoView({ behavior: "smooth" });
	}
});

window.addEventListener('resize', closeMobileNav);

/* Accordion */
const toggleAccordion = (event) => {
	event.currentTarget.classList.toggle('accordion-expand');
};

const accordionItems = document.querySelectorAll('.accordion');

if (accordionItems) {
	accordionItems.forEach((accordion) => {
		accordion.addEventListener('click', (event) => toggleAccordion(event));
	});
}

/* Slider (Да, мне за него стыдно) */
document.addEventListener('DOMContentLoaded', () => {
	const container = document.querySelector('.reviews-slider');
	const slides = Array.from(container.getElementsByClassName('slider-item'));
	const paginationContainer = document.querySelector('.slider-bullets');
	const prevButton = document.querySelector('.slider-button.prev');
	const nextButton = document.querySelector('.slider-button.next');

	let visibleSlidesCount = 3; // Количество видимых слайдов
	let startIndex = 0;

	const recountSlides = () => {
		if (window.outerWidth > 1280) {
			visibleSlidesCount = 3;
		}

		if (window.outerWidth <= 1280) {
			visibleSlidesCount = 2;
		}

		if (window.outerWidth <= 759) {
			visibleSlidesCount = 1;
		}
	}

	// Инициализация слайдера
	function initSlider() {
		recountSlides();

		slides.forEach((slide, index) => {
			if (index < visibleSlidesCount) {
				slide.classList.add('visible');
			} else {
				slide.classList.remove('visible');
			}
		});
		createPagination();
		updatePagination();
		updateButtons();
	}

	// Обновление видимости слайдов
	function updateSlides() {
		recountSlides();

		slides.forEach((slide, index) => {
			if (index >= startIndex && index < startIndex + visibleSlidesCount) {
				slide.classList.add('visible');
			} else {
				slide.classList.remove('visible');
			}
		});

		updatePagination();
		updateButtons();
	}

	// Создание пагинации
	function createPagination() {
		const totalPages = slides.length - visibleSlidesCount + 1; // Количество буллетов
		const bullets = [];

		for (let i = 0; i < totalPages; i++) {
			const bullet = document.createElement('button');

			bullet.classList.add('bullet');
			bullet.dataset.index = i;
			bullet.addEventListener('click', (e) => {
				startIndex = parseInt(e.target.dataset.index);
				updateSlides();
			});

			bullets.push(bullet);
		}

		paginationContainer.replaceChildren(...bullets);
	}

	// Обновление пагинации
	function updatePagination() {
		const bullets = paginationContainer.getElementsByClassName('bullet');
		Array.from(bullets).forEach((bullet, index) => {
			bullet.classList.toggle('active', index === startIndex);
		});
	}

	// Обновление состояния кнопок
	function updateButtons() {
		prevButton.disabled = startIndex === 0;
		nextButton.disabled = startIndex + visibleSlidesCount >= slides.length;
	}

	// Обработчик для кнопки "Next"
	nextButton.addEventListener('click', () => {
		if (startIndex + visibleSlidesCount < slides.length) {
			startIndex++;
			updateSlides();
		}
	});

	// Обработчик для кнопки "Previous"
	prevButton.addEventListener('click', () => {
		if (startIndex > 0) {
			startIndex--;
			updateSlides();
		}
	});

	// Инициализация
	initSlider();

	window.addEventListener('resize', () => {
		startIndex = 0;
		updateSlides();
		createPagination();
		updatePagination();
	});
});