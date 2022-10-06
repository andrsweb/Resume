import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

document.addEventListener( 'DOMContentLoaded', () => {
    'use strict'

    formOnClick()
    submitForm()
} )

const form = document.querySelector( '.form' )

const formOnClick = () => {
    const formButtons       = document.querySelectorAll( '.modal-button' )
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

const submitForm = () => {

    const form = document.querySelector( '.form-wrapper' )

    form.addEventListener( 'submit', e => {

        e.preventDefault()

        const request = new XMLHttpRequest()

        request.open( 'post', 'send-form.php', true )

        const formData = new FormData( form )

        request.send( formData )
        request.addEventListener( 'load', () => {
            if  ( request.status === 200 )
                console.log( request.response )
            else
                console.error( 'себался отсюда')
        } )
    } )
}

