SELECT gp.group_id,gp.group_name,gp.picture_url,gp.picture_version,gp.picture_public_id,gp.creation_date FROM groups gp
join groups_people gpu ON gp.group_id = gpu.group_id
where gpu.person_id = $1;