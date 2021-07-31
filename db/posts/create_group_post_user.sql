INSERT INTO group_post_user(group_id,post_id,user_id)
VALUES ($1,$2,$3)
returning *;