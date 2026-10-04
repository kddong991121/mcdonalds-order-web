import { mockCategories } from './mockCategories.js'
import { mockMenus } from './mockMenus.js'

function findMenuById(menuId) {
  return mockMenus.find((menu) => menu.id === menuId)
}

function findCategoryById(categoryId) {
  return mockCategories.find((category) => category.id === categoryId)
}

function filterMenus({ categoryId, subCategoryId, searchText = '' } = {}) {
  const query = searchText.trim().toLocaleLowerCase('ko-KR')

  return mockMenus.filter((menu) => {
    const categoryMatches = query || !categoryId || menu.categoryId === categoryId
    const subCategoryMatches = query || !subCategoryId || subCategoryId === 'all' || menu.subCategoryId === subCategoryId
    const searchableText = `${menu.name} ${menu.description}`.toLocaleLowerCase('ko-KR')
    return categoryMatches && subCategoryMatches && (!query || searchableText.includes(query))
  })
}

function getOrderIssue(menu, orderChannel = 'delivery') {
  if (!menu) return '상품 정보를 찾을 수 없습니다.'
  if (menu.availability?.[orderChannel] === false) {
    return orderChannel === 'delivery'
      ? '이 메뉴는 배달 주문이 제공되지 않습니다. 포장 또는 매장 주문을 이용해 주세요.'
      : '이 메뉴는 포장 또는 매장 주문이 제공되지 않습니다.'
  }
  if (menu.availability?.[orderChannel] !== true) {
    return '이 메뉴의 주문 가능 방식은 제공된 자료에서 확인되지 않았습니다.'
  }
  if (!menu.priceConfirmed?.[orderChannel] || !Number.isFinite(menu.prices?.[orderChannel])) {
    return `${orderChannel === 'delivery' ? '배달' : '포장&매장'} 가격 자료가 확인되지 않아 현재 주문할 수 없습니다.`
  }
  return ''
}

export { filterMenus, findCategoryById, findMenuById, getOrderIssue }
