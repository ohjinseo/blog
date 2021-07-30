import './write.css'
import backgroundImg from '../../assets/images/post/nature2.jpg';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postRegisterAction } from '../../Redux/Actions/posts/postRegisterAction';
import { useHistory } from 'react-router-dom';

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const {_id} = useSelector(state => state.userLoginReducer.userInfo);
  const history = useHistory();
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(postRegisterAction(title, desc, category, _id));
    
    history.push('/posts');
    window.location.reload();
  }

  return (
    <div className="write">
      <div className="writeWrapper">
        <div className="writeTop">
          <img className="writeTopImg" src={backgroundImg} alt="" />
        </div>

        <form className="writeBottom" onSubmit={onSubmitHandler}>
          
          <div className="writeBottomCenter">
          <label htmlFor="fileIcon" className="fileIconBox">
            <AddIcon fontSize="large"  className="fileIcon" />
            <input type="file" id="fileIcon" style={{display:"none"}}/>
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

            <textarea required value={desc} onChange={e=>setDesc(e.target.value)} placeholder="What's your mind?" className="writeContent"></textarea>
          </div>
          <button type="submit" className="publishButton">PUBLISH</button>
        </form>
      </div>
    </div>
  )
}
