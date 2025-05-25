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
  Plug,
  Zap,
  Shield,
  Globe,
  Database,
  Cloud,
  Smartphone,
  Mail,
  MessageSquare,
  BarChart3,
  CreditCard,
  Users,
  Calendar,
  FileText,
  Settings,
  CheckCircle,
  Star,
  ExternalLink,
  Download,
  Play,
  Search,
  Filter,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const integrationCategories = [
  'All',
  'Analytics',
  'CRM',
  'Communication',
  'Payment',
  'Cloud Storage',
  'Marketing',
  'Development',
  'Security',
];

const integrations = [
  {
    id: 1,
    name: 'Google Analytics',
    description: 'Connect your Google Analytics data for comprehensive web analytics insights.',
    category: 'Analytics',
    logo: '/api/placeholder/80/80',
    featured: true,
    verified: true,
    rating: 4.9,
    installs: '50K+',
    setupTime: '5 min',
    features: [
      'Real-time data sync',
      'Custom dashboard widgets',
      'Advanced reporting',
      'Goal tracking integration',
    ],
    benefits: [
      'Unified analytics view',
      'Automated reporting',
      'Enhanced data visualization',
      'Cross-platform insights',
    ],
  },
  {
    id: 2,
    name: 'Salesforce CRM',
    description: 'Seamlessly integrate with Salesforce to sync customer data and sales metrics.',
    category: 'CRM',
    logo: '/api/placeholder/80/80',
    featured: true,
    verified: true,
    rating: 4.8,
    installs: '25K+',
    setupTime: '10 min',
    features: [
      'Bi-directional sync',
      'Lead scoring integration',
      'Pipeline analytics',
      'Custom field mapping',
    ],
    benefits: [
      'Streamlined sales process',
      'Better lead management',
      'Improved conversion tracking',
      'Enhanced customer insights',
    ],
  },
  {
    id: 3,
    name: 'Slack',
    description: 'Get real-time notifications and collaborate with your team directly in Slack.',
    category: 'Communication',
    logo: '/api/placeholder/80/80',
    featured: false,
    verified: true,
    rating: 4.7,
    installs: '40K+',
    setupTime: '3 min',
    features: ['Real-time alerts', 'Custom notifications', 'Team collaboration', 'Report sharing'],
    benefits: [
      'Instant notifications',
      'Team alignment',
      'Faster decision making',
      'Improved communication',
    ],
  },
  {
    id: 4,
    name: 'Stripe',
    description: 'Connect Stripe to track payment analytics and revenue metrics in real-time.',
    category: 'Payment',
    logo: '/api/placeholder/80/80',
    featured: true,
    verified: true,
    rating: 4.9,
    installs: '30K+',
    setupTime: '7 min',
    features: ['Revenue tracking', 'Payment analytics', 'Subscription metrics', 'Churn analysis'],
    benefits: [
      'Complete revenue visibility',
      'Payment insights',
      'Subscription analytics',
      'Financial reporting',
    ],
  },
  {
    id: 5,
    name: 'AWS S3',
    description: 'Securely store and access your data files with Amazon S3 integration.',
    category: 'Cloud Storage',
    logo: '/api/placeholder/80/80',
    featured: false,
    verified: true,
    rating: 4.6,
    installs: '20K+',
    setupTime: '8 min',
    features: ['Secure file storage', 'Automated backups', 'Data encryption', 'Access controls'],
    benefits: ['Scalable storage', 'Data security', 'Cost optimization', 'Reliable backups'],
  },
  {
    id: 6,
    name: 'HubSpot',
    description: 'Integrate with HubSpot to sync marketing campaigns and lead data.',
    category: 'Marketing',
    logo: '/api/placeholder/80/80',
    featured: false,
    verified: true,
    rating: 4.8,
    installs: '35K+',
    setupTime: '12 min',
    features: ['Campaign tracking', 'Lead attribution', 'Marketing automation', 'ROI analysis'],
    benefits: [
      'Marketing insights',
      'Lead optimization',
      'Campaign performance',
      'Attribution modeling',
    ],
  },
  {
    id: 7,
    name: 'GitHub',
    description: 'Connect your GitHub repositories to track development metrics and code quality.',
    category: 'Development',
    logo: '/api/placeholder/80/80',
    featured: false,
    verified: true,
    rating: 4.7,
    installs: '15K+',
    setupTime: '5 min',
    features: ['Code metrics', 'Commit tracking', 'Issue analytics', 'Team productivity'],
    benefits: [
      'Development insights',
      'Team performance',
      'Code quality tracking',
      'Project analytics',
    ],
  },
  {
    id: 8,
    name: 'Okta',
    description: 'Secure single sign-on and identity management integration.',
    category: 'Security',
    logo: '/api/placeholder/80/80',
    featured: false,
    verified: true,
    rating: 4.5,
    installs: '10K+',
    setupTime: '15 min',
    features: ['SSO integration', 'User management', 'Access controls', 'Security monitoring'],
    benefits: ['Enhanced security', 'User convenience', 'Access management', 'Compliance support'],
  },
  {
    id: 9,
    name: 'Microsoft Teams',
    description: 'Collaborate and share insights directly within Microsoft Teams.',
    category: 'Communication',
    logo: '/api/placeholder/80/80',
    featured: false,
    verified: true,
    rating: 4.6,
    installs: '22K+',
    setupTime: '4 min',
    features: [
      'Team notifications',
      'Report sharing',
      'Meeting integration',
      'Collaborative dashboards',
    ],
    benefits: ['Team collaboration', 'Instant updates', 'Meeting insights', 'Shared analytics'],
  },
];

export default function IntegrationsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'All' || integration.category === selectedCategory;
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredIntegrations = integrations.filter(integration => integration.featured);

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
          <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <Badge variant="outline" className="mb-4">
                  <Plug className="mr-2 h-3 w-3" />
                  Integrations & Connections
                </Badge>
                <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                  Connect Everything
                  <br />
                  You Already Use
                </h1>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Seamlessly integrate XFlowUp with your favorite tools and platforms. Over 200+
                  integrations to streamline your workflow and maximize productivity.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => router.push('/dashboard')}>
                  Browse All Integrations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
            </ScrollAnimation>
          </section>
        </div>

        {/* Stats Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">200+</div>
                  <div className="text-sm text-muted-foreground">Available Integrations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1M+</div>
                  <div className="text-sm text-muted-foreground">Active Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5 min</div>
                  <div className="text-sm text-muted-foreground">Average Setup Time</div>
                </div>
              </div>
            </ScrollAnimation>
          </section>
        </div>

        {/* Featured Integrations */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Popular Integrations
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  The most loved integrations by our community of users.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featuredIntegrations.map((integration, index) => (
                <ScrollAnimation key={integration.id} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full relative overflow-hidden ring-2 ring-primary">
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="mr-1 h-3 w-3" />
                          Featured
                        </Badge>
                      </div>

                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={integration.logo}
                            alt={integration.name}
                            className="w-12 h-12 rounded-lg"
                          />
                          <div className="flex items-center gap-2">
                            {integration.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {integration.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{integration.rating}</span>
                          </div>
                          <span className="text-muted-foreground">
                            {integration.installs} installs
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Setup time:</span>
                          <span className="font-medium">{integration.setupTime}</span>
                        </div>

                        <Button
                          className="w-full mt-4"
                          variant={integration.featured ? 'default' : 'outline'}
                          onClick={() => router.push(`/integrations/${integration.id}`)}
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

        {/* All Integrations */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  All Integrations
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Explore our complete library of integrations and find the perfect tools for your
                  workflow.
                </p>
              </div>
            </ScrollAnimation>

            {/* Search and Filter */}
            <ScrollAnimation delay={0.2}>
              <div className="mx-auto max-w-4xl space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search integrations..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {integrationCategories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      <Filter className="mr-2 h-3 w-3" />
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            {/* Integrations Grid */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredIntegrations.map((integration, index) => (
                <ScrollAnimation key={integration.id} delay={index * 0.05}>
                  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={integration.logo}
                            alt={integration.name}
                            className="w-10 h-10 rounded-lg"
                          />
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {integration.category}
                            </Badge>
                            {integration.verified && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {integration.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{integration.rating}</span>
                          </div>
                          <span className="text-muted-foreground">{integration.installs}</span>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => router.push(`/integrations/${integration.id}`)}
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

        {/* Integration Benefits */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Why Choose Our Integrations?
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Built for reliability, security, and ease of use.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: 'Lightning Fast Setup',
                  description:
                    'Get connected in minutes with our one-click integration setup process.',
                },
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  description: 'Bank-level encryption and security protocols protect your data.',
                },
                {
                  icon: Globe,
                  title: 'Real-time Sync',
                  description: 'Data syncs in real-time across all your connected platforms.',
                },
                {
                  icon: Database,
                  title: 'Data Integrity',
                  description: 'Maintain data consistency and accuracy across all integrations.',
                },
                {
                  icon: Cloud,
                  title: 'Cloud Native',
                  description: 'Built for the cloud with automatic scaling and high availability.',
                },
                {
                  icon: Settings,
                  title: 'Easy Management',
                  description: 'Manage all your integrations from a single, intuitive dashboard.',
                },
              ].map((feature, index) => (
                <ScrollAnimation key={feature.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="relative overflow-hidden rounded-lg border bg-background p-6"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
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
                  Ready to Connect Your Tools?
                </h2>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Start integrating your favorite tools and platforms with XFlowUp today. No
                  technical expertise required.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => router.push('/dashboard')}>
                  Start Connecting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push('/contact')}>
                  Request Integration
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Integration Guide
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
