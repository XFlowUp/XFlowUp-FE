'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ScrollAnimation } from '../animations/scroll-animation';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <section className="container flex max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
        <ScrollAnimation>
          <div className="space-y-4">
            <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              Your complete platform for the web.
            </h1>
            <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              XFlowUp provides the developer tools and cloud infrastructure to build, scale, and
              secure a faster, more personalized web.
            </p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation delay={0.2}>
          <div className="flex gap-4">
            <Button size="lg" onClick={() => router.push('/dashboard')}>
              Start Deploying
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Schedule a Demo
            </Button>
          </div>
        </ScrollAnimation>
      </section>
    </div>
  );
}
