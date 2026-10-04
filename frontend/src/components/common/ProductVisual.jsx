import { useState } from 'react'
import './ProductVisual.css'

function ProductVisual({ src, name, accent = '#ffbc0d', className = '' }) {
  const [hasError, setHasError] = useState(false)

  if (src && !hasError) {
    return <img className={className} src={src} alt={name} onError={() => setHasError(true)} />
  }

  return (
    <div className={`product-visual ${className}`.trim()} style={{ '--product-accent': accent }} role="img" aria-label={`${name} 임시 이미지`}>
      <span aria-hidden="true">M</span>
      <small>{name}</small>
    </div>
  )
}

export default ProductVisual
