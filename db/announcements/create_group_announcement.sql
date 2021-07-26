INSERT INTO announcements(title)
VALUES($1)
returning *;