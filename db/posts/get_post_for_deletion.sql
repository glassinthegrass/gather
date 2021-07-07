SELECT pup.post_id,po.post_content,po.post_url,pup.user_id,pup.person_id FROM person_user_post pup
JOIN post po ON po.post_id = pup.post_id
WHERE po.post_id = $1;