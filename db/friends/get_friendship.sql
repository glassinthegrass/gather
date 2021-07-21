SELECT fr.user_id, fr.friend_id,us.first_name,us.last_name,us.profile_picture_url from friendships fr
JOIN  users us on fr.friend_id = us.user_id
WHERE fr.user_id = $1 AND fr.friend_id = $2;