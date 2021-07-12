SELECT * from friend_requests
WHERE requesting_user_id = $1 AND responding_user_id = $2;