create database if not exists project;

use project;

create table if not exists user
(
    username varchar(100),
    password varchar(100)
);

insert into user (username,password) value
('kyra',12345);