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
  BookOpen,
  Code,
  Zap,
  Search,
  FileText,
  Video,
  MessageCircle,
  Download,
  ExternalLink,
  Lightbulb,
  Settings,
  Shield,
  Database,
  Smartphone,
  Globe,
  Users,
  Clock,
  Star,
  CheckCircle,
  Play,
  Github,
  Terminal,
  Layers,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const docCategories = [
  'All',
  'Getting Started',
  'API Reference',
  'Integrations',
  'Tutorials',
  'Best Practices',
  'Troubleshooting',
];

const documentationSections = [
  {
    id: 1,
    title: 'Quick Start Guide',
    description: 'Get up and running with XFlowUp in under 10 minutes',
    category: 'Getting Started',
    icon: Zap,
    readTime: '5 min',
    difficulty: 'Beginner',
    popular: true,
    lastUpdated: '2024-01-15',
    tags: ['setup', 'basics', 'installation'],
  },
  {
    id: 2,
    title: 'API Authentication',
    description: 'Learn how to authenticate and secure your API requests',
    category: 'API Reference',
    icon: Shield,
    readTime: '8 min',
    difficulty: 'Intermediate',
    popular: true,
    lastUpdated: '2024-01-12',
    tags: ['api', 'security', 'authentication'],
  },
  {
    id: 3,
    title: 'Dashboard Configuration',
    description: 'Customize your dashboards and create powerful visualizations',
    category: 'Tutorials',
    icon: Settings,
    readTime: '12 min',
    difficulty: 'Intermediate',
    popular: false,
    lastUpdated: '2024-01-10',
    tags: ['dashboard', 'visualization', 'customization'],
  },
  {
    id: 4,
    title: 'Data Integration Best Practices',
    description: 'Optimize your data flows and ensure data quality',
    category: 'Best Practices',
    icon: Database,
    readTime: '15 min',
    difficulty: 'Advanced',
    popular: true,
    lastUpdated: '2024-01-08',
    tags: ['data', 'integration', 'optimization'],
  },
  {
    id: 5,
    title: 'Mobile SDK Integration',
    description: 'Integrate XFlowUp analytics into your mobile applications',
    category: 'Integrations',
    icon: Smartphone,
    readTime: '20 min',
    difficulty: 'Advanced',
    popular: false,
    lastUpdated: '2024-01-05',
    tags: ['mobile', 'sdk', 'ios', 'android'],
  },
  {
    id: 6,
    title: 'REST API Reference',
    description: 'Complete reference for all REST API endpoints',
    category: 'API Reference',
    icon: Code,
    readTime: '30 min',
    difficulty: 'Intermediate',
    popular: true,
    lastUpdated: '2024-01-15',
    tags: ['api', 'rest', 'endpoints', 'reference'],
  },
  {
    id: 7,
    title: 'Webhook Configuration',
    description: 'Set up real-time webhooks for instant notifications',
    category: 'Integrations',
    icon: Globe,
    readTime: '10 min',
    difficulty: 'Intermediate',
    popular: false,
    lastUpdated: '2024-01-03',
    tags: ['webhooks', 'notifications', 'real-time'],
  },
  {
    id: 8,
    title: 'Common Issues & Solutions',
    description: 'Troubleshoot common problems and find quick solutions',
    category: 'Troubleshooting',
    icon: Lightbulb,
    readTime: '7 min',
    difficulty: 'Beginner',
    popular: true,
    lastUpdated: '2024-01-14',
    tags: ['troubleshooting', 'issues', 'solutions'],
  },
];

const quickLinks = [
  {
    title: 'Installation Guide',
    description: 'Step-by-step installation instructions',
    icon: Download,
    href: '/docs/installation',
  },
  {
    title: 'API Explorer',
    description: 'Interactive API documentation',
    icon: Terminal,
    href: '/docs/api-explorer',
  },
  {
    title: 'Code Examples',
    description: 'Ready-to-use code snippets',
    icon: Code,
    href: '/docs/examples',
  },
  {
    title: 'Video Tutorials',
    description: 'Learn with step-by-step videos',
    icon: Video,
    href: '/docs/videos',
  },
  {
    title: 'Community Forum',
    description: 'Get help from the community',
    icon: Users,
    href: '/community',
  },
  {
    title: 'GitHub Repository',
    description: 'View source code and examples',
    icon: Github,
    href: 'https://github.com/xflowup',
  },
];

const popularGuides = [
  {
    title: 'Building Your First Dashboard',
    description: 'Create a comprehensive analytics dashboard from scratch',
    readTime: '15 min',
    views: '12.5K',
    rating: 4.9,
  },
  {
    title: 'Advanced Data Filtering',
    description: 'Master complex data filtering and segmentation techniques',
    readTime: '12 min',
    views: '8.2K',
    rating: 4.8,
  },
  {
    title: 'Real-time Analytics Setup',
    description: 'Configure real-time data streaming and live updates',
    readTime: '18 min',
    views: '6.7K',
    rating: 4.7,
  },
  {
    title: 'Custom Metrics & KPIs',
    description: 'Define and track custom business metrics',
    readTime: '10 min',
    views: '9.1K',
    rating: 4.9,
  },
];

export default function DocsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = documentationSections.filter(doc => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

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
                  <BookOpen className="mr-2 h-3 w-3" />
                  Documentation & Guides
                </Badge>
                <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                  Learn XFlowUp
                  <br />
                  Inside and Out
                </h1>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Comprehensive documentation, tutorials, and guides to help you master XFlowUp.
                  From quick start to advanced integrations.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => router.push('/docs/getting-started')}>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Tutorial
                </Button>
              </div>
            </ScrollAnimation>
          </section>
        </div>

        {/* Search Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-8 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
                  />
                </div>
              </div>
            </ScrollAnimation>
          </section>
        </div>

        {/* Quick Links */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Quick Access
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Jump straight to what you need most.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quickLinks.map((link, index) => (
                <ScrollAnimation key={link.title} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <link.icon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <CardTitle className="text-lg">{link.title}</CardTitle>
                        <CardDescription>{link.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Access
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </section>
        </div>

        {/* Popular Guides */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Popular Guides
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Most viewed and highest rated tutorials from our community.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
              {popularGuides.map((guide, index) => (
                <ScrollAnimation key={guide.title} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-primary text-primary-foreground">
                            <Star className="mr-1 h-3 w-3" />
                            Popular
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {guide.readTime}
                          </div>
                        </div>
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{guide.rating}</span>
                            </div>
                            <span>{guide.views} views</span>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          Read Guide
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

        {/* Documentation Categories */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Browse Documentation
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Find exactly what you're looking for with our organized documentation.
                </p>
              </div>
            </ScrollAnimation>

            {/* Category Filter */}
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-wrap gap-2 justify-center">
                {docCategories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <Layers className="mr-2 h-3 w-3" />
                    {category}
                  </Button>
                ))}
              </div>
            </ScrollAnimation>

            {/* Documentation Grid */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocs.map((doc, index) => (
                <ScrollAnimation key={doc.id} delay={index * 0.05}>
                  <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <doc.icon className="h-4 w-4 text-primary" />
                            </div>
                            {doc.popular && (
                              <Badge variant="secondary" className="text-xs">
                                <Star className="mr-1 h-3 w-3" />
                                Popular
                              </Badge>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {doc.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <CardDescription className="text-sm">{doc.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>{doc.readTime}</span>
                          </div>
                          <Badge className={`text-xs ${getDifficultyColor(doc.difficulty)}`}>
                            {doc.difficulty}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {doc.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          Updated {doc.lastUpdated}
                        </div>

                        <Button variant="outline" className="w-full">
                          Read Documentation
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

        {/* Support Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Need More Help?
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              <ScrollAnimation delay={0.1}>
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto p-3 rounded-lg bg-primary/10 w-fit mb-4">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Live Chat Support</CardTitle>
                    <CardDescription>Get instant help from our support team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      Start Chat
                      <MessageCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation delay={0.2}>
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto p-3 rounded-lg bg-primary/10 w-fit mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Community Forum</CardTitle>
                    <CardDescription>Connect with other developers and users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Join Community
                      <Users className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation delay={0.3}>
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto p-3 rounded-lg bg-primary/10 w-fit mb-4">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Submit Ticket</CardTitle>
                    <CardDescription>Report issues or request new features</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Create Ticket
                      <FileText className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Follow our quick start guide and have XFlowUp running in minutes.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => router.push('/docs/getting-started')}>
                  Start Building
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push('/contact')}>
                  Contact Sales
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download SDK
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
