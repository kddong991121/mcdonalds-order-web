function PagePlaceholder({ title, description, details = [] }) {
  return (
    <main className="page-placeholder">
      <p className="page-placeholder__eyebrow">쌍용교육센터 프론트엔드 프로젝트 · 1팀</p>
      <h1>{title}</h1>
      <p>{description}</p>
      {details.length > 0 && (
        <ul className="page-placeholder__details">
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
      <p className="page-placeholder__status">
        8단계 공통 UI까지 준비된 상태입니다.
      </p>
    </main>
  )
}

export default PagePlaceholder
