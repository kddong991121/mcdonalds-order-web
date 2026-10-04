import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import EmptyState from '../components/common/EmptyState.jsx'

function NotFoundPage() {
  const navigate = useNavigate()
  return <main className="flow-page"><EmptyState title="페이지를 찾을 수 없습니다." description="주소가 올바른지 확인해 주세요." action={<Button onClick={() => navigate('/menus')}>메뉴로 돌아가기</Button>} /></main>
}

export default NotFoundPage
