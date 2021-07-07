INSERT INTO post(post_content,post_url)
    VALUES ($1,$2)
    returning *;