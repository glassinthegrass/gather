SELECT * FROM comment_post_user cpu
join comment co ON co.comment_id=cpu.comment_id
join users us ON us.user_id = cpu.user_id
WHERE cpu.comment_id = $1;