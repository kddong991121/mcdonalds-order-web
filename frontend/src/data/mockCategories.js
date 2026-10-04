const mockCategories = [
  { id: 'burger', name: '버거', order: 1, subCategories: [
    { id: 'all', name: '버거전체' },
    { id: 'beef', name: '비프버거' },
    { id: 'chicken', name: '치킨버거' },
    { id: 'other', name: '기타' },
  ] },
  { id: 'side', name: '사이드', order: 2 },
  { id: 'dessert', name: '디저트', order: 3 },
  { id: 'mccafe-drink', name: '맥카페&음료', order: 4, subCategories: [
    { id: 'mccafe', name: '맥카페' },
    { id: 'drink', name: '음료' },
  ] },
]

export { mockCategories }
