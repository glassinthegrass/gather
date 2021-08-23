UPDATE users
SET 
first_name =$1,
last_name =$2,
birthday=$3
WHERE user_id=$4;