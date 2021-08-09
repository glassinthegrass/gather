SELECT grp.group_id, grp.group_name,grp.picture_version as group_picture_version,grp.picture_public_id as group_picture_public_id, ann.announcement_id,ann.title, ann.picture_version as announcement_picture_version,ann.picture_public_id as announcement_picture_public_id FROM groups_announcements_users gau
join announcements ann ON ann.announcement_id = gau.announcement_id
join groups_users gu ON gau.group_id = gu.group_id
join groups grp ON grp.group_id = gau.group_id
join users us ON gu.user_id = us.user_id
WHERE gu.user_id =$1 AND published = true;