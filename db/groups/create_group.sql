INSERT INTO groups(group_name,subject)
VALUES ($1,$2)
returning *;    