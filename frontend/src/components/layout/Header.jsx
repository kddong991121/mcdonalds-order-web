import { useEffect, useRef, useState } from 'react'
import OrderTypeSwitch from '../common/OrderTypeSwitch.jsx'
import './Header.css'

const MENU_CATEGORIES = [
  { id: 'burger', label: '버거' },
  { id: 'side', label: '사이드' },
  { id: 'dessert', label: '디저트' },
  { id: 'mccafe-drink', label: '맥카페&음료' },
]

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
}

function CartIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.2h9.9l2-7.2H6" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></svg>
}

function UserIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4.5 21c.8-4.2 3.3-6.3 7.5-6.3s6.7 2.1 7.5 6.3" /></svg>
}

function CloseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
}

function Header({
  activeCategory,
  orderChannel,
  cartCount = 0,
  onLogoClick,
  onCategoryChange,
  onOrderChannelChange,
  onSearch,
  onCartClick,
  onMyPageClick,
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [searchError, setSearchError] = useState('')
  const searchInputRef = useRef(null)
  const visibleCartCount = Math.max(0, Number(cartCount) || 0)

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus()
  }, [isSearchOpen])

  const handleSearchToggle = () => {
    setSearchError('')
    setIsSearchOpen((currentValue) => !currentValue)
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
    setSearchError('')
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const query = searchText.trim()

    if (!query) {
      setSearchError('검색어를 입력해 주세요.')
      searchInputRef.current?.focus()
      return
    }

    setSearchText(query)
    setSearchError('')
    onSearch(query)
  }

  return (
    <header className="header">
      <div className="header__main">
        <button className="header__logo" type="button" aria-label="메뉴 홈으로 이동" onClick={onLogoClick}>
          <img className="header__logo-image" src="/images/mcdonalds-logo.png" alt="" />
        </button>

        <nav className="header__nav" aria-label="메뉴 카테고리">
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id

            return (
              <button
                key={category.id}
                className={`header__nav-button${isActive ? ' is-active' : ''}`}
                type="button"
                aria-pressed={isActive}
                onClick={() => onCategoryChange(category.id)}
              >
                {category.label}
              </button>
            )
          })}
        </nav>

        <div className="header__controls">
          <OrderTypeSwitch value={orderChannel} onChange={onOrderChannelChange} />
          <div className="header__actions">
            <button className={`header__action${isSearchOpen ? ' is-active' : ''}`} type="button" aria-expanded={isSearchOpen} aria-controls="header-search-panel" onClick={handleSearchToggle}>
              <SearchIcon /><span>검색</span>
            </button>
            <button className="header__action" type="button" onClick={onCartClick}>
              <span className="header__icon-wrap">
                <CartIcon />
                {visibleCartCount > 0 && <span className="header__badge" aria-label={`장바구니 상품 ${visibleCartCount}개`}>{visibleCartCount > 99 ? '99+' : visibleCartCount}</span>}
              </span>
              <span>장바구니</span>
            </button>
            <button className="header__action" type="button" onClick={onMyPageClick}>
              <UserIcon /><span>마이페이지</span>
            </button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <section className="header__search-panel" id="header-search-panel" aria-label="메뉴 검색">
          <form className="header__search-form" onSubmit={handleSearchSubmit}>
            <label className="header__search-label" htmlFor="header-menu-search">메뉴 검색</label>
            <div className="header__search-field">
              <SearchIcon />
              <input
                ref={searchInputRef}
                id="header-menu-search"
                type="search"
                value={searchText}
                placeholder="찾고 싶은 메뉴를 입력하세요"
                autoComplete="off"
                aria-describedby={searchError ? 'header-search-error' : undefined}
                aria-invalid={Boolean(searchError)}
                onChange={(event) => {
                  setSearchText(event.target.value)
                  if (searchError) setSearchError('')
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') handleSearchClose()
                }}
              />
              <button className="header__search-submit" type="submit">검색</button>
            </div>
            <button className="header__search-close" type="button" aria-label="검색창 닫기" onClick={handleSearchClose}>
              <CloseIcon />
            </button>
            {searchError && <p className="header__search-error" id="header-search-error" role="alert">{searchError}</p>}
          </form>
        </section>
      )}
    </header>
  )
}

export default Header
