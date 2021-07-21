SELECT * FROM person pe
JOIN groups_people gp ON pe.person_id = gp.person_id
WHERE gp.group_id = $1;