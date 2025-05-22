import React, {useState} from 'react'
import { Login, Register } from '../../components'
import './authPage.css'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handleAuthPageToggle = () => {
    setIsLogin((prevState) => !prevState)
  }
  return (
    <div className='auth-container'>
      {isLogin ? (
        <Login switchAuthHandler={handleAuthPageToggle}/>
      ): (
        <Register switchAuthHandler={handleAuthPageToggle}/>
      )}
    </div>
  )
}