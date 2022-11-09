import { Button } from '@chakra-ui/react'
import React from 'react'
import { AuthApi } from '../api/authApi'

const Home = () => {

  const refreshToken = () => {
    AuthApi.refreshToken().then(res => {
      console.log(res);
    })
  }
  return (
    <div>
      <Button onClick={refreshToken}>Refresh Token</Button>
    </div>
  )
}

export default Home