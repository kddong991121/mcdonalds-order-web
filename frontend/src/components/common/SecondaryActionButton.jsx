import './SecondaryActionButton.css'

function SecondaryActionButton({
  children,
  className = '',
  type = 'button',
  variant = 'default',
  ...props
}) {
  const variantClass = variant === 'danger' ? ' secondary-action-button--danger' : ''

  return (
    <button
      className={`secondary-action-button${variantClass} ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default SecondaryActionButton
