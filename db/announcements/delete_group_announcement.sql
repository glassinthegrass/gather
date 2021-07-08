DELETE FROM paragraphs
where announcement_id =$1;

DELETE FROM announcements
where announcement_id = $1;