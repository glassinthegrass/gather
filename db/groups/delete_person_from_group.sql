DELETE FROM groups_people
where person_id = $1 and group_id = $2;