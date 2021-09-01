INSERT INTO comment(comment_content,comment_url,creation_date)
VALUES($1,$2,$3)
returning *;