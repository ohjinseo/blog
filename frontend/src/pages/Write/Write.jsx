import './write.css'
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect, useState, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postRegisterAction } from '../../Redux/Actions/posts/postRegisterAction';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { postIdFromGetAction } from '../../Redux/Actions/posts/postGetAction';
import { postEditAction } from '../../Redux/Actions/posts/postEditAction';

export default function Write() {
  const {postId} = useParams();
  
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const imgLink = "http://localhost:5000/images/"
  let desc = useRef();
  let title = useRef();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!postId){
      title.current.value="";
      setCategory("");
      desc.current.value="";
    }
  }, [postId])

  useEffect(()=>{
    if(postId){
      dispatch(postIdFromGetAction(postId));
    }
  }, [postId])
  

  const {_id} = useSelector(state => state.userLoginReducer.userInfo);
  const history = useHistory();
  const {postInfo} = useSelector(state=>state.postRegisterReducer);
  let {post} = useSelector(state=>state.postIdFromGetReducer);
  const {success} = useSelector(state=>state.postEditReducer);

  useEffect(()=>{
    if(post && postId){
      title.current.value=post.title;
      setCategory(post.category);
      desc.current.value = post.desc;
    }
  }, [post])

  useEffect(()=>{
    if(success){
      history.push(`/post/${post._id}`);
      window.location.reload();
    }
    if(postInfo){
      history.push(`post/${postInfo._id}`);
      window.location.reload();
      }
      
  }, [postInfo, success]);

  useEffect(()=>{
    window.scrollTo({top:0, behavior:'smooth'})
  }, [image])
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const post = {
      title:title.current.value,
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

    if(!image && !postId){
      post.image = `post/nature${Math.floor((Math.random() * 8 + 2))}.jpg`
    }

    if(postId){
      post.postId = postId
      dispatch(postEditAction(post));
    }else{
      dispatch(postRegisterAction(post));
    }
    
  }

  return (
    <div className="write">
      <div className="writeWrapper">
        <div className="writeTop">
          {image && (<img className="writeTopImg" src={URL.createObjectURL(image)} alt="" />) ||postId &&  post?.image && (<img className="writeTopImg" src={imgLink + post.image} alt="" />)}
        </div>

        <form className="writeBottom" onSubmit={onSubmitHandler}>
          
          <div className="writeBottomCenter">
          <label htmlFor="fileIcon" className="fileIconBox">
            <AddIcon fontSize="large"  className="fileIcon" />
            <input onChange={e=>setImage(e.target.files[0])} type="file" id="fileIcon" style={{display:"none"}}/>
          </label>
            <input required ref={title} placeholder="Header" className="writeHeader" type="text" />

            <FormControl style={{position:'absolute'}} className="CategoryBox">
              <InputLabel htmlFor="grouped-native-select">CATEGORY</InputLabel>
              <Select onChange={e=>setCategory(e.target.value)} native defaultValue="" id="grouped-native-select">
                  <option  aria-label="None" value=""></option>
                  <option value="Life">Life</option>
                  <option value="Study">Study</option>
                  <option value="Algorithm">Algorithm</option>
                  <option value="BTS">BTS</option>
                  <option value="Piano">Piano</option>
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
