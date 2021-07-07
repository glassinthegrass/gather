INSERT INTO groups(group_name,creator)
VALUES ($1,$2)
returning *;