import { CvPreviewPage } from '@/src/pages/cv-preview';

export default async function CvPreview({ params }: { params: Promise<{ cvId: string }> }) {
  const { cvId } = await params;

  return <CvPreviewPage cvId={cvId} />;
}
