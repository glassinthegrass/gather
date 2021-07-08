SELECT * FROM groups gp
join groups_users gu ON gp.group_id = gu.group_id
where gu.user_id = $1;