export class Quack {
    public id?: number;
    public userId?: number;
    public screenName?: string;
    public userName?: string;
    public profilePic?: string;

    public body?: string;

    public dateAndTime?: Date;
    public repostCount?: number;
    public likeCount?: number;
    public replyTo?: number;


    constructor(obj: any) {
        Object.assign(this, obj);
    }
}