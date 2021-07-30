import './postContent.css'
import postImg from '../../assets/images/post/nature10.jpg'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import userImage from '../../assets/images/person/noavatar.png'
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';
import nextPost1 from '../../assets/images/post/nature8.jpg'
import nextPost2 from '../../assets/images/post/nature9.jpg'
import nextPost3 from '../../assets/images/post/nature10.jpg'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useState } from 'react';


export default function PostContent() {
  const [onMenu, setOnMenu] = useState(true);
  return (
    <div className="postContent">
      <div className={onMenu ? "postContentLeft" : "hidden postContentLeft"}>
        <div className="postContentLeftWrap">
        <div className="postContentTop">
          <img src={postImg} alt="" />
        </div>

        <div className="postContentBottom">
          <div className="postContentBottomTop">

            <h4 className="postContentBottomHeader">DJKSTRA ALGORITHM</h4>
            <ul className="categories">
              <li className="category">Algorithm</li>
              <li className="category">Study</li>
            </ul>
            <div className="userInfo">
              <img src={userImage} alt="" />
              <span className="userName">Oh jin seo</span>
            </div>
            <div className="postIcons">
            <EditIcon className="editIcon" fontSize="large"/>
            <DeleteIcon className="deleteIcon" fontSize="large"/>

            </div>
            <span className="postDay">2021-01-23</span>
          </div>

          <div className="postContentBottomCenter">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum corporis debitis voluptatem dolore voluptates saepe rem atque quisquam doloribus repellat ipsa ipsum explicabo adipisci libero earum, velit sed mollitia! Aperiam. 
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, dolore culpa, neque eveniet nisi ratione ipsa animi sapiente distinctio officia cumque esse magnam at, sequi officiis ea dolorum quam soluta! Lorem ipsum, dolor sit am
              et consectetur adipisicing elit. Officia consequatur repellendus similique quaerat eligendi aperiam doloribus mollitia, at sed, fugiat tempore cum cumque nulla quia velit dolorum nisi inventore rerum. 
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate a molestiae, reiciendis rem perspiciatis laborum delectus eius nam sequi similique pariatur magni ullam vero fuga harum vitae, quia obcaecati aut
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, aliquam laborum? Tenetur consequatur illo, distinctio cum dicta quos aut minus. Tenetur amet labore nesciunt sit asperiores deleniti doloremque tempore totam!
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quas consequuntur nemo officia temporibus dicta illo tempore esse unde iure sed suscipit in perspiciatis accusamus tenetur, placeat, necessitatibus delectus natus.
              <br/>
              <br/>
              <br/>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique velit, iste quod doloremque, ad deserunt dolorum ea tempora assumenda quisquam laboriosam placeat repellat corporis modi soluta ipsa eaque est asperiores!
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora saepe blanditiis praesentium suscipit animi velit vitae aliquam maxime, illum numquam quo consequuntur assumenda molestias expedita nulla, quas soluta at. Debitis!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa aliquid perspiciatis illum corporis quasi dolore, tempora adipisci ut delectus cupiditate dignissimos ad fuga labore laboriosam dolores voluptas, harum mollitia beatae.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In quos quis, soluta nam sit doloribus repellat perspiciatis illo iusto, ullam quo, amet ducimus quae tenetur? Similique, eius neque! Ea, ipsum?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ipsam iusto, fugit veritatis aliquid nisi, minima totam commodi ab, deserunt nesciunt est deleniti pariatur voluptatibus delectus repellendus sint molestias cumque?

            </p>
          </div>
          
        </div>
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
            <hr className="hr__1" />
            <div className="nextPost">
              <div className="nextPostLeft">
                  <img className="nextPostImg" src={nextPost1} />
              </div>
              
              <div className="nextPostRight">
                <h4 className="nextPostHeader">A Winter Morning</h4>
                <span className="nextPostDay">2021-02-01</span>
              </div>
            </div>

            <hr className="hr__1"/>
            
            <div className="nextPost">
              <div className="nextPostLeft">
                  <img className="nextPostImg" src={nextPost2} />
              </div>
              
              <div className="nextPostRight">
                <h4 className="nextPostHeader">DJKSTRA ALGORITHM</h4>
                <span className="nextPostDay">2021-02-01</span>
              </div>
            </div>

            <hr className="hr__1"/>

            <div className="nextPost">
              <div className="nextPostLeft">
                  <img className="nextPostImg" src={nextPost3} />
              </div>
              
              <div className="nextPostRight">
                <h4 className="nextPostHeader">DJKSTRA ALGORITHM</h4>
                <span className="nextPostDay">2021-02-01</span>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  )
}
