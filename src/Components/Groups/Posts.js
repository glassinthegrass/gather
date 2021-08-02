import React from 'react';

const Posts =(props)=>{
const {post}=props
let url= `https://res.cloudinary.com/glassinthegrass/image/upload/w_50,h_50,r_max,c_fill,g_auto,f_auto/${post.picture_version}/${post.picture_public_id}`
let postPicture = post.post_url !== null ? <img src={post.post_url} alt='postPic'/>:<></>;

return<section>
<img src={url} alt='user'/>
<p>{`${post.first_name} ${post.last_name}`}</p>
{postPicture}
<p>{post.post_content}</p>
</section>
}
export default Posts