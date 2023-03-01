import Cato from '../../public/cato.webp';
import Image from 'next/image';

type Props = {
  title: string;
};

const ProjectCard = ({ title }: Props) => {
  return (
    <div className='card'>
      <div className='title'>{title}</div>
      <Image className='image' src={Cato} alt='cato' height={200} />
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
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
