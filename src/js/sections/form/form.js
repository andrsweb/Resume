import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

document.addEventListener( 'DOMContentLoaded', () => {
    'use strict'

    formOnClick()
    submitForm()
} )

const formOnClick = () => {
    const formWrapper    = document.querySelector( '.form-wrapper' )
    const formButtons    = document.querySelectorAll( '.modal-button' )
    const targetElement  = document.querySelector( '#body-lock' )

    formButtons.forEach( button => {
        button.addEventListener( 'click', () => {

            if ( ! formWrapper.classList.contains( 'opened' ) ) {
                formWrapper.classList.add( 'opened' )
                disableBodyScroll( targetElement )
            }
            else {
                formWrapper.classList.remove( 'opened' )
            }
        } )
    } )

    formWrapper.addEventListener( 'click', e => {
        e.stopPropagation()
        const headerWrapper = document.querySelector( '.header-wrapper' )

        const target = e.target

        if ( target.className && target.classList.contains( 'form-wrapper' ) ) {
            formWrapper.classList.remove( 'opened' )

            if ( ! headerWrapper.classList.contains( 'opened' ) )
                enableBodyScroll( targetElement )
            else  disableBodyScroll( targetElement )
        }
    } )
}

const submitForm = () => {
    const form         = document.querySelector( '.form' )
    const formResponse = form.querySelector( '.form-response' )

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
            } else {
                formResponse.classList.add( 'error' )
                console.error( request.response )
            }

            formResponse.textContent = request.response
        } )
        request.send( formData )
    } )
}

