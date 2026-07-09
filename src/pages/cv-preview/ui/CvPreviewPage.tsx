import { Button } from '@/src/shared/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/shared/ui/table';

export const CvPreviewPage = ({ cvId }: { cvId: string }) => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 px-6 py-10 text-foreground">
      <header className="flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-normal">Rostislav Harlanov</h1>
          <Button
            variant="outline"
            className="rounded-full h-10 px-10 py-4 text-primary border-primary hover:bg-red-50 hover:text-primary uppercase"
          >
            Export PDF
          </Button>
        </div>
        <p className="uppercase">Software Engineer</p>
      </header>

      <section className="grid grid-cols-[240px_1fr] gap-x-6">
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-bold">Education</h3>
            <p>Computer Systems Design</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Language proficiency</h3>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Domains</h3>
            <p>IoT (Internet of Things)</p>
          </div>
        </div>

        <div className="border-l border-primary pl-6 space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-bold">Software Engineer with 5+ years of experience</h3>
            <p>
              Highly motivated and experienced Software Engineer with 5+ years of proven success in
              designing and developing complex software solutions. Adept at utilizing cutting-edge
              technologies such as React and Node.js to create user-friendly and scalable
              applications. Possesses a strong understanding of Computer Systems Design principles
              and methodologies. A results-oriented individual with a passion for delivering
              high-quality work and exceeding expectations. A strong team leader and mentor with a
              proven ability to guide and motivate others to achieve shared goals. Seeking a
              challenging and rewarding Software Engineer position where I can leverage my skills
              and experience to contribute to the success of a dynamic and innovative organization.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Programming languages</h3>
            <p>JavaScript, TypeScript.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Frontend</h3>
            <p>React, Redux.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Backend</h3>
            <p>gRPC.</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-4xl font-normal">Projects</h2>

        <div className="grid grid-cols-[240px_1fr] gap-x-6">
          <div className="space-y-2 py-4">
            <h4 className="font-bold text-primary uppercase">Saas Media Platform</h4>
            <p>
              A digital music, podcast, and video service that gives you access to millions of songs
              and other content from creators all over the world. The user can connect and manage
              service providers such as Spotify, Apple Music, Tidal and SoundCloud in a few clicks
              and play content from them.
            </p>
          </div>

          <div className="border-l border-primary pl-6 space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-bold">Project roles</h3>
              <p>Software Engineer</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Period</h3>
              <p>08.2023 — Till now</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Responsibilities</h3>
              <ul className="ml-2 space-y-1.5 ">
                <li className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-foreground">
                  Integrated Keycloak OAuth SSO login for seamless user authentication;
                </li>
                <li className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-foreground">
                  Developed web components according to the Figma design system to ensure a
                  consistent and modern user interface;
                </li>
                <li className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-foreground">
                  Successfully managed and onboarded both wired and wireless IoT devices, enabling
                  real-time data streaming and control;
                </li>
                <li className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-foreground">
                  Collaborated with the development team to integrate with third-party service
                  providers such as Spotify, Apple Music, and Tidal, enhancing the user experience;
                </li>
                <li className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-foreground">
                  Contributed to the overall success of the project by implementing robust security
                  measures and optimizing performance.
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold">Environment</h3>
              <p>TypeScript, React, Redux, Redux Toolkit, RTK Query, Radix UI, gRPC, Keycloak.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-4xl">Professional skills</h2>

        <Table>
          <TableHeader className="[&_tr]:border-primary">
            <TableRow className="border-b hover:bg-transparent">
              <TableHead className="w-65 text-sm font-medium h-10 align-top px-4 py-2.5">
                SKILLS
              </TableHead>
              <TableHead className="text-sm font-medium h-10 align-bottom px-4 py-2.5"></TableHead>
              <TableHead className="text-sm font-medium text-center h-10 align-bottom px-4 py-2.5 w-37.5">
                EXPERIENCE
                <br />
                IN YEARS
              </TableHead>
              <TableHead className="text-sm font-medium text-center h-10 align-top px-4 py-2.5 w-37.5">
                LAST USED
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr]:border-border-table">
            <TableRow className="border-b hover:bg-transparent">
              <TableCell className="text-primary font-medium align-top px-4 pt-2.5 pb-7">
                Programming languages
              </TableCell>
              <TableCell className="align-top font-medium px-4 pt-2.5 pb-7">
                <div className="flex flex-col gap-4">
                  <span>TypeScript</span>
                  <span>JavaScript</span>
                </div>
              </TableCell>
              <TableCell className="text-center align-top px-4 pt-2.5 pb-7">2</TableCell>
              <TableCell className="text-center align-top px-4 pt-2.5 pb-7">2025</TableCell>
            </TableRow>
            <TableRow className="border-b hover:bg-transparent">
              <TableCell className="text-primary font-medium align-top px-4 pt-2.5 pb-7">
                Frontend technologies
              </TableCell>
              <TableCell className="align-top font-medium px-4 pt-2.5 pb-7">React</TableCell>
              <TableCell className="text-center align-top px-4 pt-2.5 pb-7">2</TableCell>
              <TableCell className="text-center align-top px-4 pt-2.5 pb-7">2025</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  );
};
