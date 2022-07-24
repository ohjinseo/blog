import React, {useState} from 'react'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import dotenv from "dotenv";
import {v4} from "uuid"
dotenv.config();

const Editor = ({setDesc, desc, setImage, userId}) => {
    const [flag, setFlag] = useState(false);
    const imgLink = "http://localhost:5000/images"

    const customUploadAdapter = (loader) => {
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                     loader.file.then( async (file) => {
                            const filename = v4();
                            const type = file.type.split("/")[1]

                            // AWS-React CORS : 서로 Resource를 공유할 수 있게끔 설정
                            const bodyData = {
                                "objectKey":`temp/${userId}/${filename}.${type}`,
                                "s3Action":"putObject",
                                "contentType":file.type
                            }
                            
                            const signedURL = await axios.post(process.env.REACT_APP_GET_SIGNEDURL, bodyData)
                            .then(body => {
                                return body.data});

                               await fetch(signedURL, {
                                   method:"PUT",
                                   body: file,
                                   headers:{
                                    'Content-Type':file.type,
                                    "Access-Control-Allow-Origin":"*",
                                    "Access-Control-Allow-Credentials":"true",
                                      
                                   }
                               });
                               
                               resolve({
                                default: `${process.env.REACT_APP_IMAGE_URL}/temp/${userId}/${filename}.${type}`
                                });
                            // axios.post(`/api/upload/${userId}`, data)
                            //     .then((res) => {
                            //         if(!flag){
                            //             setFlag(true);
                            //             setImage(res.data.filename);
                            //         }
                            //         resolve({
                            //             default: `${process.env.REACT_APP_IMAGE_URL}/temp/${userId}/${file.name}`
                            //         });
                            //     })
                            //     .catch((err)=>reject(err));
                                
                        })
                })
            }
        }
    }

    // 업로드 어댑터를 활성화하기 위해 
    function uploadPlugin (editor){
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
    }

    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
              
                extraPlugins: [uploadPlugin]
            }}
            data={desc ? desc : "<p>Hello World</p>"}
            onReady={editor => {
                // console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                setDesc(data);
                console.log(data);
            }}
            onBlur={(event, editor) => {
                // console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                // console.log('Focus.', editor);
            }}/>
    )
}

export default Editor
