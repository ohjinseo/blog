import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAction } from '../../Redux/Actions/users/userLoginAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import './login.css'
import { Link} from 'react-router-dom'

export default function Login({history}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {error, loading, userInfo} = useSelector(state => state.userLoginReducer);
  console.log(history);
  useEffect(()=>{
    if(userInfo){
      history.push('/');
    }
  }, [userInfo])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(userLoginAction(email, password));
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <form className="loginForm" onSubmit={onSubmitHandler}>
          <div className="loginFormTop">

          <h4 className="loginHeader">Login</h4>
          </div>
          <div className="loginFormBottom">

          <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" />
          <input required minLength="6" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
          {error && <p className="errorMessage">{error}</p>}
          <button type="submit">{loading ? <CircularProgress style={{margin:"-5px"}} size="27px" color="black"/> : "Login"}</button>
          </div>
          
          <Link to='/register' style={{color:"black", textDecoration:"none", width:"100%", display:"flex", justifyContent:"center"}}>
            <div className="linkRegister">
              Go to Register
            </div>
          </Link>
        </form>
          
      </div>
    </div>
  )
}
