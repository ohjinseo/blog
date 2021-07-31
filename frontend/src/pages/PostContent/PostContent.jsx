import './postContent.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import userImage from '../../assets/images/person/noavatar.png'
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postAllGetAction, postIdFromGetAction } from '../../Redux/Actions/posts/postGetAction';
import { useParams } from 'react-router';
import { userGetAction } from '../../Redux/Actions/users/userGetAction';
import {Link} from 'react-router-dom'

export default function PostContent() {
  const [onMenu, setOnMenu] = useState(true);
  const dispatch = useDispatch();
  const {postId} = useParams();
  const [sortPosts, setSortPosts] = useState([]);
  const [nextPosts, setNextPosts] = useState([]);
  const [slicePosts, setSlicePosts] = useState([]);
  const imgLink = 'http://localhost:5000/images/';

  
  useEffect(()=>{
    dispatch(postIdFromGetAction(postId));
  },[dispatch])

  const {post, loading} = useSelector(state=>state.postIdFromGetReducer);
  const {userInfo} = useSelector(state=>state.userGetReducer);
  const {posts} = useSelector(state=>state.postGetReducer);
  
  useEffect(()=>{
    window.scrollTo({top:0})
    if(post){
      dispatch(userGetAction(post.userId));
    }
  }, [post])
  
  if(post){
    var date = new Date(post.createdAt);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
  }

  useEffect(()=>{
    dispatch(postAllGetAction());
  }, [dispatch])

  useEffect(()=>{
    if(posts){
      setSortPosts(posts.sort((p1, p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    }

    if(sortPosts && post){
      setNextPosts(sortPosts.filter((p) => (
        new Date(post.createdAt) > new Date(p.createdAt))))
    }
  },[posts, sortPosts])

  useEffect(()=>{
    if(nextPosts){
      setSlicePosts(nextPosts.slice(0, 3));
    }
  }, [nextPosts])
  
  return (
    <div className="postContent">
      <div className={onMenu ? "postContentLeft" : "hidden postContentLeft"}>
        <div className="postContentLeftWrap">
        {loading ? <CircularProgress size="50px" style={{color:"gray", position:"relative",left:"50%",top:"20vh"}}/> :(
        <>
        <div className="postContentTop">
          <img src={post ? (imgLink + post.image) : (imgLink+'post/nature.jpg')} alt="" />
        </div>

        <div className="postContentBottom">
          <div className="postContentBottomTop">

            <h4 className="postContentBottomHeader">{post?.title}</h4>
            <ul className="categories">
              <li className="category">{post?.category}</li>
            </ul>
            <div className="userInfo">
              <img src={userInfo?.profilePicture ? (imgLink + userInfo.profilePicture) : (imgLink + 'person/noavatar.png')} alt="" />
              <span className="userName">{userInfo?.name}</span>
            </div>
            <div className="postIcons">
            <EditIcon className="editIcon" fontSize="large"/>
            <DeleteIcon className="deleteIcon" fontSize="large"/>

            </div>
            <span className="postDay">{post && year+'-'+(month>9?month:"0"+month)+'-'+day}</span>
          </div>

          <div className="postContentBottomCenter">
            <pre>{post?.desc}</pre>
          </div>
          </div>
          </>
      )}
        </div>
      </div>

      <div className={onMenu ? "postContentRight" : "hidden postContentRight"}>
        <div className="postContentRightWrapper">
          {onMenu ? <ArrowForwardIosIcon onClick={e=>setOnMenu(!onMenu)} fontSize="large" className="arrowIcon"/>
          : <ArrowBackIosIcon onClick={e=>setOnMenu(!onMenu)} fontSize="large" className="arrowLeftIcon"/>}
          <div className="shareBox">
            <h4 className="shareBoxHeader">SHARE</h4>
            <hr className="hr__1"/>
              <div className="shareBoxIcons">
                <GitHubIcon className="shareBoxIcon" />
                <FacebookIcon className="shareBoxIcon facebook" />
                <InstagramIcon className="shareBoxIcon insta" />
                <TwitterIcon className="shareBoxIcon" />
                <MailIcon className="shareBoxIcon" />
              </div>
          </div>

          
          <div className="nextPostsBox">
            <h4 className="nextPostsBoxHeader">Next posts</h4>
            {slicePosts && slicePosts.map(p => (
              <>
                <hr className="hr__1" />
            <Link  to={`${p._id}`} style={{textDecoration:"none", color:"inherit"}} className="nextPost">
              <div className="nextPostLeft">
                  <img className="nextPostImg" src={p.image ? (imgLink + p.image) : (imgLink + 'post/nature3.jpg')} />
              </div>
              
              <div className="nextPostRight">
                <h4 className="nextPostHeader">{p.title}</h4>
                <span className="nextPostDay">{p.createdAt}</span>
              </div>
            </Link>
              </>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  )
}
