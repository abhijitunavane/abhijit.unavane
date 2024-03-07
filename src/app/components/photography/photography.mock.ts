export const photosMock: Photo[] = [
    {
        title: "Photo title",
        description: 'Photo description',
        imageUrl: 'http://localhost:4200/assets/react-movies-pedia.png',
        instagramUrl: 'https://www.instagram.com/caynayphoto/p/C4MZ84HBElu/'
    },
    {
        title: "Photo title",
        description: 'Photo description',
        imageUrl: 'http://localhost:4200/assets/react-movies-pedia.png',
        instagramUrl: 'https://www.instagram.com/caynayphoto/p/C4MZ84HBElu/'
    },
];

export interface Photo {
    title: String;
    description: String;
    imageUrl: String;
    instagramUrl: String;
}
