import React from 'react'

const Header = ({mainHeader, subHeader}) => {
  return (
    <div className='auth-header-wrapper'>
        <header className="main-header">{mainHeader}</header>
        <header className="sub-header">{subHeader}</header>
    </div>
  )
}

export default Header