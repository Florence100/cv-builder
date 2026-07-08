import { CvsWidget } from '@/src/widgets/cvs-widget';

export const CvsPage = () => {
  return (
    <div className="px-6">
      <h1 className="pt-4 pl-5 text-muted-foreground">CVs</h1>
      <CvsWidget />
    </div>
  );
};
