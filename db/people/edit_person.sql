UPDATE person
SET 
first_name = $2,
last_name = $3,
birthday = $4,
picture = $5,
zipcode=$6,
message=$7
WHERE person_id = $1
returning *;