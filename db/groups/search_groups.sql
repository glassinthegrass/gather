SELECT * FROM groups
WHERE group_name ILIKE '%' || $1 || '%';