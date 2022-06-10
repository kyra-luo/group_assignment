create database if not exists Project;

use Project;

create table if not exists Admin(
                      admin_id varchar(255),
                      admin_name varchar(25),
                      admin_PIN varchar(30),
                      admin_gender varchar(20)
);

INSERT into Admin value ('e1237h','Jason','123456789','Male');

create table if not exists User(
                     First_name varchar(25),
                     Last_name varchar(25),
                     User_id varchar(255),
                     User_name varchar(25) primary key,
                     User_PIN varchar(30),
                     email_address varchar(30),
                     User_Gender varchar(30)
);
INSERT into User value ('Kyra','Luo','K12345','KYRA','123456789','123456@gmail.com','Female');
INSERT into User(First_name, Last_name, User_id, User_name, User_PIN, email_address, User_Gender) VALUES('1','1',UUID(),'1','1','1','1');
drop table User;

drop schema Project ;
delete from User where User_name='U';
