import { isInScope } from '../../common/global'

document.addEventListener( 'DOMContentLoaded', () => {
    'use strict'

} )

document.addEventListener( 'scroll', () => {
    const items = document.querySelectorAll( '.skills-item' )
    const aboutFirstChapter = document.querySelector( '.first-chapter' )
    const aboutSecondChapter = document.querySelector( '.second-chapter' )
    const portfolio = document.querySelector( '.swiper' )

    if ( isInScope( '.about-text', window.scrollY ) ) {
            aboutFirstChapter.classList.add( 'scrolled' )
            aboutSecondChapter.classList.add( 'scrolled' )
        }

    if ( isInScope( '.swiper', window.scrollY ) ) {
        portfolio.classList.add( 'scrolled' )
    }

    items.forEach( item => {

        if ( ! items.length || item.classList.contains( 'scrolled' ) ) return

        if ( isInScope( '.skills-item', window.scrollY) ) {
            item.classList.add( 'scrolled' )
        }
    } )
} )









