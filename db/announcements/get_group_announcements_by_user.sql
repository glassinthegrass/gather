SELECT ann.announcement_id,ann.title,ann.announcement_picture,ann.announcement_url,grp.group_name FROM announcements ann
join groups grp ON grp.group_id = ann.group_id
join groups_users gpus ON gpus.group_id = grp.group_id
WHERE gpus.user_id = $1;