// 맥도날드_메뉴데이터_가격_정리본.xlsx의 '메뉴' 시트를 React 런타임용 객체로 변환한 데이터입니다.
// 가격 미확인 셀은 null로 유지하며, React에서 엑셀 파일을 직접 읽지 않습니다.
const burgerIngredients = [
  ['lettuce', '양상추'], ['tomato', '토마토'], ['patty', '패티'],
  ['cheese', '치즈'], ['sauce', '소스'],
].map(([id, name]) => ({ id, name, choices: [
  { id: 'none', name: '없음' }, { id: 'regular', name: '기본' },
], defaultChoiceId: 'regular' }))

const frenchFriesSizeOptions = [
  { id: 'S', name: 'S', size: 'S', kcal: 210, image: '/images/menus/french-fries-s.png', prices: { store: 1500, delivery: 2400 } },
  { id: 'M', name: 'M', size: 'M', kcal: 324, image: '/images/menus/french-fries-m.png', prices: { store: 2600, delivery: 3500 }, isDefault: true },
  { id: 'L', name: 'L', size: 'L', kcal: 397, image: '/images/menus/french-fries-l.png', prices: { store: 3200, delivery: 4100 } },
]

const sides = [
  ...frenchFriesSizeOptions.filter((fries) => fries.size !== 'S').map((fries) => ({
    id: `french-fries-${fries.size.toLowerCase()}`,
    name: `후렌치 후라이 ${fries.size}`,
    nameEn: `French Fries (${fries.size})`,
    image: fries.image,
    extraPrice: 0,
    isDefault: fries.isDefault === true,
    sizeGroup: 'french-fries',
    size: fries.size,
    supportedSizes: ['S', 'M', 'L'],
    ingredients: [],
  })),
  { id: 'hongcheon-rice-chip', name: '홍천 우리쌀 칩', image: '/images/menus/S001.png', extraPrice: 0 },
  { id: 'coleslaw', name: '코울슬로', image: '/images/menus/S016.png', extraPrice: 0 },
]

const createSetSizes = (largeSetExtras) => [
  { id: 'regular', name: '세트', extraPrice: 0, extraPrices: { delivery: 0, store: 0 }, isDefault: true },
  {
    id: 'large',
    name: '라지세트',
    extraPrice: largeSetExtras.delivery || largeSetExtras.store || 0,
    extraPrices: largeSetExtras,
    isDefault: false,
  },
]

const rawMenus = [
  {
    "id": "B001",
    "name": "맥크리스피 고추장 버터",
    "nameKo": "맥크리스피 고추장 버터",
    "nameEn": "McCrispy Gochujang Butter",
    "kcal": "991~1130",
    "categoryId": "burger",
    "subCategoryId": "chicken",
    "prices": {
      "delivery": 9400,
      "store": 8500
    },
    "setPrices": {
      "delivery": 11100,
      "store": 10000
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "McCrispy Gochujang Butter · 991~1130 kcal",
    "isNew": true,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B002",
    "name": "맥스파이시 고추장 버터",
    "nameKo": "맥스파이시 고추장 버터",
    "nameEn": "McSpicy Gochujang Butter",
    "kcal": "988~1127",
    "categoryId": "burger",
    "subCategoryId": "chicken",
    "prices": {
      "delivery": 8400,
      "store": 7500
    },
    "setPrices": {
      "delivery": 10100,
      "store": 9000
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "McSpicy Gochujang Butter · 988~1127 kcal",
    "isNew": true,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경/세트 구성 캡처 확인 / 앱 단품 가격 확인"
  },
  {
    "id": "B003",
    "name": "빅맥",
    "nameKo": "빅맥",
    "nameEn": "Big Mac",
    "kcal": "906~1045",
    "categoryId": "burger",
    "subCategoryId": "beef",
    "prices": {
      "delivery": 6600,
      "store": 5700
    },
    "setPrices": {
      "delivery": 8300,
      "store": 7200
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Big Mac · 906~1045 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B004",
    "name": "더블 맥스파이시 상하이 버거",
    "nameKo": "더블 맥스파이시 상하이 버거",
    "nameEn": "Double McSpicy Shanghai Burger",
    "kcal": "1191~1330",
    "categoryId": "burger",
    "subCategoryId": "chicken",
    "prices": {
      "delivery": 10200,
      "store": 9300
    },
    "setPrices": {
      "delivery": 11900,
      "store": 10800
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Double McSpicy Shanghai Burger · 1191~1330 kcal",
    "isNew": true,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B005",
    "name": "맥스파이시 상하이 버거",
    "nameKo": "맥스파이시 상하이 버거",
    "nameEn": "McSpicy Shanghai Burger",
    "kcal": "825~964",
    "categoryId": "burger",
    "subCategoryId": "chicken",
    "prices": {
      "delivery": 6800,
      "store": 5900
    },
    "setPrices": {
      "delivery": 8500,
      "store": 7400
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "McSpicy Shanghai Burger · 825~964 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B006",
    "name": "1955 버거",
    "nameKo": "1955 버거",
    "nameEn": "1955 Burger",
    "kcal": "896~1035",
    "categoryId": "burger",
    "subCategoryId": "beef",
    "prices": {
      "delivery": 7600,
      "store": 6700
    },
    "setPrices": {
      "delivery": 9300,
      "store": 8200
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "1955 Burger · 896~1035 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B007",
    "name": "더블 쿼터파운더 치즈",
    "nameKo": "더블 쿼터파운더 치즈",
    "nameEn": "Double Quarter Pounder with Cheese",
    "kcal": "1094~1233",
    "categoryId": "burger",
    "subCategoryId": "beef",
    "prices": {
      "delivery": 8600,
      "store": 7700
    },
    "setPrices": {
      "delivery": 10300,
      "store": 9200
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Double Quarter Pounder with Cheese · 1094~1233 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B008",
    "name": "쿼터파운더 치즈",
    "nameKo": "쿼터파운더 치즈",
    "nameEn": "Quarter Pounder with Cheese",
    "kcal": "859~999",
    "categoryId": "burger",
    "subCategoryId": "beef",
    "prices": {
      "delivery": 6800,
      "store": 5900
    },
    "setPrices": {
      "delivery": 8500,
      "store": 7400
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Quarter Pounder with Cheese · 859~999 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B009",
    "name": "베이컨 토마토 디럭스",
    "nameKo": "베이컨 토마토 디럭스",
    "nameEn": "Bacon Tomato Deluxe",
    "kcal": "894~1033",
    "categoryId": "burger",
    "subCategoryId": "beef",
    "prices": {
      "delivery": 6700,
      "store": 5800
    },
    "setPrices": {
      "delivery": 8400,
      "store": 7300
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Bacon Tomato Deluxe · 894~1033 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B010",
    "name": "토마토 치즈 비프 버거",
    "nameKo": "토마토 치즈 비프 버거",
    "nameEn": "Tomato Cheese Beef Burger",
    "kcal": "727~866",
    "categoryId": "burger",
    "subCategoryId": "beef",
    "prices": {
      "delivery": 4900,
      "store": 4000
    },
    "setPrices": {
      "delivery": 6600,
      "store": 5500
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Tomato Cheese Beef Burger · 727~866 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B011",
    "name": "트리플 치즈버거",
    "nameKo": "트리플 치즈버거",
    "nameEn": "Triple Cheeseburger",
    "kcal": "987~1136",
    "categoryId": "burger",
    "subCategoryId": "beef",
    "prices": {
      "delivery": 7000,
      "store": 6100
    },
    "setPrices": {
      "delivery": 8700,
      "store": 7600
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Triple Cheeseburger · 987~1136 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B012",
    "name": "더블 치즈버거",
    "nameKo": "더블 치즈버거",
    "nameEn": "Double Cheeseburger",
    "kcal": "802~942",
    "categoryId": "burger",
    "subCategoryId": "beef",
    "prices": {
      "delivery": 5900,
      "store": 5000
    },
    "setPrices": {
      "delivery": 7600,
      "store": 6500
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Double Cheeseburger · 802~942 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B013",
    "name": "치즈버거",
    "nameKo": "치즈버거",
    "nameEn": "Cheeseburger",
    "kcal": "641~781",
    "categoryId": "burger",
    "subCategoryId": "beef",
    "prices": {
      "delivery": 4100,
      "store": 3200
    },
    "setPrices": {
      "delivery": 5800,
      "store": 4700
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Cheeseburger · 641~781 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B014",
    "name": "햄버거",
    "nameKo": "햄버거",
    "nameEn": "Hamburger",
    "kcal": "266",
    "categoryId": "burger",
    "subCategoryId": "beef",
    "prices": {
      "delivery": 3700,
      "store": 2800
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Hamburger · 266 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "웹에는 단품만 표시 / 앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B015",
    "name": "맥크리스피 치킨 디럭스",
    "nameKo": "맥크리스피 치킨 디럭스",
    "nameEn": "McCrispy Chicken Deluxe",
    "kcal": "902~1041",
    "categoryId": "burger",
    "subCategoryId": "chicken",
    "prices": {
      "delivery": 7700,
      "store": 6800
    },
    "setPrices": {
      "delivery": 9400,
      "store": 8300
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "McCrispy Chicken Deluxe · 902~1041 kcal",
    "isNew": true,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B016",
    "name": "맥크리스피 치킨 클래식",
    "nameKo": "맥크리스피 치킨 클래식",
    "nameEn": "McCrispy Chicken Classic",
    "kcal": "891~1030",
    "categoryId": "burger",
    "subCategoryId": "chicken",
    "prices": {
      "delivery": 6800,
      "store": 5900
    },
    "setPrices": {
      "delivery": 8500,
      "store": 7400
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "McCrispy Chicken Classic · 891~1030 kcal",
    "isNew": true,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B017",
    "name": "맥치킨 모짜렐라",
    "nameKo": "맥치킨 모짜렐라",
    "nameEn": "McChicken Mozzarella",
    "kcal": "1066~1206",
    "categoryId": "burger",
    "subCategoryId": "chicken",
    "prices": {
      "delivery": 5900,
      "store": 5000
    },
    "setPrices": {
      "delivery": 7600,
      "store": 6500
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "McChicken Mozzarella · 1066~1206 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B018",
    "name": "맥치킨",
    "nameKo": "맥치킨",
    "nameEn": "McChicken",
    "kcal": "847~986",
    "categoryId": "burger",
    "subCategoryId": "chicken",
    "prices": {
      "delivery": 4400,
      "store": 3500
    },
    "setPrices": {
      "delivery": 6100,
      "store": 5000
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "McChicken · 847~986 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B019",
    "name": "더블 불고기 버거",
    "nameKo": "더블 불고기 버거",
    "nameEn": "Double Bulgogi Burger",
    "kcal": "959~1098",
    "categoryId": "burger",
    "subCategoryId": "other",
    "prices": {
      "delivery": 5600,
      "store": 4700
    },
    "setPrices": {
      "delivery": 7300,
      "store": 6200
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Double Bulgogi Burger · 959~1098 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B020",
    "name": "불고기 버거",
    "nameKo": "불고기 버거",
    "nameEn": "Bulgogi Burger",
    "kcal": "732~872",
    "categoryId": "burger",
    "subCategoryId": "other",
    "prices": {
      "delivery": 4700,
      "store": 3800
    },
    "setPrices": {
      "delivery": 6400,
      "store": 5300
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Bulgogi Burger · 732~872 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B021",
    "name": "슈비 버거",
    "nameKo": "슈비 버거",
    "nameEn": "Shrimp Beef Burger",
    "kcal": "863~1003",
    "categoryId": "burger",
    "subCategoryId": "other",
    "prices": {
      "delivery": 7100,
      "store": 6200
    },
    "setPrices": {
      "delivery": 8800,
      "store": 7700
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Shrimp Beef Burger · 863~1003 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "B022",
    "name": "슈슈 버거",
    "nameKo": "슈슈 버거",
    "nameEn": "Supreme Shrimp Burger",
    "kcal": "732~872",
    "categoryId": "burger",
    "subCategoryId": "other",
    "prices": {
      "delivery": 5600,
      "store": 4700
    },
    "setPrices": {
      "delivery": 7300,
      "store": 6200
    },
    "largeSetExtras": {
      "delivery": 900,
      "store": 900
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#f2a900",
    "description": "Supreme Shrimp Burger · 732~872 kcal",
    "isNew": false,
    "badges": [
      "세트",
      "단품"
    ],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": true,
    "setBaseExtraPrices": {
      "delivery": 1700,
      "store": 1500
    },
    "setBaseExtraPrice": 1700,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "앱 단품 가격 확인 / 재료 변경 버튼 확인"
  },
  {
    "id": "D001",
    "name": "솔티드 카라멜 츄러스 3조각",
    "nameKo": "솔티드 카라멜 츄러스 3조각",
    "nameEn": "Salted Caramel Churros 3pcs",
    "kcal": "260",
    "categoryId": "dessert",
    "subCategoryId": null,
    "prices": {
      "delivery": 3300,
      "store": 2500
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#8d5524",
    "description": "Salted Caramel Churros 3pcs · 260 kcal",
    "isNew": true,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "해피 스낵 표기"
  },
  {
    "id": "D002",
    "name": "오레오 맥플러리",
    "nameKo": "오레오 맥플러리",
    "nameEn": "Oreo McFlurry",
    "kcal": "332",
    "categoryId": "dessert",
    "subCategoryId": null,
    "prices": {
      "delivery": 4400,
      "store": 3600
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#8d5524",
    "description": "Oreo McFlurry · 332 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "D003",
    "name": "딸기 오레오 맥플러리",
    "nameKo": "딸기 오레오 맥플러리",
    "nameEn": "Strawberry Oreo McFlurry",
    "kcal": "304",
    "categoryId": "dessert",
    "subCategoryId": null,
    "prices": {
      "delivery": 4400,
      "store": 3600
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#8d5524",
    "description": "Strawberry Oreo McFlurry · 304 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "웹 캡처만 확인"
  },
  {
    "id": "D004",
    "name": "초코 오레오 맥플러리",
    "nameKo": "초코 오레오 맥플러리",
    "nameEn": "Choco Oreo McFlurry",
    "kcal": "388",
    "categoryId": "dessert",
    "subCategoryId": null,
    "prices": {
      "delivery": 4400,
      "store": 3600
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#8d5524",
    "description": "Choco Oreo McFlurry · 388 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "웹 캡처만 확인"
  },
  {
    "id": "D005",
    "name": "베리 스트로베리 맥플러리",
    "nameKo": "베리 스트로베리 맥플러리",
    "nameEn": "Very Strawberry McFlurry",
    "kcal": "325",
    "categoryId": "dessert",
    "subCategoryId": null,
    "prices": {
      "delivery": 4400,
      "store": 3600
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#8d5524",
    "description": "Very Strawberry McFlurry · 325 kcal",
    "isNew": true,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "D006",
    "name": "스트로베리콘",
    "nameKo": "스트로베리콘",
    "nameEn": "Strawberry Cone",
    "kcal": "142",
    "categoryId": "dessert",
    "subCategoryId": null,
    "prices": {
      "delivery": null,
      "store": 1900
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": false,
      "store": true
    },
    "image": "",
    "accent": "#8d5524",
    "description": "Strawberry Cone · 142 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": false,
      "store": true
    },
    "referenceStatus": {
      "app": "not-found",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "",
    "appExists": false,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": false,
    "ingredientChangeAvailable": false,
    "note": "웹 캡처만 확인"
  },
  {
    "id": "S001",
    "name": "홍천 우리쌀 칩",
    "nameKo": "홍천 우리쌀 칩",
    "nameEn": "Hongcheon Rice Chip",
    "kcal": "117",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 3400,
      "store": 2600
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "Hongcheon Rice Chip · 117 kcal",
    "isNew": true,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "S002",
    "name": "게살 크림 크로켓 스낵랩",
    "nameKo": "게살 크림 크로켓 스낵랩",
    "nameEn": "Crab Cream Croquette Snackwrap",
    "kcal": "285",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 3900,
      "store": 3100
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "Crab Cream Croquette Snackwrap · 285 kcal",
    "isNew": true,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인(세부 캡처 없음)"
  },
  {
    "id": "S003",
    "name": "맥윙 2조각",
    "nameKo": "맥윙 2조각",
    "nameEn": "McWing 2pcs",
    "kcal": "228",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 4600,
      "store": 3800
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "McWing 2pcs · 228 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "디핑소스 선택 / 세트메뉴 변경 가능"
  },
  {
    "id": "S004",
    "name": "맥윙 4조각",
    "nameKo": "맥윙 4조각",
    "nameEn": "McWing 4pcs",
    "kcal": "455",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 7800,
      "store": 7000
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "McWing 4pcs · 455 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "디핑소스 선택 / 세트메뉴 변경 가능"
  },
  {
    "id": "S005",
    "name": "맥윙 8조각",
    "nameKo": "맥윙 8조각",
    "nameEn": "McWing 8pcs",
    "kcal": "910",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 13900,
      "store": 13100
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "McWing 8pcs · 910 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": true,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "디핑소스 선택 / 세트메뉴 변경 가능"
  },
  {
    "id": "S006",
    "name": "맥윙 2조각 콤보",
    "nameKo": "맥윙 2조각 콤보",
    "nameEn": "McWing 2pcs Combo",
    "kcal": "228~368",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": null,
      "store": null
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": false,
      "store": false
    },
    "image": "",
    "accent": "#da291c",
    "description": "McWing 2pcs Combo · 228~368 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "앱에서 맥윙 2조각의 '세트메뉴로 변경하기'로 확인, 별도 콤보 가격은 캡처 없음"
  },
  {
    "id": "S007",
    "name": "맥윙 4조각 콤보",
    "nameKo": "맥윙 4조각 콤보",
    "nameEn": "McWing 4pcs Combo",
    "kcal": "455~595",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": null,
      "store": null
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": false,
      "store": false
    },
    "image": "",
    "accent": "#da291c",
    "description": "McWing 4pcs Combo · 455~595 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "앱에서 맥윙 4조각의 '세트메뉴로 변경하기'로 확인, 별도 콤보 가격은 캡처 없음"
  },
  {
    "id": "S008",
    "name": "맥너겟 4조각",
    "nameKo": "맥너겟 4조각",
    "nameEn": "McNuggets 4pc",
    "kcal": "163",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 3700,
      "store": 2900
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "McNuggets 4pc · 163 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "디핑소스 선택"
  },
  {
    "id": "S009",
    "name": "맥너겟 6조각",
    "nameKo": "맥너겟 6조각",
    "nameEn": "McNuggets 6pc",
    "kcal": "244",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 5000,
      "store": 4200
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "McNuggets 6pc · 244 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "디핑소스 선택"
  },
  {
    "id": "S010",
    "name": "골든 모짜렐라 치즈스틱 2조각",
    "nameKo": "골든 모짜렐라 치즈스틱 2조각",
    "nameEn": "Golden Mozzarella Cheese Sticks 2pcs",
    "kcal": "165",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 3700,
      "store": 2900
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "Golden Mozzarella Cheese Sticks 2pcs · 165 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "S011",
    "name": "골든 모짜렐라 치즈스틱 4조각",
    "nameKo": "골든 모짜렐라 치즈스틱 4조각",
    "nameEn": "Golden Mozzarella Cheese Sticks 4pcs",
    "kcal": "330",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 5400,
      "store": 4600
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "Golden Mozzarella Cheese Sticks 4pcs · 330 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "S012",
    "name": "후렌치 후라이",
    "nameKo": "후렌치 후라이",
    "nameEn": "French Fries",
    "kcal": "S 210 / M 324 / L 397",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 3500,
      "store": 2700
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "French Fries · S 210 / M 324 / L 397 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "기본 M, S -1,100원, L +600원 / 케첩 여부 선택 / 소금 재료변경"
  },
  {
    "id": "S013",
    "name": "상하이 치킨 스낵랩",
    "nameKo": "상하이 치킨 스낵랩",
    "nameEn": "Shanghai Chicken Snack Wrap",
    "kcal": "303",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 4400,
      "store": 3600
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "Shanghai Chicken Snack Wrap · 303 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경: 양상추/스트립 베이컨/화이트마요소스/치킨텐더"
  },
  {
    "id": "S014",
    "name": "맥스파이시 치킨 텐더 2조각",
    "nameKo": "맥스파이시 치킨 텐더 2조각",
    "nameEn": "McSpicy Chicken Tenders",
    "kcal": "197",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 3600,
      "store": 2800
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "McSpicy Chicken Tenders · 197 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "앱은 2조각으로 표시 / 디핑소스 선택"
  },
  {
    "id": "S015",
    "name": "해쉬 브라운",
    "nameKo": "해쉬 브라운",
    "nameEn": "Hash Brown",
    "kcal": "162",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": null,
      "store": null
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": false,
      "store": false
    },
    "image": "",
    "accent": "#da291c",
    "description": "Hash Brown · 162 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": false,
      "store": true
    },
    "referenceStatus": {
      "app": "not-found",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "",
    "appExists": false,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": false,
    "ingredientChangeAvailable": false,
    "note": "웹 캡처만 확인"
  },
  {
    "id": "S016",
    "name": "코울슬로",
    "nameKo": "코울슬로",
    "nameEn": "Coleslaw",
    "kcal": "179",
    "categoryId": "side",
    "subCategoryId": null,
    "prices": {
      "delivery": 2900,
      "store": 2100
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#da291c",
    "description": "Coleslaw · 179 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "C001",
    "name": "아메리카노",
    "nameKo": "아메리카노",
    "nameEn": "Americano",
    "kcal": "M 12 / L 15",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 3500,
      "store": 2700
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Americano · M 12 / L 15 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "C002",
    "name": "디카페인 아메리카노",
    "nameKo": "디카페인 아메리카노",
    "nameEn": "Decaffeine Americano",
    "kcal": "M 12 / L 12",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 3700,
      "store": 2900
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Decaffeine Americano · M 12 / L 12 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "C003",
    "name": "아이스 아메리카노",
    "nameKo": "아이스 아메리카노",
    "nameEn": "Iced Americano",
    "kcal": "M 9 / L 10",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 3500,
      "store": 2700
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Iced Americano · M 9 / L 10 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "C004",
    "name": "디카페인 아이스 아메리카노",
    "nameKo": "디카페인 아이스 아메리카노",
    "nameEn": "Decaffeine Iced Americano",
    "kcal": "M 8 / L 10",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 3700,
      "store": 2900
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Decaffeine Iced Americano · M 8 / L 10 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "C005",
    "name": "카페라떼",
    "nameKo": "카페라떼",
    "nameEn": "Café Latte",
    "kcal": "M 149 / L 194",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 4200,
      "store": 3400
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Café Latte · M 149 / L 194 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "C006",
    "name": "디카페인 카페라떼",
    "nameKo": "디카페인 카페라떼",
    "nameEn": "Decaffeine Café Latte",
    "kcal": "M 150 / L 190",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 4400,
      "store": 3600
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Decaffeine Café Latte · M 150 / L 190 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "C007",
    "name": "아이스 카페라떼",
    "nameKo": "아이스 카페라떼",
    "nameEn": "Iced Café Latte",
    "kcal": "M 108 / L 133",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 4200,
      "store": 3400
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Iced Café Latte · M 108 / L 133 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "C008",
    "name": "디카페인 아이스 카페라떼",
    "nameKo": "디카페인 아이스 카페라떼",
    "nameEn": "Decaffeine Iced Café Latte",
    "kcal": "M 114 / L 133",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 4400,
      "store": 3600
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Decaffeine Iced Café Latte · M 114 / L 133 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "C009",
    "name": "바닐라 라떼",
    "nameKo": "바닐라 라떼",
    "nameEn": "Vanilla Latte",
    "kcal": "M 227 / L 323",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 4700,
      "store": 3900
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Vanilla Latte · M 227 / L 323 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "C010",
    "name": "디카페인 바닐라 라떼",
    "nameKo": "디카페인 바닐라 라떼",
    "nameEn": "Decaffeine Vanilla Latte",
    "kcal": "M 227 / L 319",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 4900,
      "store": 4100
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Decaffeine Vanilla Latte · M 227 / L 319 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "C011",
    "name": "아이스 바닐라 라떼",
    "nameKo": "아이스 바닐라 라떼",
    "nameEn": "Iced Vanilla Latte",
    "kcal": "M 186 / L 263",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 4700,
      "store": 3900
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Iced Vanilla Latte · M 186 / L 263 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "C012",
    "name": "디카페인 아이스 바닐라 라떼",
    "nameKo": "디카페인 아이스 바닐라 라떼",
    "nameEn": "Decaffeine Iced Vanilla Latte",
    "kcal": "M 191 / L 263",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 4900,
      "store": 4100
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Decaffeine Iced Vanilla Latte · M 191 / L 263 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "C013",
    "name": "카푸치노",
    "nameKo": "카푸치노",
    "nameEn": "Cappuccino",
    "kcal": "M 93 / L 120",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 4200,
      "store": 3400
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Cappuccino · M 93 / L 120 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "C014",
    "name": "디카페인 카푸치노",
    "nameKo": "디카페인 카푸치노",
    "nameEn": "Decaffeine Cappuccino",
    "kcal": "M 89 / L 120",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 4400,
      "store": 3600
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Decaffeine Cappuccino · M 89 / L 120 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "C015",
    "name": "드립 커피",
    "nameKo": "드립 커피",
    "nameEn": "Drip Coffee",
    "kcal": "M 10 / L 12",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 3200,
      "store": 2400
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Drip Coffee · M 10 / L 12 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "C016",
    "name": "아이스 드립 커피",
    "nameKo": "아이스 드립 커피",
    "nameEn": "Iced Drip Coffee",
    "kcal": "",
    "categoryId": "mccafe-drink",
    "subCategoryId": "mccafe",
    "prices": {
      "delivery": 3200,
      "store": 2400
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Iced Drip Coffee",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "V001",
    "name": "제주 풋귤 맥피즈",
    "nameKo": "제주 풋귤 맥피즈",
    "nameEn": "Jeju Green Mandarin McFizz",
    "kcal": "M 164 / L 269",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 3300,
      "store": 2500
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Jeju Green Mandarin McFizz · M 164 / L 269 kcal",
    "isNew": true,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경: 얼음 없음/1 캡처 확인"
  },
  {
    "id": "V002",
    "name": "제주 풋귤 맥피즈 스프라이트 제로",
    "nameKo": "제주 풋귤 맥피즈 스프라이트 제로",
    "nameEn": "Jeju Green Mandarin McFizz Sprite Zero",
    "kcal": "M 65 / L 130",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 3300,
      "store": 2500
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Jeju Green Mandarin McFizz Sprite Zero · M 65 / L 130 kcal",
    "isNew": true,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경: 얼음 없음/1 캡처 확인"
  },
  {
    "id": "V003",
    "name": "그리머스 쉐이크",
    "nameKo": "그리머스 쉐이크",
    "nameEn": "Grimace Shake",
    "kcal": "355",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 3800,
      "store": 3000
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Grimace Shake · 355 kcal",
    "isNew": true,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "M 단일 사이즈"
  },
  {
    "id": "V004",
    "name": "코카-콜라",
    "nameKo": "코카-콜라",
    "nameEn": "Coca-Cola",
    "kcal": "M 133 / L 185",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 2800,
      "store": 2000
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Coca-Cola · M 133 / L 185 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "V005",
    "name": "코카-콜라 제로",
    "nameKo": "코카-콜라 제로",
    "nameEn": "Coca-Cola Zero",
    "kcal": "M 0 / L 0",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 2800,
      "store": 2000
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Coca-Cola Zero · M 0 / L 0 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "V006",
    "name": "스프라이트",
    "nameKo": "스프라이트",
    "nameEn": "Sprite",
    "kcal": "M 140 / L 194",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 2800,
      "store": 2000
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Sprite · M 140 / L 194 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "V007",
    "name": "스프라이트 제로",
    "nameKo": "스프라이트 제로",
    "nameEn": "Sprite Zero",
    "kcal": "M 0 / L 0",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 2800,
      "store": 2000
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Sprite Zero · M 0 / L 0 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "V008",
    "name": "환타",
    "nameKo": "환타",
    "nameEn": "Fanta",
    "kcal": "M 62 / L 86",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 2800,
      "store": 2000
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Fanta · M 62 / L 86 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": true,
    "note": "재료 변경 버튼 확인"
  },
  {
    "id": "V009",
    "name": "피치 아이스티",
    "nameKo": "피치 아이스티",
    "nameEn": "Peach Iced Tea",
    "kcal": "M 162 / L 229",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 3900,
      "store": 3100
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Peach Iced Tea · M 162 / L 229 kcal",
    "isNew": true,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "M",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": ""
  },
  {
    "id": "V010",
    "name": "바닐라 쉐이크",
    "nameKo": "바닐라 쉐이크",
    "nameEn": "Vanilla Shake",
    "kcal": "366",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 3600,
      "store": 2800
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Vanilla Shake · 366 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "M 단일 사이즈"
  },
  {
    "id": "V011",
    "name": "딸기 쉐이크",
    "nameKo": "딸기 쉐이크",
    "nameEn": "Strawberry Shake",
    "kcal": "367",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 3600,
      "store": 2800
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Strawberry Shake · 367 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "M 단일 사이즈"
  },
  {
    "id": "V012",
    "name": "초코 쉐이크",
    "nameKo": "초코 쉐이크",
    "nameEn": "Chocolate Shake",
    "kcal": "375",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 3600,
      "store": 2800
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Chocolate Shake · 375 kcal",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "M 단일 사이즈"
  },
  {
    "id": "V013",
    "name": "오렌지 주스",
    "nameKo": "오렌지 주스",
    "nameEn": "Orange Juice",
    "kcal": "",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": null,
      "store": null
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": false,
      "store": false
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Orange Juice",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": false,
      "store": true
    },
    "referenceStatus": {
      "app": "not-found",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": false,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": false,
    "ingredientChangeAvailable": false,
    "note": "웹 캡처만 확인"
  },
  {
    "id": "V014",
    "name": "생수",
    "nameKo": "생수",
    "nameEn": "Mineral Water",
    "kcal": "",
    "categoryId": "mccafe-drink",
    "subCategoryId": "drink",
    "prices": {
      "delivery": 2100,
      "store": 1300
    },
    "setPrices": {
      "delivery": null,
      "store": null
    },
    "largeSetExtras": {
      "delivery": null,
      "store": null
    },
    "priceConfirmed": {
      "delivery": true,
      "store": true
    },
    "image": "",
    "accent": "#4c3024",
    "description": "Mineral Water",
    "isNew": false,
    "badges": [],
    "availability": {
      "delivery": true,
      "store": true
    },
    "referenceStatus": {
      "app": "confirmed",
      "web": "confirmed"
    },
    "canMakeSet": false,
    "setBaseExtraPrices": {
      "delivery": null,
      "store": null
    },
    "setBaseExtraPrice": 0,
    "priceBasis": "단품",
    "appExists": true,
    "webExists": true,
    "setAvailable": false,
    "deliveryAvailable": true,
    "ingredientChangeAvailable": false,
    "note": "단일 사이즈"
  }
]

const hasMediumAndLargeSizes = (menu) => menu.categoryId === 'mccafe-drink' && /\bM\b[^/]*\/\s*L\b/i.test(menu.kcal)

const createDrinkSizes = (menu) => hasMediumAndLargeSizes(menu)
  ? [
      { id: 'M', name: 'M', extraPrice: 0, isDefault: true },
      { id: 'L', name: 'L', extraPrice: 400, isDefault: false },
    ]
  : [{ id: 'single', name: menu.priceBasis === 'M' ? 'M' : '기본', extraPrice: 0, isDefault: true }]

const REMOVED_MENU_IDS = new Set(['S006', 'S007', 'S015'])

const hydrateFrenchFries = (menu) => {
  if (menu.id !== 'S012') return menu

  const defaultSize = frenchFriesSizeOptions.find((option) => option.isDefault)
  return {
    ...menu,
    name: '후렌치 후라이',
    nameKo: '후렌치 후라이',
    nameEn: 'French Fries',
    kcal: String(defaultSize.kcal),
    prices: { ...defaultSize.prices },
    image: defaultSize.image,
    description: `French Fries · ${defaultSize.kcal} kcal`,
    priceBasis: defaultSize.size,
    defaultSize: defaultSize.size,
    sizeOptions: frenchFriesSizeOptions.map((option) => ({ ...option, prices: { ...option.prices } })),
    note: '단품은 S/M/L 선택, 버거 세트는 일반 M·라지 L 자동 구성',
  }
}

const hydratedMenus = rawMenus
  .filter((menu) => !REMOVED_MENU_IDS.has(menu.id))
  .map(hydrateFrenchFries)
  .map((menu) => ({
  ...menu,
  image: menu.image || `/images/menus/${menu.id}.png`,
  setSizes: menu.canMakeSet ? createSetSizes(menu.largeSetExtras) : [],
  sides: menu.canMakeSet ? sides : [],
  drinks: [],
  sizes: menu.categoryId === 'mccafe-drink' ? createDrinkSizes(menu) : [],
  ingredients: menu.ingredientChangeAvailable && menu.categoryId === 'burger' ? burgerIngredients : [],
  }))

const setDrinkMenus = hydratedMenus
  .filter((menu) => menu.categoryId === 'mccafe-drink')
  .map((menu) => ({ ...menu, isDefault: menu.id === 'V004' }))

const mockMenus = hydratedMenus.map((menu) => ({
  ...menu,
  drinks: menu.canMakeSet ? setDrinkMenus : [],
}))

export { mockMenus }
