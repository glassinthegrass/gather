INSERT INTO groups_people(group_id,person_id)
VALUES($1,$2)
returning *;