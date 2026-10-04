import './EmptyState.css'

function EmptyState({ title, description, action }) {
  return (
    <section className="empty-state" aria-live="polite">
      <div className="empty-state__symbol" aria-hidden="true">
        M
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </section>
  )
}

export default EmptyState
