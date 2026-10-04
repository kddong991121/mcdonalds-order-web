const mockPaymentMethods = [
  { id: 'card', name: '신용/체크카드', displayName: '신용카드 •••• 1234', description: '결제 확인용 가상 카드' },
  { id: 'easyPay', name: '간편결제', displayName: '간편결제', description: '프로토타입 표시용 간편결제' },
  { id: 'onsite', name: '현장결제', displayName: '현장결제', description: '매장 또는 드라이브스루에서 결제' },
]

function findPaymentMethod(paymentMethodId) {
  return mockPaymentMethods.find((method) => method.id === paymentMethodId) || mockPaymentMethods[2]
}

export { findPaymentMethod, mockPaymentMethods }
