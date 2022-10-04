import { renderSVGs } from "../../common/global";

document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	renderSVGs( document.querySelector( '.contacts-items' ) )
	renderSVGs( document.querySelector( '.footer-wrapper' ) )
} )