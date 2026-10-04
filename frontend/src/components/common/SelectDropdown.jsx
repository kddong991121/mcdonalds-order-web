import { useEffect, useId, useRef, useState } from 'react'
import './SelectDropdown.css'

function SelectDropdown({ label, options, value, onChange }) {
  const rootRef = useRef(null)
  const listboxId = useId()
  const selectedIndex = Math.max(0, options.findIndex((option) => option.id === value))
  const selectedOption = options[selectedIndex]
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(selectedIndex)

  useEffect(() => {
    if (!isOpen) return undefined

    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [isOpen])

  const open = () => {
    setHighlightedIndex(selectedIndex)
    setIsOpen(true)
  }

  const selectOption = (option) => {
    onChange(option.id)
    setHighlightedIndex(options.indexOf(option))
    setIsOpen(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isOpen) {
        open()
        return
      }

      const direction = event.key === 'ArrowDown' ? 1 : -1
      setHighlightedIndex((current) => (current + direction + options.length) % options.length)
      return
    }

    if ((event.key === 'Enter' || event.key === ' ') && isOpen) {
      event.preventDefault()
      selectOption(options[highlightedIndex])
    }
  }

  return (
    <div className="select-dropdown" ref={rootRef}>
      <button
        type="button"
        className="select-dropdown__trigger"
        aria-label={`${label} 선택`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleKeyDown}
      >
        <span>{selectedOption?.name}</span>
        <span className="select-dropdown__chevron" aria-hidden="true">⌄</span>
      </button>
      {isOpen && (
        <ul id={listboxId} className="select-dropdown__options" role="listbox" aria-label={`${label} 옵션`}>
          {options.map((option, index) => {
            const isSelected = option.id === value
            return (
              <li
                key={option.id}
                role="option"
                aria-selected={isSelected}
                className={`${isSelected ? 'is-selected' : ''}${highlightedIndex === index ? ' is-highlighted' : ''}`.trim()}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectOption(option)}
              >
                <span className="select-dropdown__check" aria-hidden="true">{isSelected ? '✓' : ''}</span>
                <span>{option.name}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default SelectDropdown
