import './rightbarinfo.css'
import person from '../../assets/images/post/v.jpg';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function RightbarInfo() {
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
        <span className="rightbarConnectHeader">RECENT POSTS</span>
        <hr />

        <ul className="rightbarRecentPosts">
          <li className="rightbarRecentPost">
            니가먼데
          </li>
          <li className="rightbarRecentPost">
            Djkstra Algorithmiawjdiajwdiajwd
          </li>
          <li className="rightbarRecentPost">
            Djkstra AlgorithmAZSdasd
          </li>
          <li className="rightbarRecentPost">
            Djkstra Algorithm
          </li>
          <li className="rightbarRecentPost">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, laudantium eos? Reiciendis reprehenderit dolore rem nostrum corrupti, adipisci perferendis ad sed eius officiis suscipit, labore aliquam ipsum quas deserunt quis?
          </li>
        </ul>

        <hr className="commentHr"/>
        <span className="rightbarConnectHeader comment">RECENT COMMENTS</span>
        <hr />

        <ul className="rightbarRecentComments">
          <li className="rightbarRecentComment">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam officiis ut architecto! Cum beatae aliquam porro enim numquam dolore, reprehenderit fuga deserunt cumque incidunt cupiditate laborum reiciendis iure vitae inventore?
          </li>
          <li className="rightbarRecentComment">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam officiis ut architecto! Cum beatae aliquam porro enim numquam dolore, reprehenderit fuga deserunt cumque incidunt cupiditate laborum reiciendis iure vitae inventore?
          </li>
          <li className="rightbarRecentComment">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam officiis ut architecto! Cum beatae aliquam porro enim numquam dolore, reprehenderit fuga deserunt cumque incidunt cupiditate laborum reiciendis iure vitae inventore?
          </li>
          <li className="rightbarRecentComment">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam officiis ut architecto! Cum beatae aliquam porro enim numquam dolore, reprehenderit fuga deserunt cumque incidunt cupiditate laborum reiciendis iure vitae inventore?
          </li>
          <li className="rightbarRecentComment">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam officiis ut architecto! Cum beatae aliquam porro enim numquam dolore, reprehenderit fuga deserunt cumque incidunt cupiditate laborum reiciendis iure vitae inventore?
          </li>
        </ul>
      </div>
    </div>
  )
}
