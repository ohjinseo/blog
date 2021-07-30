import './postVer2.css';
import postImg from '../../assets/images/post/2.jpeg';

export default function PostVer2() {
  return (
    <div className="postBox">
            <div className="postBoxLeft">
              <img src={postImg} alt="" />
            </div>

            <div className="postBoxRight">
              <h4 className="postBoxRightHeader">
                DJKSTRA ALGORITHM
              </h4>
              <ul className="categoryItems">
                <li className="categoryItem">
                  Algorithm
                </li>
                <li className="categoryItem">
                  Study
                </li>
              </ul>

              <p className="postBoxRightContent">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint excepturi culpa ipsa velit esse animi id quis praesentium molestiae, nesciunt facere dolore, aliquam voluptate qui vero ipsum delectus repellat magnam.
              </p>

              <span className="postBoxRightDate">2021-03-23</span>
            </div>
          </div>
  )
}
