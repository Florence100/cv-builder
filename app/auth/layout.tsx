import { AuthNavigation } from '@/src/widgets/auth-navigation/ui/AuthNavigation';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col gap-4">
      <AuthNavigation />
      {children}
    </main>
  );
}
