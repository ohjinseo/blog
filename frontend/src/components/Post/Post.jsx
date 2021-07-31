import './post.css'
import {format} from 'timeago.js';
import {Link} from 'react-router-dom'

export default function Post({post}) {
  const imgLink = "http://localhost:5000/images/";

  const {category, title, desc, createdAt, image, _id} = post;
  return (
    <Link to ={`post/${_id}`} style={{textDecoration:"none", color:"inherit"}} className="post">
      <div className="postWrapper">
        <div className="postTop">
          <img className="postTopImg" src={image ? (imgLink + image) : (imgLink + 'post/nature3.jpg')} alt="" />  
        </div>
        <div className="postBottom">
          <ul className="postBottomCategory">
            <li>{category}</li>
          </ul>

          <h4 className="postBottomHeader">
            {title}
          </h4>

          <p className="postBottomContent">
            {desc}
          </p>

          <span className="postBottomDate">
            {format(createdAt)}
          </span>
        </div>

      </div>
      
    </Link>
  )
}
