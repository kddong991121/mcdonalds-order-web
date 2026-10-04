import { getMenuCardCommerceInfo } from '../../utils/price.js'
import ProductVisual from './ProductVisual.jsx'
import './MenuCard.css'

function MenuCard({ menu, orderChannel, onSelect }) {
  const commerceInfo = getMenuCardCommerceInfo(menu, orderChannel)
  const handleSelect = () => {
    onSelect(menu)
  }

  return (
    <article className="menu-card">
      <button className="menu-card__button" type="button" onClick={handleSelect}>
        <div className="menu-card__image-wrap">
          <ProductVisual className="menu-card__image" src={menu.image} name={menu.name} accent={menu.accent} />
        </div>
        <ul className="menu-card__badges" aria-label="상품 표시">
          {menu.isNew && <li className="is-new">NEW</li>}
          {menu.badges?.map((badge) => <li key={badge}>{badge}</li>)}
        </ul>
        <h2 className="menu-card__name">{menu.name}</h2>
        <p className="menu-card__name-en">{menu.nameEn}</p>
        <p className="menu-card__kcal">{menu.kcal ? `${menu.kcal} kcal` : '열량 정보 확인 중'}</p>
        <div className="menu-card__commerce">
          <p className="menu-card__price">{commerceInfo.priceLabel}</p>
          <p className={`menu-card__availability is-${commerceInfo.status}`}>{commerceInfo.statusLabel}</p>
          {commerceInfo.helperText && <p className="menu-card__helper">{commerceInfo.helperText}</p>}
        </div>
      </button>
    </article>
  )
}

export default MenuCard
