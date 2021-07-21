UPDATE users
SET 
profile_picture_url=$2,
picture_public_id=$3,
picture_version = $4
WHERE user_id = $1;