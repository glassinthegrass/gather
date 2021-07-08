DELETE FROM announcements
WHERE group_id = $1;

DELETE FROM groups_people
WHERE group_id = $1;

DELETE FROM groups_users
WHERE group_id = $1;

DELETE FROM groups
WHERE group_id = $1;