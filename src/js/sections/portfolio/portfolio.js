import Swiper, { Pagination, EffectCreative  } from 'swiper';

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	portfolioSwiper()
} )

const portfolioSwiper = () => {

	const swiper = new Swiper('.swiper', {

		loop: true,
		effect: 'creative',
		modules: [ EffectCreative, Pagination ],

		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		creativeEffect: {
			prev: {
				translate: [0, 0, -500],
			},
			next: {
				translate: ['100%', 0, 0],
			},
		}
	} )
}