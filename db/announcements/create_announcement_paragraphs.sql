INSERT INTO paragraphs(announcement_id,paragraph_content)
VALUES($1,$2)
returning *;