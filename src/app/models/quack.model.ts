export class Quack {
    public id?: number;

    public userId?: number;
    public body?: string;

    constructor(obj: any) {
        Object.assign(this, obj);
    }
}