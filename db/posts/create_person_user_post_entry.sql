INSERT INTO person_user_post(post_id,person_id,user_id)
VALUES ($1,$2,$3)
returning *;