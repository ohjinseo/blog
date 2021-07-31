import './posts.css'
import Calendar from 'react-calendar'
import './Calendar.css';
import { useEffect, useState } from 'react';
import MiniPost from '../../components/MiniPost/MiniPost';
import PostVer2 from '../../components/PostVer2/PostVer2';
import { useDispatch, useSelector } from 'react-redux';
import { postAllGetAction } from '../../Redux/Actions/posts/postGetAction';
import CircularProgress from '@material-ui/core/CircularProgress';



export default function Posts() {
  const [value, onChange] = useState(new Date());
  console.log(value);
  const [sortPosts, setSortPosts] = useState([]);
  const dispatch = useDispatch();
  const {loading, posts} = useSelector(state=>state.postGetReducer);

  useEffect(()=>{
    window.scrollTo({top:0})
    if(posts){
      setSortPosts(posts.sort((p1, p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    }
  }, [posts])


  useEffect(()=>{
    dispatch(postAllGetAction());
    
    
  }, [dispatch]);

  return (
    <div className="posts"> 
      <div className="postsWrapper">
      <div className="postsLeft">
        {loading ? <CircularProgress size="50px" style={{color:"gray", position:"relative", 
      top:"20%"}}/> : sortPosts?.map((post) => <PostVer2 post={post}/>)}
          
        
        </div>

        <div className="postsRight">
          <div className="postsRightWrapper">
          <div className="postsRightTop">
            <div className="calenderBox">
            <hr />
            <h4 className="calenderHeader">SELECT DAY</h4>
            <hr />
          <Calendar
          className="Calender"
          onChange={onChange}
          value={value}
        />
        </div>
          </div>
          <div className="postsRightBottom">
            
            <hr />
              <h4 className="popularPostsHeader">POPULAR POSTS</h4>
            <hr />
          <ol className="popularPosts">
            <MiniPost />
            <MiniPost />
            <MiniPost />
          </ol>
          </div>
          </div>

        </div>
      </div>
    </div>
  )
}
