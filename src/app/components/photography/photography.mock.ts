export const photosMock: Photo[] = [
    {
        title: "Photo title",
        description: 'Photo description',
        imageUrl: 'http://localhost:4200/assets/react-movies-pedia.png',
        instagramUrl: 'https://www.instagram.com/caynayphoto/p/C4MZ84HBElu/',
        categoryName: "Category 1",
        categoryDescription: 'Category description',
    },
    {
        title: "Photo title 2",
        description: 'Photo description 2',
        imageUrl: 'http://localhost:4200/assets/react-movies-pedia.png',
        instagramUrl: 'https://www.instagram.com/caynayphoto/p/C4MZ84HBElu/',
        categoryName: "Category 2",
        categoryDescription: 'Category description 2',
    },
];

export const photosWithCategoryMock: Photo[] = [
    {
        categoryName: "Category 1",
        categoryDescription: 'Category description 1',
        imageUrl: 'http://localhost:4200/assets/react-movies-pedia.png'
    },
    {
        categoryName: "Category 2",
        categoryDescription: 'Category description 2',
        imageUrl: 'http://localhost:4200/assets/react-movies-pedia.png'
    }
];

export interface Photo {
    title?: String;
    description?: String;
    imageUrl: String;
    instagramUrl?: String;
    categoryName?: String;
    categoryDescription?: String;
}
