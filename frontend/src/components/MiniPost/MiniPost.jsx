import './miniPost.css'
import miniPost2 from '../../assets/images/post/nature9.jpg';

export default function MiniPost() {
  return (
    <div className="miniPost">
        <div className="miniPostLeft">
          <img className="miniPostImg" src={miniPost2} />
        </div>
              
        <div className="miniPostRight">
        <h4 className="miniPostHeader">DJKSTRA ALGORITHM</h4>
        <span className="miniPostDay">2021-02-01</span>
      </div>
    </div>
  )
}
