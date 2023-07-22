import { Logo } from '@/application/components'
import { ApiContext } from '@/application/contexts'
import React, { memo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './header-styles.scss'

const Header: React.FC = () => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate();
  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    setCurrentAccount(undefined)
    navigate('/login')
  }
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span>DIVINO</span>
          <a data-testid="logout" href="#" onClick={logout}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
