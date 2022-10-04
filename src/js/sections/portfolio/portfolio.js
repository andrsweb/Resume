import Swiper, { EffectCreative } from 'swiper';

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	portfolioSwiper()
} )

const portfolioSwiper = () => {

	const swiper = new Swiper('.swiper', {

		grabCursor: true,
		loop: true,
		effect: 'creative',
		modules: [ EffectCreative ],
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