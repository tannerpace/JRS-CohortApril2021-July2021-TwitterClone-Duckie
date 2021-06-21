drop schema if exists duckie;
drop schema if exists twitter;
CREATE SCHEMA `duckie` DEFAULT CHARACTER SET utf8 ;

-- make the users table (without 'pinnedQuack')
CREATE TABLE `duckie`.`users` (
    id int unique not null auto_increment,
    userName varchar(25) unique not null,
    password varchar(255) not null,
    screenName varchar(50) not null,
    bio varchar(255),
    website varchar(255),
    birthDate Date not null,
    dateJoined Datetime not null DEFAULT (current_date()),
    quackCount int not null default 0,
    -- profile pi img 
    -- banner img
    primary key (id)
);

-- make the 'quacks' table
CREATE TABLE `duckie`.`quacks` (
    id int unique not null auto_increment,
    body varchar(140) not null,
    userId int not null,
    dateAndTime datetime not null default now(),
    -- check if 'now()' is global time or system time
    repostCount int not null default 0,
    likeCount int not null default 0,
    replyTo int,
    -- img img,

    primary key (id),
    foreign key (userId) references users(id),
    foreign key (replyTo) references quacks(id)
);
    -- append the 'pinned quack' col to users
    -- pinnedQuack int -> foreign key in quack table
alter table duckie.users 
add pinnedQuack int;

alter table duckie.users
add foreign key (pinnedQuack) references quacks(id);

-- make the likes table 
CREATE TABLE `duckie`.`likes` (
    id int unique not null auto_increment,
    userId int not null,
    quackId int not null,

    primary key (id),
    foreign key (userId) references users(id),
    foreign key (quackId) references quacks(id)
);

-- make the RT table
CREATE TABLE `duckie`.`reposts` (
    id int unique not null auto_increment,
    userId int not null,
    quackId int not null,

    primary key (id),
    foreign key (userId) references users(id),
    foreign key (quackId) references quacks(id)
);

-- make the follows tabls
CREATE TABLE `duckie`.`follows` (
    id int unique not null auto_increment,
    followerId int not null,
    followingId int not null,

    primary key (id),
    foreign key (followerId) references users(id),
    foreign key (followingId) references users(id)
);

