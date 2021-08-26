SELECT po.post_id,po.creation_date,po.post_content,po.picture_version as post_picture_version, po.picture_public_id as post_picture_public_id,us.user_id,us.first_name,us.last_name,us.picture_version as user_picture_version, us.picture_public_id as user_picture_public_id FROM person_user_post pup
JOIN post po ON po.post_id = pup.post_id
JOIN users us ON pup.user_id = us.user_id
WHERE pup.person_id = $1;