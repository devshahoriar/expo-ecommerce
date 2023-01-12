import { serverUrl } from '../data/constant'

const isServerWork = async () => {
  try {
    const response = await fetch(serverUrl)
    return response.status === 200
  } catch (error) {
    return false
  }
}

export default isServerWork
