document.addEventListener( 'DOMContentLoaded', () => {
    'use strict'

    mouseMoveParallax()
} )

const mouseMoveParallax = () => {
    const area = document.querySelector( '.hero' )

    if ( ! area ) return

    const areaHalfWidth = area.getBoundingClientRect().width / 2,
        areaHalfHeigth = area.getBoundingClientRect().height / 2,
        image = document.querySelector( '.hero-triangles' )

    area.addEventListener( 'mousemove', e => {
        const mouseX = e.clientX,
            mouseY = e.clientY

        let offsetX = ( areaHalfWidth - mouseX ) / 150
        let offsetY = ( areaHalfHeigth - mouseY ) / 150

        image.style.transform = `translate(${ offsetX }px, ${ offsetY }px )`
    } )
}

