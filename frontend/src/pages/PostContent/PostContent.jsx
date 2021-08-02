import './postContent.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
import {Link, useHistory} from 'react-router-dom'
import {format} from 'timeago.js';
import { postDeleteAction } from '../../Redux/Actions/posts/postDeleteAction';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { postLikeAction } from '../../Redux/Actions/posts/postLikeAction';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function PostContent() {
  const [onMenu, setOnMenu] = useState(true);
  const dispatch = useDispatch();
  const {postId} = useParams();
  const [sortPosts, setSortPosts] = useState([]);
  const [nextPosts, setNextPosts] = useState([]);
  const [slicePosts, setSlicePosts] = useState([]);
  const imgLink = 'http://localhost:5000/images/';
  const history = useHistory();
  const [like, setLike] = useState("");
  const [isLike, setIsLike] = useState(false);

  useEffect(()=>{
    dispatch(postIdFromGetAction(postId));
  },[dispatch])

  const {post, loading} = useSelector(state=>state.postIdFromGetReducer);
  const {userInfo} = useSelector(state=>state.userGetReducer);
  const {posts} = useSelector(state=>state.postGetReducer);
  const {userInfo:myUser} = useSelector(state=>state.userLoginReducer);
  const {success} = useSelector(state=>state.postLikeReducer);


  console.log(userInfo && userInfo);


  const postDeleteHandler = (e) =>{
    if(window.confirm("정말 삭제합니까?")){
      e.preventDefault();
    dispatch(postDeleteAction(post._id, myUser._id));
    history.push('/posts');
    window.location.reload();
    }
  }

  //좋아요
  const postLikeHandler = (e) =>{
    dispatch(postLikeAction(postId, myUser._id));
    setIsLike(!like);
    setLike(isLike ? like-1 : like + 1);
  }

  useEffect(()=>{
    if(post){
      setLike(post?.likes.length);
      post.likes.includes(myUser?._id) ? setIsLike(true) : setIsLike(false);
    }
  }, [post?.likes, myUser]);
  

  useEffect(()=>{
    dispatch(postAllGetAction());
  }, [dispatch])
  
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
    if(posts){
      setSortPosts(posts.sort((p1, p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    }
  }, [posts]);

  useEffect(()=>{
    if(sortPosts && post){
      setNextPosts(sortPosts.filter((p) => (
        new Date(post.createdAt) > new Date(p.createdAt))))
    }
  }, [sortPosts, post])

  useEffect(()=>{
    if(sortPosts && post && nextPosts){
      setSlicePosts(nextPosts.slice(0, 3));
    }
    
  }, [nextPosts, sortPosts, post])
  
  
  return (
    <div className="postContent">
      <div className={onMenu ? "postContentLeft" : "hidden postContentLeft"}>
        <div className="postContentLeftWrap">
        {loading ? <CircularProgress size="50px" style={{color:"gray", position:"relative",left:"50%",top:"20vh"}}/> :(
        <>
        <div className="postContentTop">
          <img src={post?.image ? (imgLink + post.image) : (imgLink+'post/nature3.jpg')} alt="" />
        </div>

        <div className="postContentBottom">
          <div className="postContentBottomTop">

            <h4 className="postContentBottomHeader">{post?.title}</h4>
            <ul className="categories">
              <li className="category">{post?.category}</li>
            </ul>
            <div className="userInfo">
              <Link to ={`/profile/${userInfo?._id}`} >
              <img src={userInfo?.profilePicture ? (imgLink + userInfo.profilePicture) : (imgLink + 'person/noavatar.png')} alt="" />
              </Link>
              <span className="userName">{userInfo?.name}</span>
            </div>

            <div className="postIcons">
            <div className="likeIconBox" onClick={postLikeHandler}>
            {isLike ? <FavoriteIcon  className="likeIcon" fontSize="large"/> : <FavoriteBorderIcon className="likeIcon" fontSize="large"/>}
            
            <span className="likeNum">{like}</span>
            </div>
            {userInfo?._id === myUser?._id &&(
              <>
              <Link to={`/write/${post?._id}`}><EditIcon className="editIcon" fontSize="large"/></Link>
              <DeleteIcon onClick={postDeleteHandler} className="deleteIcon" fontSize="large"/>
              </>
            ) }
            </div>
            <span className="postDay">{post && year+'-'+(month>9?month:"0"+month)+'-'+(day<10?"0"+day:day)}</span>
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
                <span className="nextPostDay">{format(p.createdAt)}</span>
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
