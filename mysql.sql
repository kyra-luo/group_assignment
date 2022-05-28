create database if not exists Project;

use Project;

create table if not exists Admin(
                      admin_id varchar(20),
                      admin_name varchar(25),
                      admin_PIN varchar(30),
                      admin_gender varchar(20)
);

INSERT into Admin value ('e1237h','Jason','123456789','Male');

create table if not exists User(
                     First_name varchar(25),
                     Last_nmae varchar(25),
                     User_id varchar(20),
                     User_name varchar(25),
                     User_PIN varchar(30)
);
INSERT into User value ('Kyra','Luo','K12345','KYRA','123456789');

