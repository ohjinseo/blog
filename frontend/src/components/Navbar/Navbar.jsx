import './Navbar.css'
import noAvatar from '../../assets/images/person/noavatar.png'
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="navBarLeft">
          <div className="navBarLeftLogo">
            <span className="navBarLeftLogoText">Jinseo's Blog</span>
          </div>
        </div>

        <div className="navBarCenter">
          <ul className="navBarCenterItems">
            <li className="navBarCenterItem">HOME</li>
            <li className="navBarCenterItem">WRITE</li>
            <li className="navBarCenterItem">POSTS</li>
            <li className="navBarCenterItem">CATEGORY</li>
            <li className="navBarCenterItem">LOGOUT</li>
          </ul>
        </div>

        <div className="navBarRight">
          <div className="navBarRightInputContainer">
            <input placeholder="Search" type="text" className="navBarRightSearch" />
            <SearchIcon className="navBarRightSearchIcon"/>
          </div>
          <img className="navBarRightImg" src={noAvatar} alt="" />
          
        </div>
      </div>
    </div>
  )
}
