import { mockBranches } from '../../data/mockBranches.js'
import Button from './Button.jsx'

function BranchSelectModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose?.()}>
      <section className="selection-modal" role="dialog" aria-modal="true" aria-labelledby="branch-modal-title">
        <div className="selection-modal__heading"><div><p>Store</p><h2 id="branch-modal-title">주문 지점을 선택하세요</h2></div>{onClose && <button type="button" aria-label="닫기" onClick={onClose}>×</button>}</div>
        <div className="branch-list">
          {mockBranches.map((branch) => (
            <button key={branch.id} type="button" disabled={!branch.isOpen} onClick={() => onSelect(branch)}>
              <span><strong>{branch.name}</strong><small>{branch.address}</small></span>
              <span>{branch.isOpen ? `${branch.distance.toFixed(1)}km` : '선택 불가'}</span>
            </button>
          ))}
        </div>
        {onClose && <Button variant="secondary" isFullWidth onClick={onClose}>취소</Button>}
      </section>
    </div>
  )
}

export default BranchSelectModal
