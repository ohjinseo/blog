import './write.css'
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect, useState, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { postRegisterAction } from '../../Redux/Actions/posts/postRegisterAction';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { postIdFromGetAction } from '../../Redux/Actions/posts/postGetAction';
import { postEditAction } from '../../Redux/Actions/posts/postEditAction';
import Editor from '../../components/Editor/Editor';
import axios from 'axios';

export default function Write() {
  const {postId} = useParams();
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");
  let title = useRef();
  const dispatch = useDispatch();
  let location = useLocation();

  // 수정 코드
  // useEffect(()=>{
  //   if(!postId){
  //     title.current.value="";
  //     setCategory("");
  //     desc.current.value="";
  //   }
  // }, [postId])

  useEffect(()=>{
    if(postId){
      dispatch(postIdFromGetAction(postId));
    }
  }, [postId])
  

  const {_id:userId} = useSelector(state => state.userLoginReducer.userInfo);
  const history = useHistory();
  const {postInfo} = useSelector(state=>state.postRegisterReducer);
  let {post} = useSelector(state=>state.postIdFromGetReducer);
  const {success} = useSelector(state=>state.postEditReducer);

  useEffect(() => {
    return async () => {
      console.log(userId);
      await axios.delete(process.env.REACT_APP_DELETE_S3_OBJECTS, {
        data:{
        userId
        }
      });
    }
  }, [])

  useEffect(()=>{
    if(post && postId){
      title.current.value=post.title;
      setCategory(post.category);
      setDesc(post.desc);

      console.log(desc);
    }
  }, [post])

  const moveS3Objects = async() => {
    await axios.put(process.env.REACT_APP_MOVE_S3_OBJECTS,{
      userId,
      "postId":postInfo._id
    })
  }

  useEffect(()=>{
      if(success){
        history.push(`/post/${post._id}`);
        window.location.reload();
      }

    if(postInfo){
      moveS3Objects();

      setTimeout(() => {
        history.push(`post/${postInfo._id}`);
      window.location.reload();
      }, 1000);

      
      }
      
  }, [postInfo, success]);
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const post = {
      title:title.current.value,
      desc:desc,
      category,
      _id:userId,
    }

    if(image && !postId){
      post.image = image;
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
            
            <Editor setDesc={setDesc} desc={desc} setImage={setImage} userId={userId}/>

          </div>
          <button type="submit" className="publishButton">PUBLISH</button>
        </form>
      </div>
    </div>
  )
}
