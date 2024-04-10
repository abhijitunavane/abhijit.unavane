import { Photo, photosMock } from "../photography.mock";

export const photographyCategoryListMock: PhotographyCategory[] = [
    {
        id: 1,
        name: 'Category 1',
        photos: photosMock,
    },
    {
        id: 2,
        name: 'Category 2',
        photos: photosMock,
    },
]

export interface PhotographyCategory {
    id: number,
    name: string;
    photos: Photo[];
}
