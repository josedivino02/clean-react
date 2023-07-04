import { SignUp } from '@/application/pages'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' Component={makeLogin} />
        <Route path='/signup' Component={SignUp} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
