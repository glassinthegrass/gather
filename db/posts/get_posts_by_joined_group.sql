SELECT gpu.group_id,gpu.post_id,gpu.user_id,gp.group_name,gp.picture_url as group_picture_url,gp.picture_version as group_picture_version,gp.picture_public_id as group_picture_public_id,po.post_content,po.picture_version as post_picture_version, po.picture_public_id as post_picture_public_id, po.creation_date,us.first_name,us.last_name,us.username,us.picture_version as user_picture_version,us.picture_public_id as user_picture_public_id FROM group_post_user gpu
join groups gp ON gp.group_id = gpu.group_id
join post po ON po.post_id= gpu.post_id
join users us ON us.user_id = gpu.user_id
join groups_users gu ON gu.group_id = gpu.group_id
where gu.user_id = $1;