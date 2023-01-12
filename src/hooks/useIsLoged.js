import { useSelector } from 'react-redux'

const useIsLOged = () => {
  const user = useSelector((s) => s.user)
  return user?.jwt?.length > 0
}

export default useIsLOged
