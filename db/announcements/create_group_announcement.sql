INSERT INTO announcements(title, announcement_picture, announcement_url, group_id)
VALUES($1,$2,$3,$4)
returning *;