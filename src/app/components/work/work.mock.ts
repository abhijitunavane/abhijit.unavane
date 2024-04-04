import { Link } from "../../utils/link";

const bgColorList: string[] = [
  '#D09CFA',
  '#B9F3FC',
  '#B9F3FC',
  '#FFD495'
];

const styleClassList: string[] = [
  'project-item-l1',
  'project-item-r1',
  'project-item-l2',
  'project-item-r2'
];

export const workMockList: WorkDomain[] = [
    {
        name: 'Android',
        image: '../../../assets/react-movies-pedia.png',
        link: {
          label: '',
          route: 'android'
        },
        bgColor: bgColorList[0],
        styleClass: styleClassList[0]
      },
      {
        name: 'Angular',
        image: '../../../assets/react-movies-pedia.png',
        link: {
          label: '',
          route: 'angular'
        },
        bgColor: bgColorList[1],
        styleClass: styleClassList[1]
      },
      {
        name: 'React',
        image: '../../../assets/react-movies-pedia.png',
        link: {
          label: '',
          route: 'react'
        },
        bgColor: bgColorList[2],
        styleClass: styleClassList[2]
      },
      {
        name: 'Flutter',
        image: '../../../assets/react-movies-pedia.png',
        link: {
          label: '',
          route: 'flutter'
        },
        bgColor: bgColorList[3],
        styleClass: styleClassList[3]
      },
];

export interface WorkDomain {
  name: string;
  image: string;
  link: Link;
  bgColor: string;
  styleClass: string;
}
