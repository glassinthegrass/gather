SELECT * FROM users us
JOIN groups_users gu ON us.user_id = gu.user_id
WHERE gu.group_id = $1;