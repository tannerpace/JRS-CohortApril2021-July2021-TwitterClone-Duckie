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

