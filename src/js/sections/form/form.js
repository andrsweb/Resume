document.addEventListener( 'DOMContentLoaded', () => {
    'use strict'

    formOnClick()
} )

formOnClick = () => {
    const formButtons = document.querySelectorAll( '.button' )
    const form        = document.querySelector( '.form' )

    formButtons.forEach( button => {
        button.addEventListener( 'click', () => {
            if ( ! form.classList.contains( 'opened' ) )
                form.classList.add( 'opened' )
            else
                form.classList.remove( 'opened' )
        } )
    } )

    form.addEventListener( 'click', e => {
        e.stopPropagation()

        const target = e.target

        if ( target.className && target.classList.contains( 'form' ) ) {
            form.classList.remove( 'opened' )
        }
    } )
}

