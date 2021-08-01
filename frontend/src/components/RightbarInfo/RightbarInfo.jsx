import './rightbarinfo.css'
import person from '../../assets/images/post/v.jpg';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';
import MiniPost from '../MiniPost/MiniPost';

export default function RightbarInfo({posts}) {
  return (
    <div className="rightbarinfo">
      <div className="rightbarinfoWrap">
        <img className="profilePicture" src={person} alt="" />
        <p className="rightbarDesc">Hello I'm Jinseo</p>

        <hr/>
        <span className="rightbarConnectHeader">CONNECT</span>
        <hr />

        <div className="rightbarConnectIcons">
          <GitHubIcon className="rightbarConnectIcon" />
          <FacebookIcon className="rightbarConnectIcon facebook" />
          <InstagramIcon className="rightbarConnectIcon insta" />
          <TwitterIcon className="rightbarConnectIcon" />
          <MailIcon className="rightbarConnectIcon" />
        </div>

        <hr/>
        <span className="rightbarConnectHeader">POPULAR POSTS</span>
        <hr />

        <ul className="rightbarRecentPosts">
          {posts.map((p)=>(
            <MiniPost post={p}/>
          ))}
          
        </ul>

      </div>
    </div>
  )
}
