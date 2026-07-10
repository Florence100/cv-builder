import { CvProjectsPage } from '@/src/pages/cv-projects';

export default async function CvProjects({ params }: { params: Promise<{ cvId: string }> }) {
  const { cvId } = await params;

  return <CvProjectsPage cvId={cvId} />;
}
