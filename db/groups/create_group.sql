INSERT INTO groups(group_name)
VALUES ($1)
returning *;