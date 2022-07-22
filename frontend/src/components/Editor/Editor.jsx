import React, {useState} from 'react'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import dotenv from "dotenv";
dotenv.config();

const Editor = ({setDesc, desc, setImage, userId}) => {
    const [flag, setFlag] = useState(false);
    const imgLink = "http://localhost:5000/images"

    const customUploadAdapter = (loader) => {
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                    const data = new FormData();
                     loader.file.then( async (file) => {
                            data.append("name", file.name);
                            data.append("file", file);

                            

                            // AWS-React CORS : 서로 Resource를 공유할 수 있게끔 설정
                            const bodyData = {
                                "objectKey":file.name,
                                "s3Action":"putObject",
                                "contentType":file.type
                            }
                            const signedURL = await axios.post(process.env.REACT_APP_GET_SIGNEDURL, bodyData)
                            .then(body => {
                                console.log(body);
                                return body.data});

                               console.log(file);

                               await fetch(signedURL, {
                                   method:"PUT",
                                   body: file,
                                   headers:{
                                       'Content-Type':file.type,
                                   }
                               })
                            // axios는 form-data로만 패킷되고, S3에 이미지 대신 JSON파일이 업로드됨
                            // await axios({
                            //     method:"put",
                            //     url: signedURL,
                            //     data,
                            //     headers:{
                            //         'Content-Type':file.type
                            //     }
                            // });
                            axios.post(`/api/upload/${userId}`, data)
                                .then((res) => {
                                    if(!flag){
                                        setFlag(true);
                                        setImage(res.data.filename);
                                    }
                                    resolve({
                                        default: `${imgLink}/temp/${userId}/${res.data.filename}`
                                    });
                                })
                                .catch((err)=>reject(err));
                                
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
