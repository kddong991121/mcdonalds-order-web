import { formatPrice } from '../../utils/price.js'
import './OptionSelector.css'

function OptionSelector({ legend, name, options, value, onChange }) {
  return (
    <fieldset className="option-selector">
      <legend>{legend}</legend>
      <div className="option-selector__list">
        {options.map((option) => {
          const isSelected = option.id === value

          return (
            <label
              className={`option-selector__item${isSelected ? ' is-selected' : ''}${option.image ? '' : ' has-no-image'}`}
              key={option.id}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={isSelected}
                onChange={() => onChange(option.id)}
              />
              {option.image && (
                <img className="option-selector__image" src={option.image} alt="" />
              )}
              <span className="option-selector__text">
                <strong>{option.name}</strong>
                {Number.isFinite(option.extraPrice) && option.extraPrice !== 0 && (
                  <small>{option.extraPrice > 0 ? '+' : ''}{formatPrice(option.extraPrice)}</small>
                )}
              </span>
              <span className="option-selector__check" aria-hidden="true">
                ✓
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default OptionSelector
