SELECT grp.group_id,grp.group_name,grp.picture_public_id as group_picture_public_id,grp.picture_version group_picture_version,grp.subject,pe.person_id,pe.first_name,pe.last_name,pe.birthday,pe.picture_version as person_picture_version,pe.picture_public_id as person_picture_public_id,pe.message  FROM groups_people gp
join groups_users gu on gu.group_id = gp.group_id
join groups grp on grp.group_id = gu.group_id
join person pe on pe.person_id = gp.person_id
WHERE birthday ILIKE '%' || $1 || '%' and gu.user_id = $2;