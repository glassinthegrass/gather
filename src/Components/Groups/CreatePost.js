import axios from 'axios';
import React, { useState } from 'react';

const CreatePost =(props)=>{
console.log(props)
const [image,setImage]=useState([])
const [postContent,setPostContent]=useState('')
const [response,setResponse]=useState('')

const handleImage=(img)=>{
setImage(img[0])
}
const handlePostContent=(e)=>{
setPostContent(e)
}
const handleSubmit = ()=>{
    let fileData = new FormData();
    fileData.append('image',image);
    let config={
        header:{
            "Content-Type": "multipart/form-data",
        }
    }
    axios.post(`/api/groupPosts/${props.group.group_id}/user/${props.user.user_id}?post_content=${postContent}`,fileData,config).then(res=>setResponse(res.data)).catch(err=>console.log(err))
}
return (<section>
<textarea onChange={(e)=>handlePostContent(e.target.value)}></textarea>
{console.log(image)}
{console.log(postContent)}
{console.log(response)}
        <div >
      <label htmlFor="single">{">"}</label>
      <input
        type="file"
        id="single"
        onChange={(e)=>handleImage(e.target.files)}
      />
<button onClick={()=>handleSubmit()}>asdf</button>
    </div>
</section>)
}
export default CreatePost