DROP TABLE IF EXISTS deleted_posts;
DROP TABLE IF EXISTS paragraphs;
DROP TABLE IF EXISTS groups_announcements_users;
DROP TABLE IF EXISTS announcements;
DROP TABLE IF EXISTS group_post_user;
DROP TABLE IF EXISTS groups_people;
DROP TABLE IF EXISTS groups_users;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS person_user_post;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS friend_requests;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username varchar(20) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    hash TEXT NOT NULL,
    profile_picture_url VARCHAR(5000),
    picture_public_id varchar(1000),
    picture_version varchar(1000),
    phone_number INT,
    birthday varchar(11),
    zipcode INT,
    creation_date TEXT NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE friend_requests(
    friend_request_id SERIAL PRIMARY KEY,
    requesting_user_id INT,
    FOREIGN KEY(requesting_user_id)REFERENCES users(user_id),
    responding_user_id INT,
    FOREIGN KEY(responding_user_id)REFERENCES users(user_id),
    accepted BOOL DEFAULT false,
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE friendships(
    friendship_id SERIAL PRIMARY KEY,
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    friend_id INT,
    FOREIGN KEY(friend_id) REFERENCES users(user_id),
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE person(
    person_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birthday VARCHAR(15) NOT NULL,
    picture_url TEXT,
    zipcode INT,
    message TEXT,
    creator INT NOT NULL,
    FOREIGN KEY(creator) REFERENCES users(user_id),
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE post(
    post_id SERIAL PRIMARY KEY,
    post_content VARCHAR(1000),
    post_url VARCHAR(5000),
    picture_version TEXT,
    picture_public_id TEXT,
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
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
group_name VARCHAR(200) UNIQUE,
picture_url TEXT,
picture_public_id TEXT,
picture_version TEXT,
subject VARCHAR(100),
creation_date TEXT NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE groups_users(
group_users_id SERIAL PRIMARY KEY,
group_id INT,
FOREIGN KEY(group_id) REFERENCES groups(group_id),
user_id INT,
FOREIGN KEY(user_id) REFERENCES users(user_id),
admin BOOL DEFAULT false,
creation_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE groups_people(
    group_people_id SERIAL PRIMARY KEY,
    group_id INT,
    FOREIGN KEY(group_id) REFERENCES groups(group_id),
    person_id INT,
    FOREIGN KEY(person_id) REFERENCES person(person_id),
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE
);


CREATE TABLE group_post_user(
    group_post_user_id SERIAL PRIMARY KEY,
    group_id INT,
    FOREIGN KEY (group_id) REFERENCES groups(group_id),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);

CREATE TABLE announcements(
    announcement_id SERIAL PRIMARY KEY,
    title VARCHAR(125),
    picture_url text,
    picture_public_id text,
    picture_version text,
    published BOOL DEFAULT False,
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE groups_announcements_users(
    group_announcement_user_id SERIAL PRIMARY KEY,
    announcement_id INT,
    FOREIGN KEY (announcement_id) REFERENCES announcements(announcement_id),
    group_id INT,
    FOREIGN KEY (group_id) REFERENCES groups(group_id),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE paragraphs(
    paragraphs_id  SERIAL PRIMARY KEY,
    announcement_id INT,
    FOREIGN KEY(announcement_id) REFERENCES announcements(announcement_id),
    paragraph_content text,
    creation_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE deleted_posts(
deleted_id SERIAL PRIMARY KEY,
deleted_content text,
deleted_url text,
deleted_user_id int,
deleted_person_id int,
deleted_post_id int,
creation_date DATE NOT NULL DEFAULT CURRENT_DATE
);



INSERT INTO users(first_name,last_name,email,hash,username,picture_version,picture_public_id)
VALUES('Jared','Andersen','thejaredandersen@gmail.com','$2a$10$6RNlT6ljGRr5MZY1kDYHpe//jg0hoh.pMPFVpO1BNIYxdOkYXZu.2','glassinthegrass','v1628116031','TqXaFbYdVtbxOoi2LJQQDaEh_wif4vm'),
('Lisa','Andersen','lisa@gather.com','$2a$10$6RNlT6ljGRr5MZY1kDYHpe//jg0hoh.pMPFVpO1BNIYxdOkYXZu.2','leesuh311','v1628115370','Screen_Shot_2021-08-04_at_3.08.13_PM_cjr53v'),
('Craig','Merrill','craig@gather.com','$2a$10$6RNlT6ljGRr5MZY1kDYHpe//jg0hoh.pMPFVpO1BNIYxdOkYXZu.2','cragthemag','v1628115252','75643561_10102937721206884_8412432664627249152_n.jpg_fdylrx'),
('Aye','Myet','aye@gather.com','$2a$10$6RNlT6ljGRr5MZY1kDYHpe//jg0hoh.pMPFVpO1BNIYxdOkYXZu.2','ayeBayBay','v1628115375','Screen_Shot_2021-08-04_at_3.04.59_PM_ce2esk'),
('Christine','Andersen','christine@gather.com','$2a$10$6RNlT6ljGRr5MZY1kDYHpe//jg0hoh.pMPFVpO1BNIYxdOkYXZu.2','ChristineTheMachine','v1628115289','157615075_10103640438705384_2752476975868474944_n.jpg_ecaxva'),
('Candy','Lane','candy@gather.com','$2a$10$6RNlT6ljGRr5MZY1kDYHpe//jg0hoh.pMPFVpO1BNIYxdOkYXZu.2','_i_like_candy','v1628115365','Screen_Shot_2021-08-04_at_3.08.51_PM_rmjifa'),
('Sharlene','Hart','sharlene@gather.com','$2a$10$6RNlT6ljGRr5MZY1kDYHpe//jg0hoh.pMPFVpO1BNIYxdOkYXZu.2','sharshar_isa_harhar','v1628115359','Screen_Shot_2021-08-04_at_3.09.39_PM_st8r1n'),
('Bart','Simpson','bart@gather.com','$2a$10$6RNlT6ljGRr5MZY1kDYHpe//jg0hoh.pMPFVpO1BNIYxdOkYXZu.2','klondikeTempter','v1628115352','Screen_Shot_2021-08-04_at_3.10.43_PM_r3tzmk'),
('Brandon','Flowers','brandon@gather.com','$2a$10$6RNlT6ljGRr5MZY1kDYHpe//jg0hoh.pMPFVpO1BNIYxdOkYXZu.2','HumanSpacemanDancer','v1628115345','Screen_Shot_2021-08-04_at_3.11.37_PM_wbzhqh'),
('John','Mulaney','john@gather.com','$2a$10$6RNlT6ljGRr5MZY1kDYHpe//jg0hoh.pMPFVpO1BNIYxdOkYXZu.2','red','v1628115340','Screen_Shot_2021-08-04_at_3.12.20_PM_iseifj');

INSERT INTO friend_requests(requesting_user_id,responding_user_id,accepted)
VALUES(1,2,true),
(2,1,true),
(1,7,false),
(4,1,false),
(1,3,true),
(3,1,true),
(9,1,false),
(1,8,false),
(1,5,true),
(5,1,true);

INSERT INTO friendships(user_id,friend_id)
VALUES
(1,2),
(2,1),
(3,1),
(1,3),
(4,1),
(1,4),
(5,1),
(1,5),
(6,1),
(1,6),
(7,1),
(1,7),
(8,1),
(1,8),
(9,1),
(1,9),
(10,1),
(1,10);
 

INSERT INTO person(first_name,last_name,birthday,picture_url,zipcode,message,creator)
VALUES('Doug','Andersen','1974-05-26','https://live.staticflickr.com/65535/51131849486_3bdfac2296_w.jpg','92694','Big Bro One',1),
('Milagros','Andersen','1971-09-01','https://live.staticflickr.com/65535/51131174862_b6994e1e24_w.jpg','92694','Big sislaw one',1),
('Brooks','Watson','1970-09-21','https://live.staticflickr.com/65535/51132060193_509dfc89dc_w.jpg','99352',':)',1),
('Mindy','Watson','1975-08-20','https://live.staticflickr.com/65535/51131174812_b6097d5152_w.jpg','99352',':)',1),
('Jamal','Johnson','1976-11-16','https://live.staticflickr.com/65535/51132060113_0f397b972f_w.jpg','99352',':)',1),
('Noel','Johnson','1976-11-26','https://live.staticflickr.com/65535/51132624564_7219e06b2e_w.jpg','99352',':)',1),
('Penny','Walker','1979-03-05','https://live.staticflickr.com/65535/51132960890_70e92d2080_w.jpg','99301',':)',1),
('Benjamin','Walker','1978-01-01','https://live.staticflickr.com/65535/51132624514_144108c500_w.jpg','99301',':)',1),
('Tiffany','Wilcox','1982-02-26','https://live.staticflickr.com/65535/51132960795_868a612478_w.jpg','99352',':)',1),
('Ryan','Wilcox','1978-04-08','https://live.staticflickr.com/65535/51132960790_98035ee8ef_w.jpg','99352',':)',1),
('Brock','Andersen','1983-10-19','https://live.staticflickr.com/65535/51132960745_fdaff5c06c_w.jpg','99338',':)',1),
('Darina','Andersen','1986-09-04','https://live.staticflickr.com/65535/51131174532_78db8e9e53_w.jpg','99338',':)',1),
('Craig','Andersen','1986-08-27','https://live.staticflickr.com/65535/51131174477_b46f8f9bc7_w.jpg','84097','let me explain why youre wrong',1),
('Aye','Andersen','1989-07-16','https://live.staticflickr.com/65535/51132624304_bac3d85059_w.jpg','84097','kanpai',1),
('Jared','Andersen','1988-07-21','https://live.staticflickr.com/65535/51132960595_af8b779cf0_w.jpg','85224','I am cool',1),
('Merrill','Andersen','1947-12-11','https://live.staticflickr.com/65535/51131849496_d9687f73af_w.jpg','99336','Where do I click?',1),
('Lisa','Andersen','1990-03-11','https://live.staticflickr.com/65535/51132624254_00c40ea3d2_w.jpg','85224','I am cooler',1),
('Sharlene','Andersen','1949-12-12','https://live.staticflickr.com/65535/51132961085_e71b5f55dd_w.jpg','99336','I love this!',1);

INSERT INTO post(post_content,post_url)
VALUES('Wow, I can’t believe how fast you’re growing up. Happy Birthday Pippa!','https://www.kidscanfly.ca/wp-content/uploads/2020/08/happy-birthday.jpeg'),
('Happy Birthday sweet girl! Enjoy your day!','https://asset.holidaycardsapp.com/assets/card/b_day382-ac8d6e83877c20cd99b102561efc42ba.png'),
('Happy 7th Birthday Pippa! I just know 7 will be the best year yet!','https://i.pinimg.com/736x/ee/f0/36/eef036f583e91a438896a377716ea85e.jpg'),
('Hope this birthday and next year gives you plenty to smile about. Happy Birthday!','https://www.wishesgreeting.com/wp-content/uploads/2018/01/white_dog_happy_birthday_meme_dog1.jpg'),
('Happy Birthday sweet girl! Enjoy your day!','https://asset.holidaycardsapp.com/assets/card/b_day382-ac8d6e83877c20cd99b102561efc42ba.png'),
('Happy 7th Birthday Pippa! I just know 7 will be the best year yet!','https://i.pinimg.com/736x/ee/f0/36/eef036f583e91a438896a377716ea85e.jpg'),
('Happy Birthday sweet girl! Enjoy your day!','https://www.wishesgreeting.com/wp-content/uploads/2018/01/white_dog_happy_birthday_meme_dog1.jpg'),
('Happy 7th Birthday Pippa! I just know 7 will be the best year yet!',''),
('Hope this birthday and next year gives you plenty to smile about. Happy Birthday!',''),
('Happy Birthday sweet girl! Enjoy your day!','');

INSERT INTO person_user_post(person_id,post_id,user_id)
VALUES
(10,1,1),
(10,2,1),
(10,3,1),
(2,4,2),
(2,5,2),
(10,6,2),
(2,7,1),
(2,8,2),
(12,9,2),
(12,10,3);

INSERT INTO groups(group_name,picture_url,picture_public_id,picture_version,subject)
VALUES ('Mother_Hive','https://res.cloudinary.com/glassinthegrass/image/upload/v1627490255/BeeLogoFull_qw1jve.png','BeeLogoFull_qw1jve','v1627490255','Whats buzzing?'),
('Doug','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808371/orvd6cflzyudw7bmdy2h.jpg','orvd6cflzyudw7bmdy2h','v1626808371','The Oldest!'),
('Mindy','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808503/images_p2p3ay.png','images_p2p3ay','v1626808503','The Oldest Girl!'),
('Noel','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808517/images_dqvyqy.jpg','images_dqvyqy','v1626808517','Second Girl'),
('Penny','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808532/images_pcii3n.png','images_pcii3n','v1626808532','Third Girl'),
('Tiffany','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808555/images_pqgkqm.jpg','images_pqgkqm','v1626808555','Fourth Girl'),
('Brock','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808567/images_ahz9wy.jpg','images_ahz9wy','v1626808567','Second Girl'),
('Craig','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808577/images_ouha4t.jpg','images_ouha4t','v1626808577','Third Girl'),
('Jared','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808632/images_odxr2r.jpg','images_odxr2r','v1626808632','The Master'),
('Sharlene','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808622/images_pttbbz.jpg','images_pttbbz','v1626808622','Mommas group'),
('Kids','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808925/b33d7fef79ac8d9ef0ef3b3972f32d3a74776cad_full_f8rhmz.jpg','b33d7fef79ac8d9ef0ef3b3972f32d3a74776cad_full_f8rhmz','v1626808925','One of Us');
 

INSERT INTO groups_users(group_id,user_id,admin)
VALUES
(1,1,true),
(2,1,true),
(3,1,true),
(4,1,true),
(5,1,true),
(6,1,true),
(7,1,true),
(8,1,true),
(9,1,true),
(10,1,true),
(11,2,false),
(11,3,false),
(11,4,false),
(11,5,false),
(11,6,false),
(11,7,false),
(11,8,false),
(11,9,false),
(11,10,false),
(11,1,true),
(1,2,false),
(1,3,false),
(1,4,false),
(1,5,false),
(1,6,false),
(1,7,false),
(1,8,false),
(1,9,false),
(1,10,false);

 
INSERT INTO groups_people(group_id,person_id)
VALUES(1,1),
(1,2),
(2,3),
(2,4),
(3,5),
(3,6),
(4,7),
(4,8),
(5,9),
(5,10),
(6,11),
(6,12),
(7,13),
(7,14),
(8,15),
(8,16),
(9,17),
(9,18),
(10,1),
(10,3),
(10,5),
(10,7),
(10,9),
(10,11),
(10,13),
(10,15),
(10,17),
(10,18);

INSERT INTO announcements(title,picture_url,picture_public_id,picture_version,published)
VALUES('First Announcement Ever!','https://res.cloudinary.com/glassinthegrass/image/upload/v1627490255/BeeLogoFull_qw1jve.png','BeeLogoFull_qw1jve','v1627490255',true),
('I have nothing to tell you','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808371/orvd6cflzyudw7bmdy2h.jpg','orvd6cflzyudw7bmdy2h','v1626808371',true),
('the world is cool','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808503/images_p2p3ay.png','images_p2p3ay','v1626808503',true),
('BANANAS ARE TASTY','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808517/images_dqvyqy.jpg','images_dqvyqy','v1626808517',true),
('MY AGE IS SHOWING- justin bieber - whats up with that','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808532/images_pcii3n.png','images_pcii3n','v1626808532',true),
('my name is enigo montoya-','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808555/images_pqgkqm.jpg','images_pqgkqm','v1626808555',true),
('Are we Human? -Or- Are we Dancer?','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808567/images_ahz9wy.jpg','images_ahz9wy','v1626808567',true),
('Jenny Was A friend of Mine','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808577/images_ouha4t.jpg','images_ouha4t','v1626808577',true),
('Do you Hear what I hear','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808925/b33d7fef79ac8d9ef0ef3b3972f32d3a74776cad_full_f8rhmz.jpg','b33d7fef79ac8d9ef0ef3b3972f32d3a74776cad_full_f8rhmz','v1626808925',true),
('candy- why is it the best?','https://res.cloudinary.com/glassinthegrass/image/upload/v1626808622/images_pttbbz.jpg','images_pttbbz','v1626808622',true);

INSERT INTO groups_announcements_users(announcement_id,group_id,user_id)
VALUES
(1,1,1),
(2,1,1),
(3,1,1),
(4,1,1),
(5,1,1),
(6,1,1),
(7,9,1),
(8,9,1),
(9,11,1),
(10,11,1);


INSERT INTO paragraphs(announcement_id,paragraph_content)
VALUES
(1,'Cillum cupidatat sint cupidatat adipisicing in anim in et consequat nulla nisi nulla. Tempor consectetur nostrud enim irure culpa ut et ut fugiat fugiat officia. Laborum excepteur non nisi reprehenderit exercitation ea adipisicing consectetur occaecat non magna officia ullamco consequat. Dolor id ut exercitation sit culpa.'),
(1,'Est voluptate velit cillum veniam. Enim enim deserunt culpa nulla ullamco elit ullamco veniam quis aliqua consequat id enim officia. Qui anim irure pariatur velit tempor quis aliquip aute adipisicing deserunt incididunt. Esse irure esse qui non reprehenderit anim magna ex pariatur quis cillum magna. Ipsum fugiat veniam laborum amet aliqua pariatur dolore sit. Nostrud officia mollit aliqua commodo velit occaecat. Ad exercitation id aute id quis consequat nisi nostrud eiusmod.'),
(1,'Ex eu quis in nulla et. Ea amet aliquip duis ea ipsum aliqua. Adipisicing dolore velit culpa laborum velit veniam ad nostrud est. Ullamco enim sint aliqua aliquip aute exercitation id id. Qui adipisicing id dolor consequat consectetur exercitation ad labore eu amet tempor.'),
(2,'Exercitation reprehenderit laborum culpa excepteur ea consequat non. Enim ea aliquip proident sit eu reprehenderit Lorem Lorem proident commodo excepteur occaecat anim. Laborum tempor dolore non ullamco in cupidatat.'),
(3,'Qui est sint Lorem ipsum sit nisi culpa labore consectetur ipsum non minim dolor. Officia ullamco consequat sit aliqua ea excepteur exercitation dolore magna ad do id et fugiat. Sint aliquip sint esse non magna.'),
(3,'Laborum anim ex ea enim culpa. Ut sunt ut elit magna qui. Laboris dolor veniam veniam mollit enim labore pariatur sint. Est commodo deserunt nostrud cupidatat labore laboris esse ea. Nostrud eiusmod excepteur ut exercitation. Nostrud non ea ea in dolor non dolore eiusmod commodo anim fugiat ut sit. Ipsum ullamco eiusmod ea commodo incididunt.'),
(3,'Cupidatat dolore nulla reprehenderit qui reprehenderit eu reprehenderit irure laboris. Cillum laborum laboris pariatur ea enim ex excepteur aute excepteur ex exercitation ex ullamco est. Ut aliquip velit aute excepteur aliqua culpa anim ea ea ex commodo voluptate nostrud ipsum.'),
(3,'Sit dolore cupidatat ut nisi aliqua dolore ex sit qui veniam amet. Consequat occaecat tempor ullamco ex cillum incididunt commodo ullamco ipsum minim dolore. Eu dolore sunt veniam velit. Elit ex elit aliqua ex in sunt dolore qui sunt duis ea sunt. Elit deserunt elit ea laboris.'),
(4,'Tempor sint proident exercitation do est velit sit exercitation et. Veniam reprehenderit sit veniam ad velit aliqua elit aliqua irure laboris qui commodo ut in. Deserunt eiusmod velit cupidatat sit ad. Culpa ut sunt elit non magna consectetur consequat adipisicing aute anim.'),
(5,'Lorem eiusmod elit nisi incididunt cillum enim enim occaecat velit incididunt nisi in elit. Sint laborum mollit aute nostrud ullamco ad in dolor enim est exercitation. Deserunt adipisicing anim non excepteur consequat nulla in ut voluptate quis excepteur quis nisi laboris. Cillum et sunt voluptate adipisicing consequat nisi voluptate amet tempor exercitation. Ea ipsum est sint voluptate et labore duis magna dolore ullamco laborum. Velit qui aliquip nulla aute esse aliqua exercitation pariatur proident aute excepteur velit aute.'),
(6,'Ex eu quis in nulla et. Ea amet aliquip duis ea ipsum aliqua. Adipisicing dolore velit culpa laborum velit veniam ad nostrud est. Ullamco enim sint aliqua aliquip aute exercitation id id. Qui adipisicing id dolor consequat consectetur exercitation ad labore eu amet tempor.'),
(7,'Exercitation reprehenderit laborum culpa excepteur ea consequat non. Enim ea aliquip proident sit eu reprehenderit Lorem Lorem proident commodo excepteur occaecat anim. Laborum tempor dolore non ullamco in cupidatat.'),
(8,'Qui est sint Lorem ipsum sit nisi culpa labore consectetur ipsum non minim dolor. Officia ullamco consequat sit aliqua ea excepteur exercitation dolore magna ad do id et fugiat. Sint aliquip sint esse non magna.'),
(4,'Laborum anim ex ea enim culpa. Ut sunt ut elit magna qui. Laboris dolor veniam veniam mollit enim labore pariatur sint. Est commodo deserunt nostrud cupidatat labore laboris esse ea. Nostrud eiusmod excepteur ut exercitation. Nostrud non ea ea in dolor non dolore eiusmod commodo anim fugiat ut sit. Ipsum ullamco eiusmod ea commodo incididunt.'),
(6,'Cupidatat dolore nulla reprehenderit qui reprehenderit eu reprehenderit irure laboris. Cillum laborum laboris pariatur ea enim ex excepteur aute excepteur ex exercitation ex ullamco est. Ut aliquip velit aute excepteur aliqua culpa anim ea ea ex commodo voluptate nostrud ipsum.'),
(5,'Sit dolore cupidatat ut nisi aliqua dolore ex sit qui veniam amet. Consequat occaecat tempor ullamco ex cillum incididunt commodo ullamco ipsum minim dolore. Eu dolore sunt veniam velit. Elit ex elit aliqua ex in sunt dolore qui sunt duis ea sunt. Elit deserunt elit ea laboris.'),
(5,'Tempor sint proident exercitation do est velit sit exercitation et. Veniam reprehenderit sit veniam ad velit aliqua elit aliqua irure laboris qui commodo ut in. Deserunt eiusmod velit cupidatat sit ad. Culpa ut sunt elit non magna consectetur consequat adipisicing aute anim.'),
(7,'Lorem eiusmod elit nisi incididunt cillum enim enim occaecat velit incididunt nisi in elit. Sint laborum mollit aute nostrud ullamco ad in dolor enim est exercitation. Deserunt adipisicing anim non excepteur consequat nulla in ut voluptate quis excepteur quis nisi laboris. Cillum et sunt voluptate adipisicing consequat nisi voluptate amet tempor exercitation. Ea ipsum est sint voluptate et labore duis magna dolore ullamco laborum. Velit qui aliquip nulla aute esse aliqua exercitation pariatur proident aute excepteur velit aute.'),
(7,'Ex eu quis in nulla et. Ea amet aliquip duis ea ipsum aliqua. Adipisicing dolore velit culpa laborum velit veniam ad nostrud est. Ullamco enim sint aliqua aliquip aute exercitation id id. Qui adipisicing id dolor consequat consectetur exercitation ad labore eu amet tempor.'),
(7,'Exercitation reprehenderit laborum culpa excepteur ea consequat non. Enim ea aliquip proident sit eu reprehenderit Lorem Lorem proident commodo excepteur occaecat anim. Laborum tempor dolore non ullamco in cupidatat.'),
(10,'Qui est sint Lorem ipsum sit nisi culpa labore consectetur ipsum non minim dolor. Officia ullamco consequat sit aliqua ea excepteur exercitation dolore magna ad do id et fugiat. Sint aliquip sint esse non magna.'),
(9,'Laborum anim ex ea enim culpa. Ut sunt ut elit magna qui. Laboris dolor veniam veniam mollit enim labore pariatur sint. Est commodo deserunt nostrud cupidatat labore laboris esse ea. Nostrud eiusmod excepteur ut exercitation. Nostrud non ea ea in dolor non dolore eiusmod commodo anim fugiat ut sit. Ipsum ullamco eiusmod ea commodo incididunt.'),
(9,'Cupidatat dolore nulla reprehenderit qui reprehenderit eu reprehenderit irure laboris. Cillum laborum laboris pariatur ea enim ex excepteur aute excepteur ex exercitation ex ullamco est. Ut aliquip velit aute excepteur aliqua culpa anim ea ea ex commodo voluptate nostrud ipsum.'),
(2,'Sit dolore cupidatat ut nisi aliqua dolore ex sit qui veniam amet. Consequat occaecat tempor ullamco ex cillum incididunt commodo ullamco ipsum minim dolore. Eu dolore sunt veniam velit. Elit ex elit aliqua ex in sunt dolore qui sunt duis ea sunt. Elit deserunt elit ea laboris.'),
(8,'Tempor sint proident exercitation do est velit sit exercitation et. Veniam reprehenderit sit veniam ad velit aliqua elit aliqua irure laboris qui commodo ut in. Deserunt eiusmod velit cupidatat sit ad. Culpa ut sunt elit non magna consectetur consequat adipisicing aute anim.'),
(10,'Lorem eiusmod elit nisi incididunt cillum enim enim occaecat velit incididunt nisi in elit. Sint laborum mollit aute nostrud ullamco ad in dolor enim est exercitation. Deserunt adipisicing anim non excepteur consequat nulla in ut voluptate quis excepteur quis nisi laboris. Cillum et sunt voluptate adipisicing consequat nisi voluptate amet tempor exercitation. Ea ipsum est sint voluptate et labore duis magna dolore ullamco laborum. Velit qui aliquip nulla aute esse aliqua exercitation pariatur proident aute excepteur velit aute.'),
(10,'Et deserunt deserunt pariatur ipsum. Ad adipisicing exercitation consequat nulla sint. Voluptate cillum labore incididunt aliqua incididunt non ad ullamco duis incididunt esse. Dolor ad qui ut pariatur sint. Cupidatat aute sunt et veniam pariatur ea. Id qui aute proident duis adipisicing irure non pariatur pariatur cupidatat. Voluptate deserunt velit anim ad non.');