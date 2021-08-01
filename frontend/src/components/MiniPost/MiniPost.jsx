import './miniPost.css'
import {Link} from 'react-router-dom'
export default function MiniPost({post}) {
  const imgLink = "http://localhost:5000/images/";
  
  const {title, createdAt, image} = post;
  const date = new Date(createdAt);
  const year = date.getFullYear();
  let month = date.getMonth()+1;
  const day = date.getDate();

  return (
    <Link to={`/post/${post._id}`} style={{textDecoration:"none", color:"inherit"}} className="miniPost">
        <div className="miniPostLeft">
          <img className="miniPostImg" src={imgLink + image} />
        </div>
              
        <div className="miniPostRight">
        <h4 className="miniPostHeader">{title}</h4>
        <span className="miniPostDay">{year+'-'+(month>9?month:"0"+month)+'-'+(day<10 ? "0"+day : day)}</span>
      </div>
    </Link>
  )
}
