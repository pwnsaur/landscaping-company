import React from 'react';
import { TypeService } from 'types';
import { getStaticPaths, getStaticProps } from '../api/serviceData';

const Service = ({ service }: { service: TypeService }) => {
  const { coverImage, slug, title } = service.fields;

  return <div>{title}</div>;
};

export { getStaticPaths, getStaticProps };
export default Service;
