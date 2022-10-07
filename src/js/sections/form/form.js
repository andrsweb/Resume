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

    const form = document.querySelector( '.form-wrapper' ),
        formResponse = form.querySelector( '.form-response' )

    form.addEventListener( 'submit', e => {

        e.preventDefault()

        const request = new XMLHttpRequest()

        request.open( 'post', 'send-form.php', true )

        const formData = new FormData( form )

        formResponse.classList.remove( [ 'success', 'error' ] )
        formResponse.textContent = 'Обработка...'
        request.addEventListener( 'load', () => {
            console.log( request.status )
            if  ( request.status === 200 ) {
                formResponse.classList.add( 'success' )
                for ( let [ key, value ] of formData ) {
                    localStorage.setItem( key, value )
                    console.log( key, value )
                }
            } else {
                formResponse.classList.add( 'error' )
                console.error( request.response )
            }

            formResponse.textContent = request.response
        } )
        request.send( formData )
    } )
}

