import { Logo } from '@/application/components'
import { ApiContext } from '@/application/contexts'
import { useLogout } from '@/application/hooks'
import React, { memo, useContext } from 'react'
import Styles from './header-styles.scss'

const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useContext(ApiContext)
  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={buttonClick}>Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
