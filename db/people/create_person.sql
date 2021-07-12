INSERT INTO person(first_name,last_name,birthday,picture,zipcode,message,creator)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    returning *;