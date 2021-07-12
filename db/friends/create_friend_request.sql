INSERT INTO friend_requests(requesting_user_id,responding_user_id)
VALUES($1,$2)
returning *;