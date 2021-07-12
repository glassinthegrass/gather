UPDATE friend_requests
set accepted = $3
where requesting_user_id = $2 AND responding_user_id = $1;

INSERT INTO friend_requests(requesting_user_id,responding_user_id,accepted)
VALUES ($1,$2,$3);

INSERT INTO friendships(user_id,friend_id)
VALUES ($2,$1);

INSERT INTO friendships(user_id,friend_id)
VALUES ($1,$2);


