import './Navbar.css'
import noAvatar from '../../assets/images/person/noavatar.png'
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const {userInfo} = useSelector(state=>state.userLoginReducer);
  const imgLink = "http://localhost:5000/images/";

  const onClickLogout = (e) => {
    e.preventDefault();
    if(userInfo){
      localStorage.removeItem('userAuth');
      window.location.reload();
    }
  }
  return (
    <div className="navbar">
      <div className="navbarWrapper">
        <div className="navBarLeft">
          <div className="navBarLeftLogo">
            <Link to="/" style={{textDecoration:"none", color:"black"}}>
            <span className="navBarLeftLogoText">BLOG</span>
            </Link>
          </div>
        </div>

        <div className="navBarCenter">
          <ul className="navBarCenterItems">
          <Link to="/" style={{textDecoration:"none", color:"black"}}>
            <li className="navBarCenterItem">HOME</li>
            </Link>
            <Link style={{'textDecoration':"none", color:"black"}} to='/write'>
              <li li className="navBarCenterItem">
                WRITE
              </li>
              </Link>
              <Link to="/posts" style={{textDecoration:"none", color:"black"}}>
            <li className="navBarCenterItem">POSTS</li>
            </Link>
            <Link to="/category" style={{textDecoration:"none", color:"black"}}>
            <li className="navBarCenterItem">CATEGORY</li>
            </Link>
            <li onClick={onClickLogout} className="navBarCenterItem">LOGOUT</li>
          </ul>
        </div>

        <div className="navBarRight">
          <div className="navBarRightInputContainer">
            <input placeholder="Search" type="text" className="navBarRightSearch" />
            <SearchIcon className="navBarRightSearchIcon"/>
          </div>
          <Link to={`/profile/${userInfo?._id}`}>
          <img className="navBarRightImg" src={userInfo?.profilePicture ? imgLink + userInfo.profilePicture : imgLink + 'person/noavatar.png'} alt="" />
          </Link>
          
        </div>
      </div>
    </div>
  )
}
