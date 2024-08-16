'use client'
import 'node_modules/@glidejs/glide/dist/css/glide.core.min.css'
import Glide from '@glidejs/glide'
import { useEffect, useState } from 'react'

interface Props {
  photos: string[]
}

export const Slider = async ({ photos }: Props) => {
  const [currentSlide, setCurrentSlide] = useState('')

  const slider = document.querySelector('#slider')

  slider?.addEventListener('click', e => {
    const clickedElement = e.target as HTMLElement
    const isButton = clickedElement.tagName === 'BUTTON'
    const buttonElement = isButton
      ? clickedElement
      : clickedElement.closest('button')

    if (buttonElement) {
      const index = buttonElement.dataset.slide

      // index && setCurrentSlide(index)
      glide.go(`=${index}`)
    }
  })

  const glide = new Glide('#slider', {
    type: 'carousel',
    focusAt: 'center',
    gap: 0,
    startAt: 0,
    perView: 6
  }).mount()

  return (
    <div
      id="slider"
      className="glide"
      style={{ width: '400px', height: '200px' }}
    >
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {photos.map((photo, index) => (
            <li className="glide__slide" key={index}>
              <button>
                <img src={photo} alt="" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <article>
        <figure>
          <img src={photos[0]} alt="" />
        </figure>
      </article>
    </div>
  )
}
