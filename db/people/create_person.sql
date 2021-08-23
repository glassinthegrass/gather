INSERT INTO person(first_name,last_name,birthday,message,creator)
    VALUES ($1,$2,$3,$4,$5)
    returning *;