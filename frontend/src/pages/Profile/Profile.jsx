import PostVer2 from '../../components/PostVer2/PostVer2';
import './profile.css'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { postFromUserIdGetAction } from '../../Redux/Actions/posts/postGetAction';
import EditIcon from '@material-ui/icons/Edit';
import { userGetAction } from '../../Redux/Actions/users/userGetAction';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import { userUpdateAction } from '../../Redux/Actions/users/userUpdateAction';
import axios from 'axios';
import { userLoginAction } from '../../Redux/Actions/users/userLoginAction';


export default function Profile() {
  const imgLink = 'http://localhost:5000/images/';
  const dispatch = useDispatch();
  const userId = useParams();
  const {userPosts} = useSelector(state=>state.postFromUserIdGetReducer);
  const {userInfo} = useSelector(state=>state.userGetReducer);
  const {userInfo:myUser} = useSelector(state=>state.userLoginReducer);
  const {error:passwordError, success} = useSelector(state => state.userUpdateReducer);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [desc, setDesc] = useState("");
  const [from, setFrom] = useState("");
  const [image, setImage] = useState(null);
  const [editOn, setEditOn] = useState(false);
  const [error, setError] = useState(false);

  useEffect(()=>{
    if(passwordError){
      setError(true);
    }
  }, [passwordError])

  useEffect(()=>{
    if(success){
      window.location.reload();
      window.scrollTo({top:0})
    }
  }, [success])

  useEffect(()=>{
    window.scrollTo({top:0})
    dispatch(postFromUserIdGetAction(userId));
  }, [userId]);

  useEffect(()=>{
    dispatch(userGetAction(userId.userId));
  }, [userId])

  useEffect(()=>{
    if(userInfo){
      setName(userInfo.name);
      setEmail(userInfo.email);
      setDesc(userInfo.desc)
      setFrom(userInfo.from);
      setError(false);
    }
  }, [userInfo])

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    var userData = {
      userId:myUser._id,
      name,
      password,
      checkPassword,
      desc,
      from,
    }

    if(image){
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      userData.profilePicture = filename;
      try {
        await axios.post('/api/upload', data);
      } catch (error) {
      }
    }

    dispatch(userUpdateAction(userData));
  }

  useEffect(()=>{
    if(image){
      window.scrollTo({top:0, behavior:"smooth"})
    }
  }, [image])

  const cancleClickHandle = (e) => {
    setEditOn(false);
    setName(userInfo.name);
    setEmail(userInfo.email);
    setDesc(userInfo.desc)
    setFrom(userInfo.from);
    setError(false);
    setImage(null);
  }

  return (
    <div className="profile">
      <div className="profileImgBox">
        <img className="profileBgImg" src={imgLink+'post/nature.jpg'} alt="" />
        
        <div className="profileNameBox">
        {image && (<img className="profileImg" src={URL.createObjectURL(image)} alt="" />) ||(<img className="profileImg" src={userInfo?.profilePicture ? (imgLink + userInfo.profilePicture) : imgLink+'person/noavatar.png'} alt="" />)}
        <h4 className="profileName">{userInfo?.name}</h4>
        <p className="profileDesc">{userInfo?.desc}</p>
        </div>
      </div>

      <div className="profileCenter">
        <div className="profileCenterLeft">
          <div className="profileCenterLeftHeaderBox">
            <h4 className="profileCenterLeftHeader">{myUser?._id === userInfo?._id ? "My Posts" : "User Posts"}</h4>
            <hr className="hr__2"/>
          </div>
          {userPosts?.map((p)=>(
            <PostVer2 post={p} />
          ))}
        </div>

      <div className="profileCenterRight">
        <div className="profileInfo">
          <div className="profileInfoHeaderBox">
            <div className="profileInfoHeaderFlexBox">
          <h4 className="profileInfoHeader">{myUser?._id === userInfo?._id ? "My Information" : "User Information"}</h4>
          <hr className="hr__2"/>

            </div>
            
          {myUser?._id === userInfo?._id && !editOn && <EditIcon onClick={e=>setEditOn(true)} className="profileInfoEditIcon" fontSize="large"/>}

          </div>
          {!editOn &&( <ul className="profileInfoItems">
            <li className="profileInfoItem">Name : {userInfo?.name}</li>
            <li className="profileInfoItem">Email : {userInfo?.email}</li>
            <li className="profileInfoItem">From : {userInfo?.from || ' -'}</li>
            <li className="profileInfoItem">posts : {userPosts?.length}</li>
          </ul>) }
          {editOn && (
            <form className="profileInfoEdit" onSubmit={onSubmitHandler}>
              <CancelIcon onClick={cancleClickHandle} fontSize="large" className="profileInfoEditCancleIcon"/>
            <ul className="profileInfoEditItems">
            <li className="profileInfoEditItem">
              <span>Name</span> 
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name"  type="name" />
            </li>

            <li className="profileInfoEditItem">
              <span>Email</span>
              <input disabled value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" />
              </li>

              <li className="profileInfoEditItem">
              <span>Password</span>
              <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
              </li>

              <li className="profileInfoEditItem">
              <span>Check Password</span>
              <input required value={checkPassword} onChange={e=>setCheckPassword(e.target.value)} placeholder="Check Password" type="Password" />
              </li>

              {error && <p style={{color:"red", marginBottom:"2%"}} className="error">{passwordError}</p>}

              <li className="profileInfoEditItem">
              <span>Desc</span>
              <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="What's your mind?" type="text" />
              </li>

              <li className="profileInfoEditItem">
              <span>From</span>
              <input value={from} onChange={e=>setFrom(e.target.value)} placeholder="Where are you from?" type="text" />
              </li>

              <li className="profileInfofileItem">
                <span>Profile Image</span>
              
                <label htmlFor="fileIcon" className="fileIconBox__2">
                  <AddIcon fontSize="large"  className="fileIcon__2" />
                  <input onChange={e=>setImage(e.target.files[0])} type="file" id="fileIcon" style={{display:"none"}}/>
                </label>
                <button className="editButton" type="submit">Edit</button>
              </li>

              
            </ul>
          </form>
          )}
          
        </div>
      </div>
      </div>

      
      

    </div>
  )
}
