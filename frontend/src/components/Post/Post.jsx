import './post.css'
import postImg from '../../assets/images/post/1.jpeg'

export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <img className="postTopImg" src={postImg} alt="" />  
        </div>
        <div className="postBottom">
          <ul className="postBottomCategory">
            <li>Algorithm</li>
            <li>STUDY</li>
          </ul>

          <h4 className="postBottomHeader">
            다익스트라 알고리즘
          </h4>

          <p className="postBottomContent">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque facilis, distinctio nihil officiis expedita minus et delectus, architecto praesentium libero possimus veritatis recusandae. Tempora corrupti rerum optio nemo modi eaque.
          </p>

          <span className="postBottomDate">
            2021.04.21
          </span>
        </div>

      </div>
      
    </div>
  )
}
