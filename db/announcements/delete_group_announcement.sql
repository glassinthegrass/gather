DELETE FROM paragraphs
where announcement_id =$1;

DELETE FROM groups_announcements_users
WHERE announcement_id=$1;

DELETE FROM announcements
where announcement_id = $1;