import './posts.css'
import postImg from '../../assets/images/post/2.jpeg';
import Calendar from 'react-calendar'
import './Calendar.css';

import { useState } from 'react';
import MiniPost from '../../components/MiniPost/MiniPost';
import PostVer2 from '../../components/PostVer2/PostVer2';



export default function Posts() {
  const [value, onChange] = useState(new Date());


  return (
    <div className="posts"> 
      <div className="postsWrapper">
        <div className="postsLeft">
          <PostVer2 />
          <PostVer2 />
          <PostVer2 />
          <PostVer2 />
          <PostVer2 />
          <PostVer2 />
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
