import SecondaryActionButton from './SecondaryActionButton.jsx'

function BranchSelector({ branch, onClick }) {
  return (
    <section className="branch-selector" aria-label="주문 지점">
      <div><span>주문 매장</span><strong>{branch?.name || '지점을 선택해 주세요'}</strong>{branch?.address && <small>{branch.address}</small>}</div>
      <SecondaryActionButton onClick={onClick}>{branch ? '변경' : '지점 선택'}</SecondaryActionButton>
    </section>
  )
}

export default BranchSelector
