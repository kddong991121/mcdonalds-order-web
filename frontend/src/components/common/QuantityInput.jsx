import { MAX_QUANTITY, MIN_QUANTITY } from '../../constants/shopRules.js'
import './QuantityInput.css'

function QuantityInput({
  value,
  onChange,
  disabled = false,
  min = MIN_QUANTITY,
  max = MAX_QUANTITY,
}) {
  const canDecrease = !disabled && value > min
  const canIncrease = !disabled && value < max

  return (
    <div className="quantity-input" aria-label="수량 선택">
      <button
        type="button"
        aria-label="수량 줄이기"
        disabled={!canDecrease}
        onClick={() => onChange(value - 1)}
      >
        −
      </button>
      <output aria-live="polite" aria-label={`현재 수량 ${value}`}>
        {value}
      </output>
      <button
        type="button"
        aria-label="수량 늘리기"
        disabled={!canIncrease}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  )
}

export default QuantityInput
