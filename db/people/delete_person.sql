DELETE FROM person_user_post
where person_id = $1;
DELETE FROM groups_people
where person_id = $1;
DELETE FROM person
where person_id = $1;