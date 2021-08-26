SELECT gpu.group_id, gpu.post_id,gpu.user_id, gp.group_name, gp.picture_public_id as group_picture_public_id,gp.picture_version as group_picture_version, po.post_content, po.picture_public_id as post_picture_public_id, po.picture_version as post_picture_version,po.creation_date,us.first_name,us.last_name,us.username,us.picture_public_id as user_picture_public_id,us.picture_version as user_picture_version FROM group_post_user gpu
join groups gp ON gp.group_id = gpu.group_id
join post po ON po.post_id = gpu.post_id
join users us ON us.user_id = gpu.user_id
WHERE gpu.user_id =$1;