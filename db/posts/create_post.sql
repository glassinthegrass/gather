INSERT INTO post(post_content,post_url,creation_date)
VALUES ($1,$2,$3)
    returning *;