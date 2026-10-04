import { formatPrice } from '../../utils/price.js'
import './PriceSummary.css'

function PriceSummary({ title = '주문 금액', rows = [], total = 0 }) {
  return (
    <section className="price-summary" aria-labelledby="price-summary-title">
      <h2 id="price-summary-title">{title}</h2>
      <dl className="price-summary__rows">
        {rows.map((row) => (
          <div className="price-summary__row" key={row.id || row.label}>
            <dt>{row.label}</dt>
            <dd>{formatPrice(row.amount)}</dd>
          </div>
        ))}
        <div className="price-summary__row price-summary__row--total">
          <dt>총 금액</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
    </section>
  )
}

export default PriceSummary
