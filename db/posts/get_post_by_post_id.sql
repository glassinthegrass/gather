SELECT po.post_id,po.post_content,po.post_url,us.user_id,us.first_name,us.last_name,us.picture_version, us.picture_public_id FROM group_post_user gpu
JOIN post po ON po.post_id = gpu.post_id
JOIN users us ON gpu.user_id = us.user_id
WHERE po.post_id = $1;