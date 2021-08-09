UPDATE post
SET post_url = $2,
picture_version = $3,
picture_public_id = $4
WHERE post_id = $1
returning *;