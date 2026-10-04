import { formatPrice } from '../../utils/price.js'
import { groupSetDrinkOptions } from '../../utils/drinkOptions.js'
import './DrinkOptionSelector.css'

function DrinkOption({ option, value, onChange, current = false }) {
  const isSelected = option.id === value
  return (
    <label className={`drink-option${isSelected ? ' is-selected' : ''}`}>
      <input type="radio" name="drink" value={option.id} checked={isSelected} onChange={() => onChange(option.id)} />
      <span><strong>{option.name}</strong>{current && <em>현재 선택</em>}{option.extraPrice > 0 && <small>+{formatPrice(option.extraPrice)}</small>}</span>
      <span className="drink-option__check" aria-hidden="true">✓</span>
    </label>
  )
}

function DrinkOptionSelector({ options, value, onChange }) {
  const groups = groupSetDrinkOptions(options, value)
  return (
    <fieldset className="drink-selector">
      <legend>음료</legend>
      {groups.selected && <section className="drink-selector__current" aria-label="현재 선택 음료"><DrinkOption option={groups.selected} value={value} onChange={onChange} current /></section>}
      {[['음료', groups.drinks], ['맥카페', groups.mccafe]].map(([title, items]) => items.length > 0 && (
        <section className="drink-selector__group" key={title}><h2>{title}</h2><div>{items.map((option) => <DrinkOption key={option.id} option={option} value={value} onChange={onChange} />)}</div></section>
      ))}
    </fieldset>
  )
}

export default DrinkOptionSelector
