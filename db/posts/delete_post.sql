DELETE FROM person_user_post
where post_id = $1;

DELETE FROM post
where post_id = $1;