SELECT gp.group_id,gp.group_name,po.creation_date,po.post_id,po.post_content,po.picture_version as post_picture_version,po.picture_public_id as post_picture_public_id,us.user_id,us.first_name,us.last_name,us.picture_version as user_picture_version, us.picture_public_id as user_picture_public_id FROM group_post_user gpu
JOIN groups gp ON gp.group_id = gpu.group_id
JOIN post po ON po.post_id = gpu.post_id
JOIN users us ON gpu.user_id = us.user_id
WHERE gp.group_name = $1
ORDER BY gpu.post_id desc
LIMIT 10 OFFSET $2;