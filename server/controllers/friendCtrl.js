module.exports = {
  createFriendRequest: async (req, res) => {
    const db = req.app.get("db");
    const { requesting_user_id, responding_user_id } = req.params;
    try {
      const [checkForRequest] = await db.friends.get_friend_request(
        requesting_user_id,
        responding_user_id
      );
      if (checkForRequest?.friend_request_id) {
        return res
          .status(409)
          .send({ mesage: "you have already made this request!" });
      } else {
        const [friendRequest] = await db.friends.create_friend_request(
          requesting_user_id,
          responding_user_id
        );
        return res.status(200).send(friendRequest);
      }
    } catch (err) {
      console.log(err);
    }
  },
  acceptFriendRequest: async (req, res) => {
    const db = req.app.get("db");
    const { responding_user_id, requesting_user_id } = req.params;

    try {
      const [existingRequest] = await db.friends.get_friend_request(
        requesting_user_id,
        responding_user_id
      );

      const [existingResonse] = await db.friends.get_friend_request(
        responding_user_id,
        requesting_user_id
      );

      if (
        existingRequest?.friend_request_id &&
        existingResonse?.friend_request_id
      ) {
        return res.sendStatus(409);
      } else if (
        existingRequest?.friend_request_id &&
        !existingResonse?.friend_request_id
      ) {
        const accepted = true;
        await db.friends.accept_friend_request(
          responding_user_id,
          requesting_user_id,
          accepted
        );
        const [newFriendship] = await db.friends.get_friendship(
          responding_user_id,
          requesting_user_id
        );
        return res.status(200).send(newFriendship);
      }
    } catch (err) {
      console.log(err);
      return res.sendStatus(409);
    }
  },
  getFrienships: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.params;
    try {
      const friendships = await db.friends.get_friendships_by_user(user_id);
      if (!friendships[0]) {
        return res
          .status(404)
          .send({ message: "request some friends to build your hive!" });
      } else {
        return res.status(200).send(friendships);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
