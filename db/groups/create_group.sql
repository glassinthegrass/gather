INSERT INTO groups(group_name,subject,creation_date)
VALUES ($1,$2,$3)
returning *;    