import { redirect } from 'next/navigation';

export default async function UserIdPage({ params }: { params: Promise<{ cvId: string }> }) {
  const { cvId } = await params;
  redirect(`${cvId}/details`);
}
