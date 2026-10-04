import './Pagination.css'

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const moveTo = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages)
    if (nextPage !== currentPage) onPageChange(nextPage)
  }

  return (
    <nav className="pagination" aria-label="메뉴 페이지 이동">
      <button type="button" onClick={() => moveTo(1)} disabled={currentPage === 1} aria-label="첫 페이지">
        <span aria-hidden="true">«</span>
      </button>
      <button type="button" onClick={() => moveTo(currentPage - 1)} disabled={currentPage === 1} aria-label="이전 페이지">
        <span aria-hidden="true">‹</span>
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          className={page === currentPage ? 'is-active' : ''}
          type="button"
          key={page}
          onClick={() => moveTo(page)}
          aria-current={page === currentPage ? 'page' : undefined}
          aria-label={`${page}페이지`}
        >
          {page}
        </button>
      ))}
      <button type="button" onClick={() => moveTo(currentPage + 1)} disabled={currentPage === totalPages} aria-label="다음 페이지">
        <span aria-hidden="true">›</span>
      </button>
      <button type="button" onClick={() => moveTo(totalPages)} disabled={currentPage === totalPages} aria-label="마지막 페이지">
        <span aria-hidden="true">»</span>
      </button>
    </nav>
  )
}

export default Pagination
