import type { Metadata } from 'next';

import ProjectCard from '@/components/ProjectCard';
import ListingPageTemplate from '@/components/ui/page/ListingPageTemplate';
import { getProjects } from '@/lib/contentfulData';

export const metadata: Metadata = {
  title: 'Projekti',
  description: 'Projekti',
};

export const revalidate = 900;

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <ListingPageTemplate
      eyebrow='Projekti'
      title='Piemeri ar realiem teritoriju parveidojumiem'
      lead='No privatiem pagalmiem lidz lielakam teritorijam. Katrs projekts tiek pielagots vietai, lietojumam un ilgtermina uzturesanai.'
      items={projects}
      renderItem={(project, index) => (
        <ProjectCard
          key={project.sys.id}
          project={project}
          priority={index < 2}
        />
      )}
      emptyStateText='Paslaik projektu galerija tiek papildinata. Ja velies redzet lidzigus darbus, sazinies ar mums.'
      cta={{
        title: 'Nepieciesams lidzigs risinajums?',
        text: 'Apraksti situaciju un sagatavosim ieteicamo darbu planu.',
        href: '/contacts',
        label: 'Sazinaties',
      }}
    />
  );
};

export default ProjectsPage;
