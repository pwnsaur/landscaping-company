import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { TypeProject } from '@/types/contentfulTypes';
import useOnScreen from '@/utils/hooks/useOnScreen';

const ProjectCard = ({
  project,
  priority,
}: {
  project: TypeProject;
  priority: boolean;
}) => {
  const { coverImage, slug, title } = project.fields;

  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const shouldLoadImage = priority || onScreen;

  return (
    <StyledCard ref={ref}>
      <Link href={`/projects/${slug}`}>
        {shouldLoadImage ? (
          <ImageContainer>
            <StyledImage
              src={`https:${coverImage.fields.file.url}`}
              alt='cover-image'
              height={coverImage.fields.file.details.image!.height / 4}
              width={coverImage.fields.file.details.image!.width / 4}
              // layout='fill'
              priority={priority}
            />
          </ImageContainer>
        ) : (
          <Placeholder
            height={coverImage.fields.file.details.image!.height / 4}
          />
        )}
        <Title>{title}</Title>
      </Link>
    </StyledCard>
  );
};

export default ProjectCard;

const Placeholder = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  background-color: #eee;
`;

const StyledCard = styled.div`
  position: relative;
  height: fit-content;
  text-align: center;
  background-color: #ededed;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-bottom: 75%;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h3`
  font-size: clamp(0.8rem, 1.1vw, 1rem);
  font-weight: 500;
  margin: 0.6rem;
  text-transform: uppercase;
`;
