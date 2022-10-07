import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	headerAnim()
	burgerMenuToggle()
} )

	const headerAnim = () => {
		window.addEventListener( 'scroll', () => {
			const scrollTop = window.scrollY
			const header = document.querySelector( '.header' )

			if ( scrollTop > 0 ) {
				if ( ! header.classList.contains( 'scrolled' ) )
					header.classList.add( 'scrolled' )
			}   else {
				if ( header.classList.contains( 'scrolled' ) )
					header.classList.remove( 'scrolled' )
			}
		})
	}

	const burgerMenuToggle = () => {
		const targetElement = document.querySelector( '#burger-block' )
		const burgerButton = document.querySelector( '.burger-button' )
		const burgerMenu   = document.querySelector( '.header-wrapper' )

		if ( ! burgerButton && ! burgerMenu ) return

		burgerButton.addEventListener( 'click', () => {

			if ( ! burgerMenu.classList.contains( 'opened') ) {
				disableBodyScroll( targetElement )
				burgerMenu.classList.add( 'opened' )
				burgerButton.classList.add( 'opened')
			}
			else {
				burgerMenu.classList.remove( 'opened' )
				burgerButton.classList.remove( 'opened' )
				enableBodyScroll( targetElement )
			}
		} )

		const burgerResize = () => {
			const WINDOW_WIDTH_MD = 768
			const windowWidth = window.innerWidth

			window.addEventListener( 'resize', () => {

				if ( windowWidth >= WINDOW_WIDTH_MD && burgerMenu.classList.contains( 'opened' ) ) {
					burgerMenu.classList.remove( 'opened' )
					burgerButton.classList.remove( 'opened' )
					enableBodyScroll( targetElement )
				}
			}
		) }

		burgerResize()

		const anchorsClick = () => {
			const anchors = document.querySelectorAll( '.anchor' )
			if ( ! anchors.length ) return
			anchors.forEach( anchor => {
				anchor.addEventListener( 'click', () => {
					burgerMenu.classList.remove( 'opened' )
					burgerButton.classList.remove( 'opened' )
					enableBodyScroll( targetElement )
				} )
			} )
		}
			anchorsClick()
	}


