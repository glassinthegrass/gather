SELECT gau.announcement_id,gp.group_id,gp.group_name,gp.picture_version as group_picture_version, gp.picture_public_id as group_public_id,an.title,an.picture_version as announcement_picture_version,an.picture_public_id as announcement_public_id,us.user_id,us.first_name,us.last_name,us.picture_version as user_picture_version,us.picture_public_id as user_public_id FROM groups_announcements_users gau
JOIN groups gp ON gau.group_id=gp.group_id
JOIN announcements an ON gau.announcement_id=an.announcement_id
JOIN users us on gau.user_id= us.user_id
WHERE an.announcement_id =$1 AND an.published =true;