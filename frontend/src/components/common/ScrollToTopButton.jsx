import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './ScrollToTopButton.css'

const VISIBILITY_THRESHOLD = 300

function ScrollToTopButton({ targetSelector = '' }) {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(() => window.scrollY > VISIBILITY_THRESHOLD)
  const [ctaClearance, setCtaClearance] = useState(0)
  const isDetailPage = /^\/menus\/[^/]+/.test(location.pathname)

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > VISIBILITY_THRESHOLD)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })

    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  useEffect(() => {
    if (!isDetailPage) return undefined

    const cta = document.querySelector('.flow-page__actions')
    if (!cta) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setCtaClearance(0)
        return
      }

      const clearance = Math.max(0, Math.ceil(window.innerHeight - entry.boundingClientRect.top + 12))
      setCtaClearance(clearance)
    })
    observer.observe(cta)

    return () => observer.disconnect()
  }, [isDetailPage, location.pathname])

  const scrollToTop = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'

    const target = targetSelector ? document.querySelector(targetSelector) : null
    if (target) {
      target.scrollIntoView({ behavior, block: 'start' })
      return
    }

    window.scrollTo({ top: 0, behavior })
  }

  const activeCtaClearance = isDetailPage ? ctaClearance : 0

  return (
    <button
      className={`scroll-to-top-button${isVisible ? ' is-visible' : ''}${isDetailPage ? ' scroll-to-top-button--detail' : ''}${activeCtaClearance ? ' scroll-to-top-button--cta-visible' : ''}`}
      type="button"
      aria-label="맨 위로 이동"
      tabIndex={isVisible ? 0 : -1}
      style={activeCtaClearance ? { '--cta-clearance': `${activeCtaClearance}px` } : undefined}
      onClick={scrollToTop}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 10 6-6 6 6M12 4v16" />
      </svg>
    </button>
  )
}

export default ScrollToTopButton
