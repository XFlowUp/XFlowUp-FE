'use client';

import { useRef } from 'react';
import { Code, Network, Flame, Building, Rocket, Brain } from 'lucide-react';

import { VerticalTimeline } from './components/VerticalTimeline';
import { TimelineItem } from './components/TimelineItem';
import { SideNavigation } from './components/SideNavigation';
import { SourceSection } from './components/sections/SourceSection';
import { NetworkingSection } from './components/sections/NetworkingSection';
import { BuildSection } from './components/sections/BuildSection';
import { DeploySection } from './components/sections/DeploySection';
import { ConfigSection } from './components/sections/ConfigSection';
import { DangerSection } from './components/sections/DangerSection';

interface SettingsSectionProps {
  serviceId: number | string;
  serviceName: string;
  projectSlug: string;
  onServiceDeleted?: () => void;
}

export default function SettingsSection({
  serviceId,
  serviceName,
  projectSlug,
  onServiceDeleted,
}: SettingsSectionProps) {
  const sourceRef = useRef<HTMLDivElement>(null);
  const networkingRef = useRef<HTMLDivElement>(null);
  const buildRef = useRef<HTMLDivElement>(null);
  const deployRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const dangerRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'source', label: 'Source', ref: sourceRef },
    { id: 'networking', label: 'Networking', ref: networkingRef },
    { id: 'build', label: 'Build', ref: buildRef },
    { id: 'deploy', label: 'Deploy', ref: deployRef },
    { id: 'ai', label: 'AI Commit Review', ref: aiRef },
    { id: 'danger', label: 'Danger', ref: dangerRef },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const numericServiceId = typeof serviceId === 'string' ? parseInt(serviceId, 10) : serviceId;

  return (
    <div className="w-full h-full text-foreground dark:text-gray-300 flex relative">
      <div className="w-full overflow-y-auto pt-6 pl-12 pr-48">
        <VerticalTimeline>
          <TimelineItem ref={sourceRef} icon={<Code className="h-4 w-4" />} title="Source">
            <SourceSection serviceId={numericServiceId} />
          </TimelineItem>

          <TimelineItem
            ref={networkingRef}
            icon={<Network className="h-4 w-4" />}
            title="Networking"
          >
            <NetworkingSection serviceId={numericServiceId} />
          </TimelineItem>

          <TimelineItem ref={buildRef} icon={<Building className="h-4 w-4" />} title="Build">
            <BuildSection />
          </TimelineItem>

          <TimelineItem ref={deployRef} icon={<Rocket className="h-4 w-4" />} title="Deploy">
            <DeploySection />
          </TimelineItem>

          <TimelineItem ref={aiRef} icon={<Brain className="h-4 w-4" />} title="AI Commit Review">
            <ConfigSection serviceId={numericServiceId} />
          </TimelineItem>

          <TimelineItem
            ref={dangerRef}
            icon={<Flame className="h-4 w-4 text-red-500" />}
            title="Delete Service"
            danger
          >
            <DangerSection
              serviceId={serviceId}
              serviceName={serviceName}
              projectSlug={projectSlug}
              onServiceDeleted={onServiceDeleted}
            />
          </TimelineItem>
        </VerticalTimeline>
      </div>
      <SideNavigation sections={sections} onSectionClick={scrollToSection} />
    </div>
  );
}
