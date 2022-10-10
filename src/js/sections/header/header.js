import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	headerAnim()
	burgerMenuToggle()
	anchorsClick()
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
		const burgerMenu   = document.querySelector( '.header-box' )
		const burgerButton = document.querySelector( '.burger-button' )
		const WINDOW_WIDTH_MD = 767

		if ( ! burgerMenu ) return

		burgerButton.addEventListener( 'click', () => {

			if ( ! burgerMenu.classList.contains( 'opened') ) {
				disableBodyScroll( targetElement )
				burgerMenu.classList.add( 'opened' )
			}
			else {
				burgerMenu.classList.remove( 'opened' )
				burgerButton.classList.remove( 'opened' )
				enableBodyScroll( targetElement )
			}
		} )

		window.addEventListener( 'resize', () => {
			const windowWidth = window.innerWidth

			if( windowWidth >= WINDOW_WIDTH_MD ) {
				burgerMenu.classList.remove( 'opened' )
				enableBodyScroll( targetElement )
			}
		} )
	}

	const anchorsClick = () => {
		const anchors = document.querySelectorAll( '.anchor' )
		const headerMenu = document.querySelector( '.header-box' )
		const targetElement = document.querySelector( '#burger-block' )

		if ( ! anchors.length ) return

		anchors.forEach( anchor => {
			anchor.addEventListener( 'click', () => {
				headerMenu.classList.remove( 'opened' )
				enableBodyScroll( targetElement )
			} )
		} )
	}


