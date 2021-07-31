UPDATE post
SET post_url = $2
WHERE post_id = $1
returning *;