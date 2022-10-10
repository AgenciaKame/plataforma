import logo from '../../assets/logo-white.png'
import marca from '../../assets/marca-registrada.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer-section'>
      <div className='footer-logo'>
        <img src={logo} alt='logo' />
      </div>
      <div className='footer-copy'>
        <img src={marca} alt='copy'/>
        <p>2022 Agencia Kame</p>
      </div>
    </footer>
  )
}

export default Footer