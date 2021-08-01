import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterAction } from '../../Redux/Actions/users/userRegisterAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import './register.css'
import '../Login/login.css';
import { Link, useHistory } from 'react-router-dom'


export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checkPassword, setCheckPassword] = useState("")
  const history = useHistory();

  const dispatch = useDispatch();

  const {error, loading, userInfo} = useSelector(state => state.userRegisterReducer);

  useEffect(()=>{
    if(userInfo){
      history.push('/login');
    }
  }, [userInfo])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userRegisterAction(name, email, password, checkPassword));
    
  }
  
  
  return (
    <div className="register">
      <div className="registerWrapper">
        <form className="registerForm" onSubmit = {onSubmitHandler}>
          <div className="registerFormTop">

          <h4 className="registerHeader">Register</h4>
          </div>
          <div className="registerFormBottom">
          <input value={name} onChange={e=>setName(e.target.value)} required placeholder="Name" type="name" minLength="3"/>
          <input value={email} onChange={e=>setEmail(e.target.value)}  required placeholder="Email" type="email" />
          <input value={password} onChange={e=>setPassword(e.target.value)}  required placeholder="Password" type="password" minLength="6"/>
          <input value={checkPassword} onChange={e=>setCheckPassword(e.target.value)}  required placeholder="Password Check" type="password" minLength="6"/>
          {error && <p className="errorMessage">{error}</p>}
          <button type="submit">{loading ? <CircularProgress style={{margin:"-5px"}} size="27px" color="black"/> : "Register"}</button>
          <Link to='/login' style={{color:"black", textDecoration:"none", width:"100%", display:"flex", justifyContent:"center"}}>
            <div className="linkRegister linkLogin">
              Go to Login
            </div>
          </Link>
          </div>

        </form>
      </div>
    </div>
  )
}
