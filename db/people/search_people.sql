SELECT * FROM person
WHERE first_name ILIKE '%' || $1 || '%'
OR last_name ILIKE '%' || $1 || '%';
