import { isInScope } from '../../common/global'

document.addEventListener( 'DOMContentLoaded', () => {
    'use strict'

} )

document.addEventListener( 'scroll', () => {
    const items = document.querySelectorAll( '.skills-item' )

    items.forEach( item => {

        if ( ! items.length || item.classList.contains( 'scrolled' ) ) return

        if ( isInScope( '.skills-item', window.scrollY) ) {
            item.classList.add( 'scrolled' )
        }
    } )
} )









