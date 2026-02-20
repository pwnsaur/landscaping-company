'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';
import styled from 'styled-components';

import { TypeProject } from '@/types/contentfulTypes';
import { getAssetImageData } from '@/utils/contentfulAsset';
import useOnScreen from '@/utils/hooks/useOnScreen';

const ProjectCard = ({
  project,
  priority,
}: {
  project: TypeProject;
  priority: boolean;
}) => {
  const { coverImage, slug, title } = project.fields;
  const coverImageData = getAssetImageData(coverImage);

  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  const shouldLoadImage = priority || onScreen;

  return (
    <StyledCard ref={ref}>
      <Link href={`/projects/${slug}`}>
        {coverImageData && shouldLoadImage ? (
          <ImageContainer>
            <StyledImage
              src={coverImageData.src}
              alt='cover-image'
              height={coverImageData.height / 4}
              width={coverImageData.width / 4}
              quality={50}
              priority={priority}
            />
          </ImageContainer>
        ) : coverImageData ? (
          <StyledPlaceholder height={coverImageData.height / 5} />
        ) : (
          <StyledPlaceholder height={200} />
        )}
        <Title>{title}</Title>
      </Link>
    </StyledCard>
  );
};

export default ProjectCard;

const StyledPlaceholder = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => `${height}px`};
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledCard = styled.div`
  position: relative;
  height: fit-content;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
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
  font-size: ${({ theme }) => `
    clamp(${theme.smallClamp.min},
      ${theme.smallClamp.preferred},
      ${theme.smallClamp.max})
  `};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin: 0.6rem;
  text-transform: uppercase;
`;
