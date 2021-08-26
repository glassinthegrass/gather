INSERT INTO users(first_name,last_name,email,username,hash,creation_date)
    VALUES ($1,$2,$3,$4,$5,$6)
    returning *;