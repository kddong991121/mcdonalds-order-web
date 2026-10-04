function OrderChannelSwitch({ value, onChange, className = '' }) {
  return (
    <div className={`order-channel-switch ${className}`.trim()} role="group" aria-label="주문 방식">
      {[{ id: 'delivery', name: '배달' }, { id: 'store', name: '포장&매장' }].map((option) => (
        <button key={option.id} type="button" className={value === option.id ? 'is-selected' : ''} aria-pressed={value === option.id} onClick={() => onChange(option.id)}>
          {option.name}
        </button>
      ))}
    </div>
  )
}

export default OrderChannelSwitch
