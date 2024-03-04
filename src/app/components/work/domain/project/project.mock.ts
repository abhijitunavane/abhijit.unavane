import { Link } from "../../../../utils/link";

export const projectMock: Project[] = [
    {
        id: 'sample',
        name: "Sample Project",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!",
        headerImageUrl: 'http://localhost:4200/assets/react-movies-pedia.png',
        nextProjectLink: {
            label: 'Sample 2',
            route: "/work/android/sample2"
        },
        featureImageUrls: [],
        githubUrl: 'https://github.com/abhijitunavane/React-Movies-App',
        isLiked: true
    },
    {
        id: 'sample2',
        name: "Sample 2 Project",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!",
        headerImageUrl: 'http://localhost:4200/assets/react-movies-pedia.png',
        nextProjectLink: {
            label: 'Sample',
            route: "/work/android/sample2"
        },
        featureImageUrls: [
            'http://localhost:4200/assets/react-movies-pedia.png',
            'http://localhost:4200/assets/react-movies-pedia.png',
            'http://localhost:4200/assets/react-movies-pedia.png',
            'http://localhost:4200/assets/react-movies-pedia.png',
        ],
        githubUrl: 'https://github.com/abhijitunavane/React-Movies-App',
        isLiked: true
    },
];

export interface Project {
    id: String;
    name: String;
    description: String;
    githubUrl: String;
    headerImageUrl: String;
    featureImageUrls: String[];
    isLiked: Boolean;
    nextProjectLink: Link;
}
