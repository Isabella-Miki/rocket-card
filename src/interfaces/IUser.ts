export default interface IUser{
    login: string;
    id: number;
    location: string | null;
    bio: string | null;
    followers: number;
    following: number;
    public_repos: number;
    avatar_url: string
    name: string | null;
    company: string | null;
}