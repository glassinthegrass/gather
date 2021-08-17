UPDATE groups
SET picture_url = $2,
picture_version = $3,
picture_public_id = $4
WHERE group_id = $1
returning *;