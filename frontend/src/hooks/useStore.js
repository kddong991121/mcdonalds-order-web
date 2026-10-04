import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext.jsx'

function useStore() {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error('useStore는 StoreProvider 안에서 사용해야 합니다.')
  }

  return store
}

export { useStore }
