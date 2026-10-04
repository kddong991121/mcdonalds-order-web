import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import EmptyState from '../components/common/EmptyState.jsx'
import Button from '../components/common/Button.jsx'
import MenuCard from '../components/common/MenuCard.jsx'
import MenuFilterDropdown from '../components/common/MenuFilterDropdown.jsx'
import Pagination from '../components/common/Pagination.jsx'
import BranchSelector from '../components/common/BranchSelector.jsx'
import BranchSelectModal from '../components/common/BranchSelectModal.jsx'
import SecondaryActionButton from '../components/common/SecondaryActionButton.jsx'
import { mockCategories } from '../data/mockCategories.js'
import { filterMenus } from '../data/menuRepository.js'
import './MenuListPage.css'
import { useStore } from '../hooks/useStore.js'

const ITEMS_PER_PAGE = 9

function MenuListPage() {
  const navigate = useNavigate()
  const { selectedBranch, selectedOrderChannel, updateSelectedBranch } = useStore()
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(!selectedBranch)
  const [newFilter, setNewFilter] = useState('all')
  const menuListRef = useRef(null)
  const previousCategoryRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || 'burger'
  const searchText = (searchParams.get('search') || '').trim()
  const currentCategory = mockCategories.find((category) => category.id === selectedCategory) || mockCategories[0]
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    currentCategory.subCategories?.[0]?.id || '',
  )
  const [paginationState, setPaginationState] = useState({ key: '', page: 1 })

  const effectiveSubCategory = currentCategory.subCategories?.some(
    (subCategory) => subCategory.id === selectedSubCategory,
  ) ? selectedSubCategory : currentCategory.subCategories?.[0]?.id || ''

  const categoryMenus = filterMenus({
    categoryId: selectedCategory,
    subCategoryId: searchText ? '' : effectiveSubCategory,
    searchText,
  })
  const visibleMenus = newFilter === 'new'
    ? categoryMenus.filter((menu) => menu.isNew)
    : categoryMenus
  const totalPages = Math.ceil(visibleMenus.length / ITEMS_PER_PAGE)
  const paginationKey = `${selectedCategory}|${effectiveSubCategory}|${newFilter}|${searchText}`
  const currentPage = paginationState.key === paginationKey
    ? Math.min(paginationState.page, Math.max(totalPages, 1))
    : 1
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedMenus = visibleMenus.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  const setCurrentPage = (page) => setPaginationState({ key: paginationKey, page })
  const scrollToMenuTop = useCallback(() => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        menuListRef.current?.scrollIntoView({ behavior, block: 'start' })
      })
    })
  }, [])

  useEffect(() => {
    if (previousCategoryRef.current === null) {
      previousCategoryRef.current = selectedCategory
      return
    }

    if (previousCategoryRef.current !== selectedCategory) {
      previousCategoryRef.current = selectedCategory
      scrollToMenuTop()
    }
  }, [scrollToMenuTop, selectedCategory])

  useEffect(() => {
    if (searchText) scrollToMenuTop()
  }, [scrollToMenuTop, searchText])

  const changePage = (page) => {
    setCurrentPage(page)
    scrollToMenuTop()
  }

  const selectCategory = (categoryId) => {
    const nextCategory = mockCategories.find((category) => category.id === categoryId)
    setSelectedSubCategory(nextCategory?.subCategories?.[0]?.id || '')
    setCurrentPage(1)
    const next = new URLSearchParams(searchParams)
    next.set('category', categoryId)
    next.delete('search')
    setSearchParams(next)
  }

  const selectSubCategory = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId)
    setCurrentPage(1)
    scrollToMenuTop()
  }

  const selectNewFilter = (nextFilter) => {
    setNewFilter(nextFilter)
    setPaginationState({ key: '', page: 1 })
    scrollToMenuTop()
  }

  return (
    <main className="menu-list-page">
      <section className="menu-list-page__hero"><div><p>Menu</p><h1>{searchText ? `“${searchText}” 검색 결과` : '메뉴'}</h1><span>먹고 싶은 메뉴를 골라 주문 흐름을 시작해 보세요.</span></div></section>
      <div className="menu-page-scroll-anchor" id="menu-page-scroll-anchor">
        <BranchSelector branch={selectedBranch} onClick={() => setIsBranchModalOpen(true)} />
      </div>
      <section className="menu-list-page__content menu-list-anchor" aria-labelledby="menu-list-title" ref={menuListRef}>
        <div className="menu-list-page__heading"><div><h2 id="menu-list-title">{searchText ? '검색 결과' : '전체 메뉴'}</h2><p>총 {visibleMenus.length}개</p></div>{searchText && <SecondaryActionButton onClick={() => setSearchParams({ category: selectedCategory })}>검색 지우기</SecondaryActionButton>}</div>
        <div className="menu-list-page__category-row">
          <div className="menu-list-page__categories" aria-label="메뉴 카테고리">
            {mockCategories.map((category) => <button key={category.id} type="button" className={!searchText && selectedCategory === category.id ? 'is-active' : ''} onClick={() => selectCategory(category.id)}>{category.name}</button>)}
          </div>
          <MenuFilterDropdown value={newFilter} onChange={selectNewFilter} />
        </div>
        {!searchText && currentCategory.subCategories?.length > 0 && (
          <div className="menu-list-page__subcategories" aria-label={`${currentCategory.name} 세부 카테고리`}>
            {currentCategory.subCategories.map((subCategory) => (
              <button
                key={subCategory.id}
                type="button"
                className={effectiveSubCategory === subCategory.id ? 'is-active' : ''}
                onClick={() => selectSubCategory(subCategory.id)}
              >
                {subCategory.name}
              </button>
            ))}
          </div>
        )}
        {visibleMenus.length > 0 ? (
          <>
            <div className="menu-list-page__grid">
              {paginatedMenus.map((menu) => (
                <MenuCard key={menu.id} menu={menu} orderChannel={selectedOrderChannel} onSelect={() => navigate(`/menus/${menu.id}`)} />
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} />
          </>
        ) : <EmptyState title="검색 결과가 없습니다." description="다른 검색어나 카테고리를 선택해 주세요." action={<Button onClick={() => selectCategory('burger')}>버거 메뉴 보기</Button>} />}
        <p className="menu-list-page__notice">현재 가격은 제공된 메뉴 가격 정리 자료 기준이며 실제 매장 가격과 다를 수 있습니다.</p>
      </section>
      <BranchSelectModal isOpen={isBranchModalOpen} onClose={selectedBranch ? () => setIsBranchModalOpen(false) : undefined} onSelect={(branch) => { updateSelectedBranch(branch); setIsBranchModalOpen(false) }} />
    </main>
  )
}

export default MenuListPage
