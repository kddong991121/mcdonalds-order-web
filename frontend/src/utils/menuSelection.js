import { MAX_QUANTITY, MIN_QUANTITY } from '../constants/shopRules.js'
import { getDrinkPrice, getMenuPrice, getMenuSetPrice, getSetDrinkExtraPrice, getSetDrinkSizeId } from './price.js'

function findDefaultOption(options = []) {
  return options.find((option) => option.isDefault) || options[0]
}

function getSetSideOptions(sides = [], setSizeId = 'regular') {
  const targetSize = setSizeId === 'large' ? 'L' : 'M'
  return sides.filter((side) => !side.sizeGroup || side.size === targetSize)
}

function getSideIdForSetSize(sides = [], currentSideId, setSizeId = 'regular') {
  const currentSide = sides.find((side) => side.id === currentSideId)
  if (!currentSide?.sizeGroup) return currentSideId
  const targetSize = setSizeId === 'large' ? 'L' : 'M'
  return sides.find((side) => side.sizeGroup === currentSide.sizeGroup && side.size === targetSize)?.id || currentSideId
}

function createIngredientState(ingredients = [], savedIngredients = []) {
  return Object.fromEntries(ingredients.map((ingredient) => [
    ingredient.id,
    savedIngredients.find((item) => item.id === ingredient.id)?.choiceId || ingredient.defaultChoiceId,
  ]))
}

function resolveMenuSelection(menu, { sizeId, sideId, drinkId, productSizeId }) {
  if (!menu) return { size: null, side: null, drink: null, productSize: null }
  const productSizeOptions = menu.sizeOptions?.length ? menu.sizeOptions : menu.sizes
  return {
    size: menu.setSizes.find((option) => option.id === sizeId) || null,
    side: menu.sides.find((option) => option.id === sideId) || null,
    drink: menu.drinks.find((option) => option.id === drinkId) || null,
    productSize: productSizeOptions.find((option) => option.id === productSizeId) || null,
  }
}

function calculateUnitPrice(menu, productType, selection, orderChannel = 'delivery') {
  const basePrice = getMenuPrice(menu, orderChannel)
  if (!Number.isFinite(basePrice)) return null
  if (productType !== 'set') {
    if (menu.sizeOptions?.length) {
      const sizePrice = selection.productSize?.prices?.[orderChannel]
      return Number.isFinite(sizePrice) ? sizePrice : null
    }
    return menu.categoryId === 'mccafe-drink'
      ? getDrinkPrice(menu, orderChannel, selection.productSize?.id)
      : basePrice
  }
  const setPrice = getMenuSetPrice(menu, orderChannel)
  if (!Number.isFinite(setPrice)) return null
  const sizeExtra = selection.size?.extraPrices?.[orderChannel] ?? selection.size?.extraPrice ?? 0
  const drinkExtra = getSetDrinkExtraPrice(selection.drink, menu.drinks, orderChannel, selection.size?.id)
  return setPrice + sizeExtra + (selection.side?.extraPrice || 0) + drinkExtra
}

function validateMenuSelection(menu, productType, selection, ingredientState, quantity) {
  if (!menu) return '상품 정보를 찾을 수 없습니다.'
  if (!Number.isInteger(quantity) || quantity < MIN_QUANTITY || quantity > MAX_QUANTITY) return `수량은 ${MIN_QUANTITY}~${MAX_QUANTITY}개 사이여야 합니다.`
  if (productType === 'set' && (!menu.canMakeSet || !selection.size || !selection.side || !selection.drink)) return '세트 필수 옵션을 모두 선택해 주세요.'
  if (productType !== 'set' && (menu.categoryId === 'mccafe-drink' || menu.sizeOptions?.length) && !selection.productSize) return '사이즈를 선택해 주세요.'
  const hasInvalidIngredient = menu.ingredients.some((ingredient) => !ingredient.choices.some((choice) => choice.id === ingredientState[ingredient.id]))
  return hasInvalidIngredient ? '재료 선택값이 올바르지 않습니다.' : ''
}

function createIngredientSnapshot(menu, ingredientState) {
  return menu.ingredients.map((ingredient) => {
    const choice = ingredient.choices.find((item) => item.id === ingredientState[ingredient.id])
    return { id: ingredient.id, name: ingredient.name, choiceId: choice?.id || ingredient.defaultChoiceId, choiceName: choice?.name || '기본' }
  })
}

function createOptionKey(menuId, productType, selection, ingredientSnapshot) {
  const ingredientKey = [...ingredientSnapshot].sort((a, b) => a.id.localeCompare(b.id)).map((item) => `${item.id}:${item.choiceId}`).join(',')
  return [menuId, productType, selection.productSize?.id || '-', selection.size?.id || '-', selection.side?.id || '-', selection.drink?.id || '-', ingredientKey].join('|')
}

function createCartItemSnapshot({ cartItemId, menu, productType, selection, ingredientState, quantity, unitPrice, channel }) {
  const isSet = productType === 'set'
  const ingredients = createIngredientSnapshot(menu, ingredientState)
  const setDrinkSizeId = isSet ? getSetDrinkSizeId(selection.drink, selection.size?.id) : null
  const setDrinkName = isSet && selection.drink
    ? `${selection.drink.name}${selection.drink.sizes?.length > 1 ? ` (${setDrinkSizeId})` : ''}`
    : ''
  const optionSummary = [isSet ? selection.size?.name : '단품', !isSet && selection.productSize ? `사이즈 · ${selection.productSize.name}` : '', isSet ? selection.side?.name : '', setDrinkName, ...ingredients.filter((item) => item.choiceId !== 'regular').map((item) => `${item.name} ${item.choiceName}`)].filter(Boolean)
  const normalizedSelection = isSet
    ? { ...selection, productSize: null }
    : { ...selection, size: null, side: null, drink: null }
  return {
    cartItemId,
    optionKey: createOptionKey(menu.id, productType, normalizedSelection, ingredients),
    menuId: menu.id, name: menu.name, image: !isSet ? selection.productSize?.image || menu.image : menu.image, accent: menu.accent,
    channel, availability: { ...menu.availability },
    productType, productSize: normalizedSelection.productSize, size: normalizedSelection.size, side: normalizedSelection.side, drink: normalizedSelection.drink,
    ingredients, optionSummary, quantity, unitPrice, itemTotal: unitPrice * quantity, lineTotal: unitPrice * quantity,
  }
}

export { calculateUnitPrice, createCartItemSnapshot, createIngredientState, findDefaultOption, getSetSideOptions, getSideIdForSetSize, resolveMenuSelection, validateMenuSelection }
