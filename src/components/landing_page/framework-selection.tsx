'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimation } from '../animations/scroll-animation';
import { useTheme } from 'next-themes';

const FrameworkSelection = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme : undefined;

  const majorFrameworks = [
    {
      name: 'Astro',
      logo:
        mounted && currentTheme === 'dark'
          ? '/frameworks/astro-icon-light.svg'
          : '/frameworks/astro-icon-dark.svg',
      href: '/deploy/astro',
    },
    {
      name: 'Next.JS',
      logo:
        mounted && currentTheme === 'dark'
          ? '/frameworks/nextjs-icon-light.svg'
          : '/frameworks/nextjs-icon-dark.svg',
      href: '/deploy/nextjs',
    },
    {
      name: 'Nuxt',
      logo: '/frameworks/nuxt-icon.svg',
      href: '/deploy/nuxt',
    },
    {
      name: 'Remix',
      logo:
        mounted && currentTheme === 'dark'
          ? '/frameworks/remix-letter-dark.svg'
          : '/frameworks/remix-letter-light.svg',
      href: '/deploy/remix',
    },
  ];

  const minorFrameworks = [
    { name: 'React', logo: '/frameworks/react-icon.svg', href: '/deploy/react' },
    {
      name: '11ty',
      logo:
        mounted && currentTheme === 'dark'
          ? '/frameworks/11ty-icon-light.svg'
          : '/frameworks/11ty-icon-dark.svg',
      href: '/deploy/11ty',
    },
    { name: 'Gatsby', logo: '/frameworks/gatsby-icon.svg', href: '/deploy/gatsby' },
    { name: 'SvelteKit', logo: '/frameworks/sveltekit-icon.svg', href: '/deploy/sveltekit' },
    { name: 'Vue', logo: '/frameworks/vue-icon.svg', href: '/deploy/vue' },
    { name: 'Angular', logo: '/frameworks/angular-icon.svg', href: '/deploy/angular' },
    { name: 'Solid', logo: '/frameworks/solid-icon.svg', href: '/deploy/solid' },
    { name: 'Hydrogen', logo: '/frameworks/hydrogen-icon.svg', href: '/deploy/hydrogen' },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <ScrollAnimation>
        <h2 className="text-center font-bold">GET STARTED</h2>
        <h3 className="text-center font-bold mt-4 text-3xl md:text-4xl">
          Here&#39;s freedom to framework how you want to
        </h3>
      </ScrollAnimation>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {majorFrameworks.map((framework, index) => (
          <ScrollAnimation key={framework.name} delay={index * 0.1}>
            <Card className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <Link href={framework.href}>
                <CardContent className="p-6 flex flex-col items-center justify-center h-40">
                  <div className="h-16 w-16 relative mb-4 flex items-center justify-center">
                    <Image
                      src={framework.logo}
                      alt={`${framework.name} logo`}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs uppercase text-gray-500 mb-1">DEPLOY WITH</p>
                    <h4 className="text-xl font-bold">{framework.name}</h4>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </ScrollAnimation>
        ))}
      </div>

      <ScrollAnimation delay={0.3}>
        <div className="flex mt-12 items-center justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {minorFrameworks.map((framework, index) => (
              <ScrollAnimation key={framework.name} delay={0.1 + index * 0.05}>
                <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow w-20 h-20">
                  <Link href={framework.href} className="h-full w-full">
                    <CardContent className="p-0 flex items-center justify-center h-full">
                      <div className="relative">
                        <Image
                          src={framework.logo}
                          alt={`${framework.name} logo`}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </ScrollAnimation>
            ))}

            <ScrollAnimation
              className="col-span-2 sm:col-span-4 md:col-span-4"
              delay={0.1 + minorFrameworks.length * 0.05}
            >
              <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow h-20">
                <Link href="/docs" className="h-full w-full">
                  <CardContent className="p-0 flex flex-col justify-center h-full">
                    <div className="px-3">
                      <p className="text-sm">
                        Head over to our docs for a full <br /> list of framework configurations.
                      </p>
                      <p className="text-sm text-blue-500 mt-1">Go to XFlowUp docs →</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default FrameworkSelection;
