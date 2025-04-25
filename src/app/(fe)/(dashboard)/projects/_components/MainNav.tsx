'use client';

import { useState } from 'react';
import { Avatar } from '@/components/avatar-component';
import useEnvironments from '@/shared/api/queries/useEnvironments';
import ProjectsDropdown from './ProjectsDropdown';
import CreateEnvironmentDialog from './CreateEnvironmentDialog';
import EnvironmentsDropdown from './EnvironmentsDropdown';
import Link from 'next/link';
import ThemeLogo from '@/components/theme-logo';

interface MainNavProps {
  slug: string;
}

export function MainNav(props: MainNavProps) {
  const { slug } = props;
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { refetch } = useEnvironments(slug);

  return (
    <div className="flex items-center space-x-4">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <ThemeLogo
          darkLogo="/white-rocket-logo.png"
          lightLogo="/black-rocket-logo.png"
          name="XFlowUp"
          className="h-8 w-8"
        />
        <span className="font-bold inline-block">XFlowUp</span>
      </Link>
      <nav className="flex items-center space-x-2">
        <ProjectsDropdown slug={slug} />
        <EnvironmentsDropdown slug={slug} onNewEnvironmentClick={() => setCreateDialogOpen(true)} />
      </nav>

      <CreateEnvironmentDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        slug={slug}
        onSuccess={() => refetch()}
      />
    </div>
  );
}
