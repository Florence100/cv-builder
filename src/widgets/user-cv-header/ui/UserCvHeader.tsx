import { fetchCv } from '@/src/entities/cv/api/server';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/src/shared/ui/breadcrumb';
import { getTranslations } from 'next-intl/server';

export const UserCvHeader = async ({ cvId }: { cvId: string }) => {
  const t = await getTranslations('widgets.userCvHeader');
  const cv = await fetchCv(cvId);

  const cvName = cv?.name || 'Cv Name';

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/cvs" className="text-base">
            {t('cvsTab')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/cvs/${cvId}/details`}
            className="text-base text-primary/60 hover:text-primary/80"
          >
            <div className="flex justify-center items-center gap-1.5">
              <span>{cvName}</span>
            </div>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
