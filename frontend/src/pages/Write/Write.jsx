import './write.css'
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect, useState, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postRegisterAction } from '../../Redux/Actions/posts/postRegisterAction';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Write() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const desc = useRef();

  const dispatch = useDispatch();
  const {_id} = useSelector(state => state.userLoginReducer.userInfo);
  const history = useHistory();
  const {postInfo} = useSelector(state=>state.postRegisterReducer);

  useEffect(()=>{
    if(postInfo){
      history.push('/posts');
      window.location.reload();
      }
  }, [postInfo]);

  useEffect(()=>{
    window.scrollTo({top:0, behavior:'smooth'})
  }, [image])
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc:desc.current.value,
      category,
      _id,
    }
    if(image){
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      post.image = filename;
      console.log('asd')

      try {
        await axios.post('/api/upload', data);
      } catch (error) {
      }
    }
    dispatch(postRegisterAction(post));
    
  }

  return (
    <div className="write">
      <div className="writeWrapper">
        <div className="writeTop">
          {image && (<img className="writeTopImg" src={URL.createObjectURL(image)} alt="" />)}
        </div>

        <form className="writeBottom" onSubmit={onSubmitHandler}>
          
          <div className="writeBottomCenter">
          <label htmlFor="fileIcon" className="fileIconBox">
            <AddIcon fontSize="large"  className="fileIcon" />
            <input onChange={e=>setImage(e.target.files[0])} type="file" id="fileIcon" style={{display:"none"}}/>
          </label>
            <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Header" className="writeHeader" type="text" />

            <FormControl style={{position:'absolute'}} className="CategoryBox">
              <InputLabel htmlFor="grouped-native-select">CATEGORY</InputLabel>
              <Select onChange={e=>setCategory(e.target.value)} native defaultValue="" id="grouped-native-select">
                  <option  aria-label="None" value=""></option>
                  <option value="Algorithm">Algorithm</option>
                  <option value="Life">Life</option>
              </Select>
            </FormControl>

            <textarea required ref={desc}  placeholder="What's your mind?" className="writeContent"></textarea>
          </div>
          <button type="submit" className="publishButton">PUBLISH</button>
        </form>
      </div>
    </div>
  )
}
