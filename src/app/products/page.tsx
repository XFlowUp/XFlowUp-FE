'use client';

import MouseMoveEffect from '@/components/mouse-move-effect';
import { Header } from '@/components/landing_page/header';
import Footer from '@/components/landing_page/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollAnimation } from '@/components/animations/scroll-animation';
import {
  ArrowRight,
  Check,
  Star,
  Zap,
  Shield,
  Cloud,
  Brain,
  Rocket,
  Users,
  BarChart3,
  Globe,
  Lock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const products = [
  {
    id: 1,
    name: 'XFlow Analytics Pro',
    description:
      'Advanced analytics platform with AI-powered insights and real-time data visualization.',
    price: '$99',
    period: '/month',
    category: 'Analytics',
    featured: true,
    icon: BarChart3,
    features: [
      'Real-time data processing',
      'AI-powered insights',
      'Custom dashboards',
      'Advanced reporting',
      'API integrations',
      '24/7 support',
    ],
    image: '/api/placeholder/400/300',
  },
  {
    id: 2,
    name: 'XFlow Security Suite',
    description: 'Comprehensive security solution with advanced threat detection and prevention.',
    price: '$149',
    period: '/month',
    category: 'Security',
    featured: false,
    icon: Shield,
    features: [
      'Advanced threat detection',
      'Real-time monitoring',
      'Automated responses',
      'Compliance reporting',
      'Multi-factor authentication',
      'Enterprise support',
    ],
    image: '/api/placeholder/400/300',
  },
  {
    id: 3,
    name: 'XFlow Cloud Platform',
    description:
      'Scalable cloud infrastructure with auto-scaling and global deployment capabilities.',
    price: '$199',
    period: '/month',
    category: 'Infrastructure',
    featured: false,
    icon: Cloud,
    features: [
      'Auto-scaling infrastructure',
      'Global CDN',
      'Load balancing',
      'Database management',
      'Backup & recovery',
      'DevOps tools',
    ],
    image: '/api/placeholder/400/300',
  },
  {
    id: 4,
    name: 'XFlow AI Assistant',
    description: 'Intelligent AI assistant for workflow automation and decision support.',
    price: '$79',
    period: '/month',
    category: 'AI/ML',
    featured: false,
    icon: Brain,
    features: [
      'Natural language processing',
      'Workflow automation',
      'Predictive analytics',
      'Smart recommendations',
      'Integration APIs',
      'Custom training',
    ],
    image: '/api/placeholder/400/300',
  },
  {
    id: 5,
    name: 'XFlow Enterprise',
    description: 'Complete enterprise solution with all features and dedicated support.',
    price: 'Custom',
    period: '',
    category: 'Enterprise',
    featured: true,
    icon: Rocket,
    features: [
      'All product features',
      'Dedicated support team',
      'Custom integrations',
      'On-premise deployment',
      'Training & consulting',
      'SLA guarantees',
    ],
    image: '/api/placeholder/400/300',
  },
  {
    id: 6,
    name: 'XFlow Collaboration',
    description: 'Team collaboration platform with advanced project management tools.',
    price: '$49',
    period: '/month',
    category: 'Collaboration',
    featured: false,
    icon: Users,
    features: [
      'Team workspaces',
      'Project management',
      'Real-time collaboration',
      'File sharing',
      'Video conferencing',
      'Mobile apps',
    ],
    image: '/api/placeholder/400/300',
  },
];

const categories = [
  'All',
  'Analytics',
  'Security',
  'Infrastructure',
  'AI/ML',
  'Enterprise',
  'Collaboration',
];

export default function ProductsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <MouseMoveEffect />
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>
      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
            <ScrollAnimation>
              <div className="space-y-4">
                <Badge variant="outline" className="mb-4">
                  <Zap className="mr-2 h-3 w-3" />
                  Products & Solutions
                </Badge>
                <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                  Powerful Products for
                  <br />
                  Modern Businesses
                </h1>
                <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                  Discover our comprehensive suite of products designed to accelerate your business
                  growth, enhance security, and streamline operations with cutting-edge technology.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => router.push('/dashboard')}>
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push('/contact')}>
                  Schedule a Demo
                </Button>
              </div>
            </ScrollAnimation>
          </section>
        </div>

        {/* Stats Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">150+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </ScrollAnimation>
          </section>
        </div>

        {/* Products Grid */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Choose Your Perfect Solution
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  From startups to enterprise, we have the right tools to power your success
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <ScrollAnimation key={product.id} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card
                      className={`h-full relative overflow-hidden ${product.featured ? 'ring-2 ring-primary' : ''}`}
                    >
                      {product.featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-primary text-primary-foreground">
                            <Star className="mr-1 h-3 w-3" />
                            Popular
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <product.icon className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant="secondary">{product.category}</Badge>
                        </div>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription className="text-sm">{product.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">{product.price}</span>
                          <span className="text-muted-foreground">{product.period}</span>
                        </div>

                        <ul className="space-y-2">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          className="w-full mt-6"
                          variant={product.featured ? 'default' : 'outline'}
                          onClick={() => router.push(`/products/${product.id}`)}
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </section>
        </div>

        {/* Features Comparison */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Why Choose XFlowUp?
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Built with modern technology stack and enterprise-grade security
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Globe,
                  title: 'Global Scale',
                  description: 'Deploy worldwide with our global infrastructure and CDN network',
                },
                {
                  icon: Lock,
                  title: 'Enterprise Security',
                  description: 'Bank-level security with SOC 2 compliance and data encryption',
                },
                {
                  icon: Zap,
                  title: 'Lightning Fast',
                  description: 'Optimized performance with sub-second response times',
                },
                {
                  icon: Users,
                  title: 'Expert Support',
                  description: '24/7 support from our team of technical experts',
                },
                {
                  icon: Brain,
                  title: 'AI-Powered',
                  description: 'Leverage artificial intelligence for smarter business decisions',
                },
                {
                  icon: Rocket,
                  title: 'Easy Integration',
                  description: 'Simple APIs and SDKs for seamless integration',
                },
              ].map((feature, index) => (
                <ScrollAnimation key={feature.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="relative overflow-hidden rounded-lg border bg-background p-8"
                  >
                    <div className="flex items-center gap-4">
                      <feature.icon className="h-8 w-8" />
                      <h3 className="font-bold">{feature.title}</h3>
                    </div>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                  Ready to Transform Your Business?
                </h2>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Join thousands of companies already using XFlowUp to accelerate their growth and
                  streamline operations.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => router.push('/dashboard')}>
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push('/contact')}>
                  Contact Sales
                </Button>
              </div>
            </ScrollAnimation>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}
