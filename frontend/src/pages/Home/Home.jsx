import './Home.css';
import wallpaper from '../../assets/images/post/nature.jpg'
import Post from '../../components/Post/Post';
import RightbarInfo from '../../components/RightbarInfo/RightbarInfo';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postAllGetAction } from '../../Redux/Actions/posts/postGetAction';

export default function Home() {
  const [onInfo, setOnInfo] = useState(true);
  const [sortPosts, setSortPosts] = useState([]);
  const {posts} = useSelector(state=>state.postGetReducer);
  const {userInfo} = useSelector(state=>state.userLoginReducer);
  const dispatch = useDispatch();
  let [popularPosts, setPopularPosts] = useState([]);
  const [slicePopularPosts, setSlicePopularPosts] = useState([]);

  useEffect(()=>{
    dispatch(postAllGetAction());
  }, [dispatch])

  useEffect(()=>{
    if(posts){
      window.scrollTo({top:0})
      const _posts = [...posts];
      setSortPosts(_posts.sort((p1, p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    }
  }, [posts])

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



  return (
    <div className="home">
      <div className="homeWrapper">
        <div className="homeTop">
          
          <img className="homeTopImg" src={wallpaper} />
          <div className="homeTopCard">
            <h4>WELCOME {userInfo?.name} !</h4>
            <p>They say that first impressions make a lasting impression and that how you greet someone can set the groundwork for your relationship. The same is true to blogging. How are you greeting your blog visitors? Are you friendly? Overwhelming? Trustworthy?</p>
          </div>
        </div>

        <div className="homeCenter">
          <div className={onInfo ? "homeCenterLeft" : "homeCenterLeft hidden"}>
            {sortPosts?.map((post)=>(
              <Post post={post}/>
            ))}

          </div>

          <div className={onInfo ? "homeCenterRight" : "homeCenterRight hidden"}>
            <div className="stickyWrapper">
            {slicePopularPosts && <RightbarInfo posts={slicePopularPosts}/>}
            <button onClick={(e)=>setOnInfo(!onInfo)} className="menuBoxButton">
            {onInfo ? <ArrowForwardIosIcon fontSize="large" className="arrowIcon home"/> : <ArrowBackIosIcon fontSize="large" className="arrowIcon right"/>}
          </button>
          </div>
          </div>
          
        </div>
      </div>

    </div>
  )
}
