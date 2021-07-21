SELECT fr.friendship_id as friendshipId,fr.friend_id as userId, us.first_name as friendFirstName,us.last_name as friendLastName,us.birthday as friendBirthday,us.email as friendEmail, us.phone_number as friendPhoneNumber,us.profile_picture_url as picture  FROM friendships fr
JOIN users us ON fr.friend_id =us.user_id
WHERE fr.user_id =$1
Limit 6;