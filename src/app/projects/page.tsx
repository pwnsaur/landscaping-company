import type { Metadata } from 'next';

import ProjectCard from '@/components/ProjectCard';
import ListingPageTemplate from '@/components/ui/page/ListingPageTemplate';
import { getProjects } from '@/lib/contentfulData';

export const metadata: Metadata = {
  title: 'Projekti',
  description: 'Realizēti ainavu projekti — privāti pagalmi, ceļi un apzaļumošana. Ieskatieties mūsu darbos.',
};

export const revalidate = 900;

const ProjectsPage = async () => {
  const projects = await getProjects();

  return (
    <ListingPageTemplate
      eyebrow='Projekti'
      title='Piemēri ar reāliem teritoriju pārveidojumiem'
      lead='No privātiem pagalmiem līdz lielākām teritorijām. Katrs projekts tiek pielāgots vietai, lietojumam un ilgtermiņa uzturēšanai.'
      items={projects}
      renderItem={(project, index) => (
        <ProjectCard
          key={project.sys.id}
          project={project}
          priority={index === 0}
        />
      )}
      emptyStateText='Pašlaik projektu galerija tiek papildināta. Ja vēlies redzēt līdzīgus darbus, sazinieties ar mums.'
      cta={{
        title: 'Nepieciešams līdzīgs risinājums?',
        text: 'Apraksti situāciju un sagatavosim ieteicamo darbu plānu.',
        href: '/contacts',
        label: 'Sazinaties',
      }}
    />
  );
};

export default ProjectsPage;
