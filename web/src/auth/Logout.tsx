import React, {useEffect} from 'react'
import { AuthApi } from '../api/authApi';

const Logout = () => {

  useEffect(() => {
    AuthApi.logout().then(res => {
      // console.log(res);
    })
  }, []);
  return (
    <div>Logout</div>
  )
}

export default Logout