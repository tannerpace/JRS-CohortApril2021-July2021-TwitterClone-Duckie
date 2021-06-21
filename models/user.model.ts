export class User {
    id;
    userName;
    password;
    screenName;
    bio;
    website;
    birthDate;
    dateJoined;
    quackCount;
    profile;
    banner;

    constructor(obj: any) {
      Object.assign(this, obj);
    }  


};

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