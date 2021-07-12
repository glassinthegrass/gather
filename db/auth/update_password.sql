UPDATE users
SET hash = $2
WHERE email =$1
returning *;