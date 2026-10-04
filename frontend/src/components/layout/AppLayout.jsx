import { Outlet, useLocation } from 'react-router-dom'
import ScrollToTopButton from '../common/ScrollToTopButton.jsx'
import ConnectedHeader from './ConnectedHeader.jsx'

function AppLayout() {
  const location = useLocation()
  const scrollTarget = location.pathname === '/menus' ? '#menu-page-scroll-anchor' : ''

  return (
    <div className="app-layout">
      <ConnectedHeader />
      <Outlet />
      <ScrollToTopButton targetSelector={scrollTarget} />
    </div>
  )
}

export default AppLayout
