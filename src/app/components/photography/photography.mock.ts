export const photosMock: Photo[] = [
    {
        title: "Photo title",
        description: 'Photo description',
        imageUrl: 'http://localhost:4200/assets/react-movies-pedia.png',
        instagramUrl: 'https://www.instagram.com/caynayphoto/p/C4MZ84HBElu/',
        categoryId: 1
    },
    {
        title: "Photo title 2",
        description: 'Photo description 2',
        imageUrl: 'http://localhost:4200/assets/react-movies-pedia.png',
        instagramUrl: 'https://www.instagram.com/caynayphoto/p/C4MZ84HBElu/',
        categoryId: 2
    },
];

export interface Photo {
    title?: string;
    description?: string;
    imageUrl: string;
    instagramUrl?: string;
    categoryId?: number;
}
