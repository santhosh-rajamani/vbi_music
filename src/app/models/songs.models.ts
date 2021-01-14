export interface song{
    id: number,
    albumId: number,
    name: string,
    singers: string[],
    albumName: string,
    playTime: number //Play time in seconds,
    thumbNail: string // In url
}


export interface songDetailFromAPI {
    albumId: number,
    id: number, 
    title: string,
    url: string,
    thumbnailUrl: string
}

export interface albumDetailFromAPI {
    userId: number,
    id: number,
    title: string
}