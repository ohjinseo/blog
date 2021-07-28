import './Home.css';
import wallpaper from '../../assets/images/post/nature.jpg'
import Post from '../../components/Post/Post';
import RightbarInfo from '../../components/RightbarInfo/RightbarInfo';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useState } from 'react';

export default function Home() {
  const [onInfo, setOnInfo] = useState(true);

  return (
    <div className="home">
      <div className="homeWrapper">
        <div className="homeTop">
          <img className="homeTopImg" src={wallpaper} />
          <div className="homeTopCard">
            <h4>WELCOME MY BLOG</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo alias, at beatae iusto illum harum velit odio unde perferendis, dolores consequuntur ipsa enim qui? Architecto sunt vero quibusdam officiis optio!</p>
          </div>
        </div>

        <div className="homeCenter">
          <div className="homeCenterLeft">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>

          <div className={onInfo ? "homeCenterRight" : "homeCenterRight hidden"}>
            <RightbarInfo />
          </div>
          <button onClick={(e)=>setOnInfo(!onInfo)} className="menuBoxButton">
            {onInfo ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon/>}
            <span>MY INFO</span>
          </button>
        </div>
      </div>

    </div>
  )
}
