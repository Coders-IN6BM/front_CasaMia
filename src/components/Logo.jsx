import React from 'react'
import PropTypes from 'prop-types'

export const Logo = ({ text }) => {
  const logo = "https://res.cloudinary.com/dsy7q8jga/image/upload/v1748325595/logosinfondo_zqipuh.png" 
  return (
    <div className='auth-form-logo-container' style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <img 
        src={logo} 
        alt="Logo de tu aplicación"
        style={{
          width: '40px',
          height: '40px'
        }} 
      />
      <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{text}</span>
    </div>
  )
}

Logo.propTypes = {
  text: PropTypes.string.isRequired
}