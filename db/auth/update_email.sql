UPDATE users
SET 
email=$2
WHERE email=$1
returning *;