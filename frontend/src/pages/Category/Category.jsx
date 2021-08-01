import './category.css'
import backgroundImg from '../../assets/images/post/nature7.jpg'
import algorithm from '../../assets/images/post/algorithm.jpg'
import life from '../../assets/images/post/life.jpg'
import bts from '../../assets/images/post/bts.jpg'
import study from '../../assets/images/post/nature5.jpg'
import piano from '../../assets/images/post/piano.jpg'
import {Link} from 'react-router-dom'

export default function Category() {
  return (
    <div className="category">
      <div className="categoryTop">
      <img className="backgroundImg" src={backgroundImg} alt="" />
      <h4 className="categoryTopHeader">CATEGORY</h4>
      </div>
      <div className="categoryBottom">
      <div className="categoryWrapper">
        <Link to="/posts/Life" className="categoryBox">
          <div className="categoryBoxWrapper">
          <img src={life} alt="" />
          <h4 className="categoryHeader">Life</h4>
          </div>
        </Link>

        <Link to="/posts/Study" className="categoryBox">
          <div className="categoryBoxWrapper">
          <img src={study} alt="" />
          <h4 className="categoryHeader">Study</h4>
          </div>
        </Link>

        <Link to="/posts/Algorithm" className="categoryBox">
          <div className="categoryBoxWrapper">
          <img src={algorithm} alt="" />
          <h4 className="categoryHeader">Algorithm</h4>
          </div>
        </Link>

        <Link to="/posts/BTS" className="categoryBox">
          <div className="categoryBoxWrapper">
          <img src={bts} alt="" />
          <h4 className="categoryHeader">BTS</h4>
          </div>
        </Link>

        <Link to="/posts/Piano" className="categoryBox">
          <div className="categoryBoxWrapper">
          <img src={piano} alt="" />
          <h4 className="categoryHeader">Piano</h4>
          </div>
        </Link>

      </div>
      </div>
    </div>
  )
}
