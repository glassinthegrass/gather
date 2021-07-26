DELETE FROM groups_announcements_users
WHERE group_id = $1;

DELETE FROM group_post_user
WHERE group_id = $1;

DELETE FROM groups_users
WHERE group_id = $1;

DELETE FROM groups_people
WHERE group_id = $1;

DELETE FROM groups
WHERE group_id = $1;