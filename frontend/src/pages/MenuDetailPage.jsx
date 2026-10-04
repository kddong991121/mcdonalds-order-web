import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import DrinkOptionSelector from '../components/common/DrinkOptionSelector.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import OptionSelector from '../components/common/OptionSelector.jsx'
import ProductVisual from '../components/common/ProductVisual.jsx'
import QuantityInput from '../components/common/QuantityInput.jsx'
import SecondaryActionButton from '../components/common/SecondaryActionButton.jsx'
import SelectDropdown from '../components/common/SelectDropdown.jsx'
import { findMenuById, getOrderIssue } from '../data/menuRepository.js'
import { useStore } from '../hooks/useStore.js'
import { MAX_QUANTITY } from '../constants/shopRules.js'
import { calculateUnitPrice, createCartItemSnapshot, createIngredientState, findDefaultOption, getSetSideOptions, getSideIdForSetSize, resolveMenuSelection, validateMenuSelection } from '../utils/menuSelection.js'
import { createCartItemId } from '../utils/order.js'
import { formatPrice, getMenuPrice, getMenuSetPrice, getSetDrinkOptions } from '../utils/price.js'
import './MenuDetailPage.css'

function MenuDetailContent({ menuId, editId }) {
  const detailTopRef = useRef(null)
  const navigate = useNavigate()
  const { cartItems, selectedOrderChannel, updateCartItems, storageError } = useStore()
  const menu = findMenuById(menuId)
  const editingItem = cartItems.find((item) => item.cartItemId === editId && item.menuId === menuId)
  const [productType, setProductType] = useState(editingItem?.productType || 'single')
  const [productSizeId, setProductSizeId] = useState(editingItem?.productSize?.id || findDefaultOption(menu?.sizeOptions?.length ? menu.sizeOptions : menu?.sizes)?.id || '')
  const [sizeId, setSizeId] = useState(editingItem?.size?.id || findDefaultOption(menu?.setSizes)?.id || '')
  const [sideId, setSideId] = useState(editingItem?.side?.id || findDefaultOption(menu?.sides)?.id || '')
  const [drinkId, setDrinkId] = useState(menu?.drinks?.some((drink) => drink.id === editingItem?.drink?.id) ? editingItem.drink.id : findDefaultOption(menu?.drinks)?.id || '')
  const [ingredients, setIngredients] = useState(() => createIngredientState(menu?.ingredients, editingItem?.ingredients))
  const [quantity, setQuantity] = useState(editingItem?.quantity || 1)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'

    requestAnimationFrame(() => {
      detailTopRef.current?.scrollIntoView({ behavior, block: 'start' })
    })
  }, [])

  const selection = useMemo(() => {
    return resolveMenuSelection(menu, { sizeId, sideId, drinkId, productSizeId })
  }, [drinkId, menu, productSizeId, sideId, sizeId])

  if (!menu) return <main className="flow-page"><EmptyState title="상품을 찾을 수 없습니다." description={`상품 ID ${menuId}에 해당하는 데이터가 없습니다.`} action={<Button onClick={() => navigate('/menus')}>메뉴로 이동</Button>} /></main>

  const isSet = productType === 'set'
  const unitPrice = calculateUnitPrice(menu, productType, selection, selectedOrderChannel)
  const orderIssue = getOrderIssue(menu, selectedOrderChannel)
  const setExtraPrice = Math.max(0, (getMenuSetPrice(menu, selectedOrderChannel) || 0) - (getMenuPrice(menu, selectedOrderChannel) || 0))
  const setSizeOptions = menu.setSizes.map((option) => ({
    ...option,
    extraPrice: option.extraPrices?.[selectedOrderChannel] ?? option.extraPrice,
  }))
  const setDrinkOptions = getSetDrinkOptions(menu.drinks, selectedOrderChannel, sizeId)
  const setSideOptions = getSetSideOptions(menu.sides, sizeId)
  const standaloneSizeOptions = menu.sizeOptions?.length ? menu.sizeOptions : menu.sizes
  const displayedSizeOptions = standaloneSizeOptions.map((option) => ({
    ...option,
    extraPrice: option.prices
      ? option.prices[selectedOrderChannel] - getMenuPrice(menu, selectedOrderChannel)
      : option.extraPrice,
  }))
  const displayImage = !isSet && selection.productSize?.image ? selection.productSize.image : menu.image
  const displayDescription = !isSet && menu.sizeOptions?.length && selection.productSize
    ? `${menu.nameEn} · ${selection.productSize.kcal} kcal`
    : menu.description

  const changeSetSize = (nextSizeId) => {
    setSizeId(nextSizeId)
    setSideId((currentSideId) => getSideIdForSetSize(menu.sides, currentSideId, nextSizeId))
  }

  const saveToCart = () => {
    if (orderIssue) { setMessage(orderIssue); return }
    if (isSet && !setDrinkOptions.some((drink) => drink.id === drinkId)) { setMessage('현재 주문 방식에서 선택 가능한 음료를 골라 주세요.'); return }
    const validationMessage = validateMenuSelection(menu, productType, selection, ingredients, quantity)
    if (validationMessage) { setMessage(validationMessage); return }
    const nextItem = createCartItemSnapshot({ cartItemId: editingItem?.cartItemId || createCartItemId(), menu, productType, selection, ingredientState: ingredients, quantity, unitPrice, channel: selectedOrderChannel })
    const remainingItems = editingItem ? cartItems.filter((item) => item.cartItemId !== editingItem.cartItemId) : cartItems
    const matchingItem = remainingItems.find((item) => item.optionKey === nextItem.optionKey)
    const nextCart = matchingItem
      ? remainingItems.map((item) => item.cartItemId === matchingItem.cartItemId ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + nextItem.quantity), itemTotal: item.unitPrice * Math.min(MAX_QUANTITY, item.quantity + nextItem.quantity), lineTotal: item.unitPrice * Math.min(MAX_QUANTITY, item.quantity + nextItem.quantity) } : item)
      : [...remainingItems, nextItem]
    if (updateCartItems(nextCart)) navigate('/cart')
    else setMessage('장바구니를 저장하지 못했습니다. 브라우저 저장소 설정을 확인해 주세요.')
  }

  return (
    <main className="flow-page product-page product-detail-top" ref={detailTopRef}>
      <SecondaryActionButton className="flow-page__back" aria-label="이전 화면으로 이동" onClick={() => navigate(-1)}>← 이전</SecondaryActionButton>
      <section className="product-page__intro">
        <div><p className="flow-page__eyebrow">상품 선택</p><h1>{menu.name}</h1><p>{displayDescription}</p><strong>{formatPrice(unitPrice)}</strong></div>
        <ProductVisual className="product-page__visual" src={displayImage} name={`${menu.name}${selection.productSize ? ` ${selection.productSize.name}` : ''}`} accent={menu.accent} />
      </section>

      {orderIssue && <p className="product-page__availability" role="status">{orderIssue}</p>}

      <div className="product-page__form">
        {menu.canMakeSet && <OptionSelector legend="단품 또는 세트를 선택하세요" name="product-type" value={productType} onChange={setProductType} options={[{ id: 'single', name: '단품', extraPrice: 0 }, { id: 'set', name: '세트', extraPrice: setExtraPrice }]} />}
        {!isSet && standaloneSizeOptions.length > 1 && <OptionSelector legend="사이즈를 선택하세요" name="product-size" value={productSizeId} onChange={setProductSizeId} options={displayedSizeOptions} />}
        {isSet && <><OptionSelector legend="세트 사이즈" name="size" value={sizeId} onChange={changeSetSize} options={setSizeOptions} /><OptionSelector legend="사이드 메뉴" name="side" value={sideId} onChange={setSideId} options={setSideOptions} /><DrinkOptionSelector value={drinkId} onChange={setDrinkId} options={setDrinkOptions} /></>}
        {menu.ingredients.length > 0 && <section className="ingredient-editor"><div><h2>재료 변경</h2><SecondaryActionButton onClick={() => setIngredients(createIngredientState(menu.ingredients))}>재료 초기화</SecondaryActionButton></div>{menu.ingredients.map((ingredient) => <div className="ingredient-editor__row" key={ingredient.id}><span>{ingredient.name}</span><SelectDropdown label={ingredient.name} options={ingredient.choices} value={ingredients[ingredient.id]} onChange={(nextValue) => setIngredients((current) => ({ ...current, [ingredient.id]: nextValue }))} /></div>)}</section>}
        <section className="product-page__quantity"><div><h2>수량</h2><p>한 번에 최대 10개까지 선택할 수 있습니다.</p></div><QuantityInput value={quantity} onChange={setQuantity} /></section>
      </div>
      {(message || storageError) && <p className="flow-page__error" role="alert">{message || storageError}</p>}
      <div className="flow-page__actions"><Button variant="secondary" isFullWidth onClick={() => navigate('/menus')}>메뉴 더 보기</Button><Button isFullWidth disabled={Boolean(orderIssue)} onClick={saveToCart}>{editingItem ? '변경 적용' : orderIssue ? '현재 주문 방식 주문 불가' : `${formatPrice(unitPrice * quantity)} 장바구니 담기`}</Button></div>
    </main>
  )
}

function MenuDetailPage() {
  const { menuId } = useParams()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit') || ''
  return <MenuDetailContent key={`${menuId}:${editId}`} menuId={menuId} editId={editId} />
}

export default MenuDetailPage
