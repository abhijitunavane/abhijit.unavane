import { Link } from "../../../utils/link";

export const domainMock: Domain[] = [
    {
        id: 'android',
        name: "Android",
        overview: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!",
        projectDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!",
        projectList: [
            {
                name: 'Android Project',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!',
                projectPath: '',
                photoUrl: 'http://localhost:4200/assets/react-movies-pedia.png',
                isLiked: false
            },
        ],
        nextDomainLink: {
            label: 'Angular',
            route: "/work/angular"
        }
    },
    {
        id: 'angular',
        name: "Angular",
        overview: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!",
        projectDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!",
        projectList: [],
        nextDomainLink: {
            label: 'React',
            route: "/work/react"
        }
    },
    {
        id: 'react',
        name: "React",
        overview: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!",
        projectDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!",
        projectList: [],
        nextDomainLink: {
            label: 'Flutter',
            route: "/work/flutter"
        }
    },
    {
        id: 'flutter',
        name: "Flutter",
        overview: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!",
        projectDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae similique libero ea hic sit saepe, cum rem dolore, voluptas quam culpa. Maiores, assumenda odio possimus officia ab culpa doloribus molestiae!",
        projectList: [],
        nextDomainLink: {
            label: 'Android',
            route: "/work/android"
        }
    },
];

export interface Domain {
    id: String,
    name: String;
    overview: String;
    projectDescription: String;
    projectList: Project[];
    nextDomainLink: Link;
}

export interface Project {
    name: String;
    description: String;
    projectPath: String;
    photoUrl: String;
    isLiked: Boolean;
}
