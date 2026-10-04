function ServiceTypeSelector({ value, onChange }) {
  return (
    <div className="service-type-selector" role="group" aria-label="포장 또는 매장 선택">
      {[{ id: 'takeout', name: '포장' }, { id: 'dineIn', name: '매장' }].map((option) => (
        <button key={option.id} type="button" className={value === option.id ? 'is-selected' : ''} aria-pressed={value === option.id} onClick={() => onChange(option.id)}>{option.name}</button>
      ))}
    </div>
  )
}

export default ServiceTypeSelector
