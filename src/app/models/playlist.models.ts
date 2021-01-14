import { song } from "./songs.models";

export interface playlist{
    id: number,
    name: string,
    createdAt: Date,
    songs: song[]
}