document.addEventListener( 'DOMContentLoaded', () => {
	'use strict'

	setTimeout( typeText, 2000 )
} )

const text     = "Andrii"
const delay    = 450
const heroText = document.querySelector( '.hero-text' )

const typeText = () => {

	if ( ! text && ! heroText ) return

	const printText = ( text, heroText, delay ) => {
		if ( text.length > 0 ) {
			heroText.innerHTML += text[0]

			setTimeout(
				function() {
					printText( text.slice(1), heroText, delay )
				},delay
			)
		}
	}
	printText(text, heroText, delay)
}


