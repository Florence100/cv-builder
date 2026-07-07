import { redirect } from 'next/navigation';

export default async function UserIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`${id}/profile`);
}
