import Cato from '../../public/cato.webp';
import Image from 'next/image';
import Link from 'next/link';
import { TypePost } from 'types';

const ProjectCard = ({ project }: { project: TypePost }) => {
  const { content, coverImage, date, excerpt, slug, title } = project.fields;
  return (
    <div className='card'>
      <Link href={`/projects/${slug}`}>
        <div className='title'>{project.fields.title}</div>
        {/* <Image className='image' src={Cato} alt='cato' height={200} /> */}
        <Image
          className='image'
          src={`https:${coverImage.fields.file.url}`}
          alt='cato'
          height={200}
          width={250}
        />
      </Link>

      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          max-width: 300px;
          height: 200px%;
          align-items: center;
          padding: 20px;
          background-color: salmon;
          border-radius: 8px;
          transition: transform 0.2s ease-in-out;
        }
        .card:hover {
          transform: scale(1.05);
        }
        .title {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .image {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;
