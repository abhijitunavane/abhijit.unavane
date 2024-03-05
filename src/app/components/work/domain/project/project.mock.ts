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
        features: [],
        featuresDescription: '',
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
            route: "/work/android/sample"
        },
        features: [
            {
                name: 'Search feature',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!',
                imageUrls: ['http://localhost:4200/assets/react-movies-pedia.png', ],
            }
        ],
        featuresDescription: 'Top features of this project',
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
    features: Feature[];
    featuresDescription: String;
    isLiked: Boolean;
    nextProjectLink: Link;
}

export interface Feature {
    name: String;
    description: String;
    imageUrls: String[];
}
