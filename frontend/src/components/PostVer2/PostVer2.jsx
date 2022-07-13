import './postVer2.css';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

export default function PostVer2({post}) {
  const [content,setContent] = useState("");
  const imgLink = "http://localhost:5000/images/";
  const {category, image, title, desc, createdAt, _id} = post;
  const date = new Date(createdAt);
  const year = date.getFullYear();
  let month = date.getMonth()+1;
  const day = date.getDate();

  useEffect(() => {
    if(desc) {
      setContent(desc.replace(/(<([^>]+)>)/ig,""));
  }
  }, [desc])
  return (
    
    <Link to={`/post/${_id}`} style={{textDecoration:"none", color:"inherit"}} className="postBox">
            <div className="postBoxLeft">
              <img src={image ? imgLink+image : imgLink+'post/nature3.jpg'} alt="" />
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
                {content}
              </p>

              <span className="postBoxRightDate">{year+'-'+(month>9?month:"0"+month)+'-'+(day<10 ? "0"+day : day)}</span>
            </div>
          </Link>
          
  )
}