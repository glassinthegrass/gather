INSERT INTO person_user_post(person_id,user_id,post_id)
VALUES ($1,$2,$3)
returning *;