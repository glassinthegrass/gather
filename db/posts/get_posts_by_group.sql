SELECT gp.group_id,gp.group_name,po.post_id,po.post_content,po.post_url,us.user_id,us.first_name,us.last_name,us.picture_version, us.picture_public_id FROM group_post_user gpu
JOIN groups gp ON gp.group_id = gpu.group_id
JOIN post po ON po.post_id = gpu.post_id
JOIN users us ON gpu.user_id = us.user_id
WHERE gp.group_id = $1;