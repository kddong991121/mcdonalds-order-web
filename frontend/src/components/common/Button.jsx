import './Button.css'

function Button({
  children,
  variant = 'primary',
  size = 'large',
  isFullWidth = false,
  className = '',
  type = 'button',
  ...buttonProps
}) {
  const buttonClassName = [
    'common-button',
    `common-button--${variant}`,
    `common-button--${size}`,
    isFullWidth ? 'common-button--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={buttonClassName} type={type} {...buttonProps}>
      {children}
    </button>
  )
}

export default Button
