import './OrderTypeSwitch.css'

const ORDER_CHANNELS = [
  { id: 'delivery', label: '배달' },
  { id: 'store', label: '포장&매장' },
]

function OrderTypeSwitch({ value, onChange }) {
  return (
    <div className="order-type-switch" role="group" aria-label="주문 방식">
      {ORDER_CHANNELS.map((channel) => {
        const isSelected = value === channel.id

        return (
          <button
            key={channel.id}
            className={isSelected ? 'is-selected' : ''}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(channel.id)}
          >
            {channel.label}
          </button>
        )
      })}
    </div>
  )
}

export default OrderTypeSwitch
