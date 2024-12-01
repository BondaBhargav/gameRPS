import Cookies from 'js-cookie'

import {Outlet, Navigate} from 'react-router-dom'
const ProtectRouter = props => {
  console.log(props)
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Navigate to="/login" />
  } else {
    return <Outlet {...props} />
  }
}

export default ProtectRouter