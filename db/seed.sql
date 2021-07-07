DROP TABLE paragraphs;
DROP TABLE announcements;
DROP TABLE groups_users;
DROP TABLE groups_people;
DROP TABLE groups;
DROP TABLE person_user_post;
DROP TABLE post;
DROP TABLE person;
DROP TABLE users;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hash TEXT NOT NULL,
    admin BOOL DEFAULT false,
    phone_number INT,
    profile_picture VARCHAR(5000)
);

CREATE TABLE person(
    person_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birthday VARCHAR(15),
    picture TEXT,
    zipcode INT,
    message TEXT
);

CREATE TABLE post(
    post_id SERIAL PRIMARY KEY,
    post_content TEXT NOT NULL,
    post_url VARCHAR(5000),
    edited BOOL DEFAULT false
    );

CREATE TABLE person_user_post(
    person_user_post_id SERIAL PRIMARY KEY,
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES post(post_id),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    person_id INT,
    FOREIGN KEY (person_id) REFERENCES person(person_id)
);

CREATE TABLE groups(
group_id SERIAL PRIMARY KEY,
group_name VARCHAR(200),
);

CREATE TABLE groups_people(
    group_people_id SERIAL PRIMARY KEY,
    group_id INT,
    FOREIGN KEY(group_id) REFERENCES groups(group_id),
    person_id INT,
    FOREIGN KEY(person_id) REFERENCES person(person_id)
);

CREATE TABLE groups_users(
group_users_id SERIAL PRIMARY KEY,
group_id INT,
FOREIGN KEY(group_id) REFERENCES groups(group_id),
user_id INT,
FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE announcements(
    announcement_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    announcement_picture text,
    announcement_url text,
    group_id INT,
    FOREIGN KEY (group_id) REFERENCES groups(group_id)
);

CREATE TABLE paragraphs(
    paragraphs_id  SERIAL PRIMARY KEY,
    announcement_id INT,
    FOREIGN KEY(announcement_id) REFERENCES announcements(announcement_id),
    paragraph_content text
);

