import { redirect } from 'next/navigation';

export default async function UserIdPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  redirect(`${id}/profile`);
}
