export class Quack {
    public id?: number;
    public userId?: number;
    public dateAndTime?: Date;
    public repostCount?:number;
    public likeCount?:number;
    public replyTo?:number;
    public body?: string;

    constructor(obj: any) {
        Object.assign(this, obj);
    }
}