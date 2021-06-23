export class User {
    private id?: number;
    
    public password?: string;

    public userName?: string;
    public screenName?: string;

    public birthDate?: string;
    public dateJoined?: string;

    public bio?: string;
    public website?: string;
    public quackCount?: number;
    // public profilePic: string;
    // public banner: string;

    constructor(obj: User) {
      Object.assign(this, obj);
    }
};