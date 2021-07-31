import './postVer2.css';
import moment from 'moment'
import { Link } from 'react-router-dom';
import {format} from 'timeago.js';

export default function PostVer2({post}) {
  const imgLink = "http://localhost:5000/images/";
  
  const {category, image, title, desc, createdAt, _id} = post;
  const date = new Date(createdAt);
  const year = date.getFullYear();
  let month = date.getMonth()+1;
  const day = date.getDate();
  return (
    
    <Link to={`post/${_id}`} style={{textDecoration:"none", color:"inherit"}} className="postBox">
            <div className="postBoxLeft">
              <img src={imgLink+image} alt="" />
            </div>

            <div className="postBoxRight">
              <h4 className="postBoxRightHeader">
                {title}
              </h4>
              <ul className="categoryItems">
                <li className="categoryItem">
                  {category}
                </li>
              </ul>

              <p className="postBoxRightContent">
                {desc}
              </p>

              <span className="postBoxRightDate">{year+'-'+(month>9?month:"0"+month)+'-'+day}</span>
            </div>
          </Link>
          
  )
}
