import React from 'react';
import jsonProject from '../../../projects.json';
// import { Project } from 'types';

// export const getStaticPaths = () => {
//   const paths = jsonProject.map((project) => {
//     return {
//       params: { slug: project.slug },
//     };
//   });

//   return { paths, fallback: true };
// };

// export const getStaticProps = ({ params }: any) => {
//   const { items } = params;

//   return {
//     props: { project: items[0] },
//   };
// };

type Props = {};

const Project = (props: Props) => {
  return <div>meow</div>;
};

export default Project;
