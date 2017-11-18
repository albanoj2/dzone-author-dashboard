export class Likes {

    private canLike: boolean;
    private liked: boolean;
    private score: number;

    public static createLikes(json: any): Likes {
        let like = new Likes();
        like.canLike = <boolean> json.canLike;
        like.liked = <boolean> json.liked;
        like.score = json.score;
        return like;
    }

    public get count() {
        return this.score;
    }
}