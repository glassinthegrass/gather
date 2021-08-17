DELETE FROM groups_users
where user_id = $1 and group_id = $2;