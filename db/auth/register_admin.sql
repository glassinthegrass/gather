INSERT INTO users(first_name,last_name,email,hash,admin)
    VALUES ($1,$2,$3,$4,$5)
    returning *;