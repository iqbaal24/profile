import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '../project-data';

type ProjectPageParams = Promise<{
  slug: string;
}>;

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: ProjectPageParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Preview',
    };
  }

  return {
    title: `${project.title} — Preview`,
    description: `Preview image for ${project.title}`,
  };
}

export default async function ProjectPreviewPage({
  params,
}: {
  params: ProjectPageParams;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="min-h-[calc(100vh-128px)] px-6 sm:px-10 md:px-16 xl:px-24 pt-28 pb-16">
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-ink/10 pb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ink/20 text-[10px] font-bold uppercase tracking-widest text-ink-muted mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Project Preview
          </div>
          <h1 className="text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-tight font-black uppercase text-ink">
            {project.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted text-justify max-w-2xl font-medium">
            {project.description}
          </p>
        </div>

        <Link
          href="/#projects"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-bold uppercase tracking-widest text-canvas transition-opacity hover:opacity-80"
        >
          ← Back to projects
        </Link>
      </div>

      <div className="rounded-3xl border border-ink/10 bg-ink/[0.02] p-4 sm:p-6 shadow-xl shadow-black/5">
        <div className="max-h-[calc(100vh-320px)] overflow-auto rounded-2xl border border-ink/10 bg-canvas">
          <div className="min-w-full p-4 sm:p-6">
            <Image
              src={encodeURI(project.previewImage)}
              alt={project.previewImageAlt}
              width={1600}
              height={2400}
              priority
              sizes="100vw"
              className="h-auto w-full rounded-xl grayscale contrast-110"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
