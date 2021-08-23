UPDATE person
SET picture_url = $2,
picture_public_id= $3,
picture_version= $4
WHERE person_id =$1
returning *;