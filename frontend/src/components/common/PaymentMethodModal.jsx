import { useState } from 'react'
import { mockPaymentMethods } from '../../data/mockPaymentMethods.js'
import Button from './Button.jsx'

function PaymentMethodModal({ isOpen, value, onClose, onConfirm }) {
  const [draftValue, setDraftValue] = useState(value)
  const selectedValue = mockPaymentMethods.some((method) => method.id === draftValue) ? draftValue : value

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="selection-modal" role="dialog" aria-modal="true" aria-labelledby="payment-modal-title">
        <div className="selection-modal__heading"><div><p>Payment</p><h2 id="payment-modal-title">결제수단을 선택하세요</h2></div><button type="button" aria-label="닫기" onClick={onClose}>×</button></div>
        <div className="payment-option-list" role="radiogroup" aria-label="결제수단">
          {mockPaymentMethods.map((method) => (
            <label className={selectedValue === method.id ? 'is-selected' : ''} key={method.id}>
              <input type="radio" name="checkout-payment-method" value={method.id} checked={selectedValue === method.id} onChange={() => setDraftValue(method.id)} />
              <span><strong>{method.displayName}</strong><small>{method.description}</small></span>
            </label>
          ))}
        </div>
        <div className="selection-modal__actions"><Button variant="secondary" onClick={onClose}>취소</Button><Button onClick={() => onConfirm(selectedValue)}>선택 완료</Button></div>
      </section>
    </div>
  )
}

export default PaymentMethodModal
