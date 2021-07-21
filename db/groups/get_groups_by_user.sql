SELECT gp.creator as creator_user_id,gp.group_id,gp.group_name,gp.creation_date FROM groups gp
join groups_users gpu ON gp.group_id = gpu.group_id
where gpu.user_id = $1;