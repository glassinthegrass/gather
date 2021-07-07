INSERT INTO deleted_posts(deleted_content,deleted_url,deleted_user_id,deleted_person_id,deleted_post_id)
VALUES($1,$2,$3,$4,$5)
returning *;