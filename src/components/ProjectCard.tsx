import Image from 'next/image';
import Link from 'next/link';
import { TypeProject } from 'types';

const ProjectCard = ({ project }: { project: TypeProject }) => {
  const { content, coverImage, date, excerpt, slug, title } = project.fields;

  return (
    <div className='card'>
      <Link href={`/projects/${slug}`}>
        <div className='title'>{title}</div>
        <Image
          className='image'
          src={`https:${coverImage.fields.file.url}`}
          alt='cover-image'
          height={250}
          width={300}
        />
      </Link>

      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          width: 300px;
          height: 295px;
          align-items: center;
          text-align: center;
          /* padding-top: 5px; */
          background-color: #353232;
          transition: transform 0.2s ease-in-out;
        }
        .card:hover {
          transform: scale(1.05);
        }
        .title {
          font-size: 1.2rem;
          font-weight: bold;
          margin: 10px;
          /* text-transform: uppercase; */
        }
        /* .image {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
          border-radius: 4px;
        } */
      `}</style>
    </div>
  );
};

export default ProjectCard;
