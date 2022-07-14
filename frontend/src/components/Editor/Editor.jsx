import React, {useState} from 'react'
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Editor = ({setDesc, desc, setImage, userId}) => {
    const [flag, setFlag] = useState(false);
    const imgLink = "http://localhost:5000/images"

    const customUploadAdapter = (loader) => {
        return {
            upload(){
                return new Promise ((resolve, reject) => {
                    const data = new FormData();
                     loader.file.then( (file) => {
                            data.append("name", file.name);
                            data.append("file", file);
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
