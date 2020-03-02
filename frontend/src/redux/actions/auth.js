import axios from 'axios'

export const register = registerInfo =>
  axios.post('/auth/register', registerInfo)

export const login = loginInfo => {
  return axios.post('/auth/login', loginInfo).then(token => {
    //write token in the axios headers so that the demande afterwards
    //systematically include the token
    axios.defaults.headers.common.Authorization = `Bearer ${token}`

    //write token in the localStorage for getting token by refreshing
    localStorage.setItem('CANOPY_TOKEN', `Bearer ${token}`)
    return token
  })
}

export const logout = () => {
  localStorage.removeItem('CANOPY_TOKEN')
  axios.defaults.headers.common.Authorization = ''
}
