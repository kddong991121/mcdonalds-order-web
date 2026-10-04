const DRINK_ORDER = ['V004', 'V005', 'V006', 'V007', 'V008', 'V001', 'V002', 'V009', 'V003', 'V010', 'V011', 'V012', 'V013', 'V014']
const MCCAFE_ORDER = ['C001', 'C003', 'C002', 'C004', 'C005', 'C007', 'C006', 'C008', 'C009', 'C011', 'C010', 'C012', 'C013', 'C014', 'C015', 'C016']

function sortByPriority(items, priorityIds) {
  const priority = new Map(priorityIds.map((id, index) => [id, index]))
  return [...items].sort((left, right) => (priority.get(left.id) ?? 999) - (priority.get(right.id) ?? 999) || left.name.localeCompare(right.name, 'ko-KR'))
}

function groupSetDrinkOptions(options = [], selectedDrinkId = '') {
  const selected = options.find((option) => option.id === selectedDrinkId) || null
  const remaining = options.filter((option) => option.id !== selectedDrinkId)
  return {
    selected,
    drinks: sortByPriority(remaining.filter((option) => option.subCategoryId === 'drink'), DRINK_ORDER),
    mccafe: sortByPriority(remaining.filter((option) => option.subCategoryId === 'mccafe'), MCCAFE_ORDER),
  }
}

export { groupSetDrinkOptions }
