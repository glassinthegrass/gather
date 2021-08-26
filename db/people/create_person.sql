INSERT INTO person(first_name,last_name,birthday,message,creator,creation_date)
    VALUES ($1,$2,$3,$4,$5,$6)
    returning *;