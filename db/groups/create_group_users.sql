INSERT INTO groups_users(group_id,user_id)
VALUES($1,$2)
returning *;