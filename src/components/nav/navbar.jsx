import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserDetails } from '../../shared/hooks'
import PropTypes from 'prop-types'

const NavButton = ( {text, onClinckHandler }) => {
    return(
        <span className='nav-button' onClick={onClinckHandler}>
            {text}
        </span>
    )
}

NavButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClinckHandler: PropTypes.func.isRequired
}

export const Navbar = () => {
    const { isLogged, logout } = useUserDetails()
    const navigate = useNavigate()
    const [navVisible, setNavVisible ] = useState(false)

    const handleNavigateToAuthPage = () => navigate("/auth")
    const handleNavigateToSettings = () => navigate("/settings")
    const handleNavigateToHome = () => navigate("/home")
    const handleLogout = () => logout()
    const toggleNavVisibility = () => setNavVisible(!navVisible)

  return (
    <div className='nav-container'>
        <NavLogo onClinckHandler={toggleNavVisibility}/>
        <div className={`nav-buttons-container ${navVisible ? "visible" : ""}`}>
            <NavButton
                text="Home"
                onClinckHandler={handleNavigateToHome}
            />
            {!isLogged ? (
                <NavButton
                    text="Sig in"
                    onClinckHandler={handleNavigateToAuthPage}
                />
                ):(
                    <>
                        <NavButton
                        text="My count "
                        onClinckHandler={handleNavigateToSettings}
                        />
                        <NavButton text="log out" onClinckHandler={handleLogout}/>
                    </>
                )
            }
        </div>
    </div>
  )
}