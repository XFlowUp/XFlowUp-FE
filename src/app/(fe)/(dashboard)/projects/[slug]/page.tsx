import ProjectTabsWrapper from './_components/ProjectTabsWrapper';
import { Suspense } from 'react';

export default async function ProjectsPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectTabsWrapper slug={params.slug} />
    </Suspense>
  );
}
