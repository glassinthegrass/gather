INSERT INTO users(first_name,last_name,email,username,hash)
    VALUES ($1,$2,$3,$4,$5)
    returning *;