import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

document.addEventListener( 'DOMContentLoaded', () => {
    'use strict'

    formOnClick()
} )
const formOnClick = () => {
    const formButtons       = document.querySelectorAll( '.button' )
    const form              = document.querySelector( '.form' )
    const targetElement     = document.querySelector( '#body-lock' )

    formButtons.forEach( button => {
        button.addEventListener( 'click', () => {

            if ( ! form.classList.contains( 'opened' ) ) {
                form.classList.add( 'opened' )
                disableBodyScroll( targetElement )
            }
            else {
                form.classList.remove( 'opened' )
            }
        } )
    } )

    form.addEventListener( 'click', e => {
        e.stopPropagation()

        const target = e.target

        if ( target.className && target.classList.contains( 'form' ) ) {
            form.classList.remove( 'opened' )
            enableBodyScroll( targetElement )
        }
    } )
}

