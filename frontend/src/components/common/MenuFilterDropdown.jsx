import { useEffect, useId, useRef, useState } from 'react'
import './MenuFilterDropdown.css'

const MENU_FILTER_OPTIONS = [
  { value: 'all', label: '전체 메뉴' },
  { value: 'new', label: '신제품만 보기' },
]

function MenuFilterDropdown({ value, onChange }) {
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)
  const listboxId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const selectedIndex = Math.max(0, MENU_FILTER_OPTIONS.findIndex((option) => option.value === value))
  const [highlightedIndex, setHighlightedIndex] = useState(selectedIndex)
  const selectedOption = MENU_FILTER_OPTIONS[selectedIndex]

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setIsOpen(false)
    }
    const handleEscape = (event) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      triggerRef.current?.focus()
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const openDropdown = (nextIndex = selectedIndex) => {
    setHighlightedIndex(nextIndex)
    setIsOpen(true)
  }

  const selectOption = (option) => {
    if (option.value !== value) onChange(option.value)
    setHighlightedIndex(MENU_FILTER_OPTIONS.indexOf(option))
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const handleTriggerClick = () => {
    if (isOpen) setIsOpen(false)
    else openDropdown()
  }

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isOpen) {
        openDropdown(event.key === 'ArrowDown' ? selectedIndex : Math.max(0, selectedIndex - 1))
        return
      }

      const direction = event.key === 'ArrowDown' ? 1 : -1
      setHighlightedIndex((current) => (current + direction + MENU_FILTER_OPTIONS.length) % MENU_FILTER_OPTIONS.length)
      return
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      if (!isOpen) setIsOpen(true)
      setHighlightedIndex(event.key === 'Home' ? 0 : MENU_FILTER_OPTIONS.length - 1)
      return
    }

    if (event.key === 'Enter' && isOpen) {
      event.preventDefault()
      selectOption(MENU_FILTER_OPTIONS[highlightedIndex])
    }
  }

  return (
    <div className="menu-filter-dropdown" ref={dropdownRef}>
      <span className="menu-filter-dropdown__label" id={`${listboxId}-label`}>메뉴 표시</span>
      <button
        className="menu-filter-dropdown__trigger"
        type="button"
        ref={triggerRef}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${listboxId}-label ${listboxId}-value`}
        aria-controls={listboxId}
        aria-activedescendant={isOpen ? `${listboxId}-option-${highlightedIndex}` : undefined}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        <span id={`${listboxId}-value`}>{selectedOption.label}</span>
        <svg className="menu-filter-dropdown__chevron" viewBox="0 0 20 20" aria-hidden="true">
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>
      <ul
        className={`menu-filter-dropdown__options${isOpen ? ' is-open' : ''}`}
        id={listboxId}
        role="listbox"
        aria-labelledby={`${listboxId}-label`}
        aria-hidden={!isOpen}
      >
        {MENU_FILTER_OPTIONS.map((option, index) => {
          const isSelected = option.value === value
          return (
            <li
              className={`${isSelected ? 'is-selected' : ''}${highlightedIndex === index ? ' is-highlighted' : ''}`.trim()}
              id={`${listboxId}-option-${index}`}
              key={option.value}
              role="option"
              aria-selected={isSelected}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => selectOption(option)}
            >
              <span aria-hidden="true">{isSelected ? '✓' : ''}</span>
              {option.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MenuFilterDropdown
