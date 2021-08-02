import './posts.css'
import Calendar from 'react-calendar'
import './Calendar.css';
import { useEffect, useState } from 'react';
import MiniPost from '../../components/MiniPost/MiniPost';
import PostVer2 from '../../components/PostVer2/PostVer2';
import { useDispatch, useSelector } from 'react-redux';
import { postAllGetAction, postCategoryGetAction } from '../../Redux/Actions/posts/postGetAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router';
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';

export default function Posts() {
  const [value, onChange] = useState("");
  const [sortPosts, setSortPosts] = useState([]);
  const dispatch = useDispatch();
  const {loading, posts} = useSelector(state=>state.postGetReducer);
  const {loading:categoryLoading, posts:categoryPosts} = useSelector(state=>state.postGetCategoryReducer);
  const {category} = useParams();
  let [popularPosts, setPopularPosts] = useState([]);
  const [slicePopularPosts, setSlicePopularPosts] = useState([]);
  const [dayPosts, setDayPosts] = useState([]);
  const imgLink = "http://localhost:5000/images/";

  useEffect(()=>{
    if(value!==null){
      window.scrollTo({top:0, behavior:"smooth"})
      const _posts = [...sortPosts];
      setDayPosts(_posts.filter((p) => {
        if(new Date(p.createdAt).getFullYear() === new Date(value).getFullYear()
        && new Date(p.createdAt).getMonth() === new Date(value).getMonth()
        && new Date(p.createdAt).getDate() === new Date(value).getDate()){
          return true;
        }
      }))
    }
  }, [value])
  

  useEffect(()=>{
    if(category){
      dispatch(postCategoryGetAction(category));
    }else{
      dispatch(postAllGetAction());
    }
  }, [dispatch, category]);



  useEffect(() => {
    if(posts){
      const _posts = [...posts];
      setPopularPosts(_posts.sort((p1, p2)=>{
        return p2.likes.length - p1.likes.length;
      }))
    }
  }, [posts])

  useEffect(()=>{
    setSlicePopularPosts(popularPosts.slice(0, 3))
  }, [popularPosts])



  useEffect(()=>{
    window.scrollTo({top:0})
    if(category && categoryPosts){
      const _categoryPosts = [...categoryPosts];
      setSortPosts(_categoryPosts.sort((p1, p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    }
    else if(posts){
      const _posts = [...posts];
      setSortPosts(_posts.sort((p1, p2)=>{
        
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    }
  }, [posts, categoryPosts])

  return (
    <div className="posts"> 
    
    {category ? (
    <div className="categoryImgBox">
    <img className="categoryImg" src={imgLink + `post/${category}.jpg`}/>
    <h4 className="categoryName">{category}</h4>
    </div>): ""}

      <div className="postsWrapper">
        
      <div className="postsLeft">
        {loading || categoryLoading ? <CircularProgress size="50px" style={{color:"gray", position:"relative", 
      top:"20%"}}/> : (value ? dayPosts.map((post) => < PostVer2 key={post._id} post={post}/>) :  sortPosts?.map((post) => < PostVer2 key={post._id} post={post}/>))}

        </div>

        <div className="postsRight">
          <div className="postsRightWrapper">
          <div className="postsRightTop">
            <div className="calenderBox">
            <hr />
            <h4 className="calenderHeader">SELECT DAY</h4>
            <hr />
            <div className="calendarBox">
            <Calendar
          className="Calender"
          onChange={onChange}
          value={value}
        />
        <CancelScheduleSendIcon onClick={e=>onChange("")} fontSize="large" className="cancleIcon"/>
            </div>
          
        </div>
          </div>
          <div className="postsRightBottom">
            
            <hr />
              <h4 className="popularPostsHeader">POPULAR POSTS</h4>
            <hr />
          <ol className="popularPosts">
            {slicePopularPosts?.map((p)=>(
              <MiniPost key={p._id} post={p}/>
            ))}
            
          </ol>
          </div>
          </div>

        </div>
      </div>
    </div>
  )
}
