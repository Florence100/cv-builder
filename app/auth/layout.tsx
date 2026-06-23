import { AuthNavigation } from '@/src/widgets/auth-navigation';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col flex-1 gap-4 w-[35rem] max-w-full">
      <AuthNavigation />
      {children}
    </main>
  );
}
