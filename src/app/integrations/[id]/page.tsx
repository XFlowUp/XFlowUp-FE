'use client';

import MouseMoveEffect from '@/components/mouse-move-effect';
import { Header } from '@/components/landing_page/header';
import Footer from '@/components/landing_page/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollAnimation } from '@/components/animations/scroll-animation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Star,
  ExternalLink,
  Download,
  Play,
  MessageCircle,
  Clock,
  Users,
  Shield,
  Zap,
  Settings,
  Code,
  BookOpen,
  Quote,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';

const integrations = [
  {
    id: '1',
    name: 'Google Analytics',
    description: 'Connect your Google Analytics data for comprehensive web analytics insights.',
    longDescription:
      'Google Analytics integration provides deep insights into your website performance, user behavior, and conversion tracking. Seamlessly sync your GA data with XFlowUp to create unified dashboards and advanced reporting capabilities.',
    category: 'Analytics',
    logo: '/api/placeholder/120/120',
    featured: true,
    verified: true,
    rating: 4.9,
    installs: '50K+',
    setupTime: '5 min',
    pricing: 'Free',
    developer: 'Google LLC',
    lastUpdated: '2024-01-15',
    features: [
      'Real-time data sync',
      'Custom dashboard widgets',
      'Advanced reporting',
      'Goal tracking integration',
      'E-commerce tracking',
      'Audience segmentation',
      'Custom dimensions',
      'Attribution modeling',
    ],
    benefits: [
      'Unified analytics view',
      'Automated reporting',
      'Enhanced data visualization',
      'Cross-platform insights',
      'Improved decision making',
      'Time-saving automation',
    ],
    setupSteps: [
      'Connect your Google Analytics account',
      'Select the properties you want to sync',
      'Configure data refresh intervals',
      'Set up custom dashboards',
      'Test the integration',
    ],
    requirements: [
      'Google Analytics account with admin access',
      'Active website with GA tracking code',
      'XFlowUp Pro plan or higher',
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'Marketing Director at TechCorp',
        content:
          'The Google Analytics integration saved us hours of manual reporting. The unified dashboard is incredible.',
        rating: 5,
        company: 'TechCorp',
      },
      {
        name: 'Mike Chen',
        role: 'Data Analyst at StartupXYZ',
        content:
          'Real-time sync and custom widgets make data analysis so much easier. Highly recommended!',
        rating: 5,
        company: 'StartupXYZ',
      },
    ],
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
    ],
    documentation: {
      gettingStarted: '/docs/integrations/google-analytics/getting-started',
      apiReference: '/docs/integrations/google-analytics/api',
      troubleshooting: '/docs/integrations/google-analytics/troubleshooting',
    },
  },
  {
    id: '2',
    name: 'Salesforce CRM',
    description: 'Seamlessly integrate with Salesforce to sync customer data and sales metrics.',
    longDescription:
      'Salesforce CRM integration enables bi-directional data sync between your CRM and XFlowUp analytics platform. Track sales performance, lead conversion, and customer lifecycle metrics in real-time.',
    category: 'CRM',
    logo: '/api/placeholder/120/120',
    featured: true,
    verified: true,
    rating: 4.8,
    installs: '25K+',
    setupTime: '10 min',
    pricing: 'Premium',
    developer: 'Salesforce Inc.',
    lastUpdated: '2024-01-10',
    features: [
      'Bi-directional sync',
      'Lead scoring integration',
      'Pipeline analytics',
      'Custom field mapping',
      'Opportunity tracking',
      'Contact management',
      'Sales forecasting',
      'Activity logging',
    ],
    benefits: [
      'Streamlined sales process',
      'Better lead management',
      'Improved conversion tracking',
      'Enhanced customer insights',
      'Automated data entry',
      'Real-time sales metrics',
    ],
    setupSteps: [
      'Authenticate with Salesforce',
      'Map custom fields and objects',
      'Configure sync preferences',
      'Set up automated workflows',
      'Test data synchronization',
    ],
    requirements: [
      'Salesforce Professional edition or higher',
      'API access enabled',
      'XFlowUp Enterprise plan',
    ],
    testimonials: [
      {
        name: 'Jennifer Walsh',
        role: 'Sales Manager at SalesForce Pro',
        content:
          'Our sales team productivity increased by 40% after implementing this integration.',
        rating: 5,
        company: 'SalesForce Pro',
      },
    ],
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
    ],
    documentation: {
      gettingStarted: '/docs/integrations/salesforce/getting-started',
      apiReference: '/docs/integrations/salesforce/api',
      troubleshooting: '/docs/integrations/salesforce/troubleshooting',
    },
  },
  // Add more integrations as needed
];

export default function IntegrationDetailPage() {
  const router = useRouter();
  const params = useParams();

  const integration = integrations.find(int => int.id === params.id);

  if (!integration) {
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
          <div className="flex w-full items-center justify-center flex-1">
            <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center">
              <h1 className="text-2xl font-bold mb-4">Integration Not Found</h1>
              <Button onClick={() => router.push('/integrations')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Integrations
              </Button>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

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

        {/* Navigation */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-8 md:px-6">
            <Button
              variant="ghost"
              onClick={() => router.push('/integrations')}
              className="self-start"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Integrations
            </Button>
          </section>
        </div>

        {/* Hero Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <ScrollAnimation>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={integration.logo}
                      alt={integration.name}
                      className="w-16 h-16 rounded-lg"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{integration.category}</Badge>
                        {integration.verified && (
                          <Badge variant="secondary">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                        {integration.featured && (
                          <Badge className="bg-primary text-primary-foreground">
                            <Star className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{integration.rating}</span>
                        </div>
                        <span>{integration.installs} installs</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{integration.setupTime} setup</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    {integration.name}
                  </h1>

                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {integration.longDescription}
                  </p>

                  <div className="flex gap-4">
                    <Button size="lg">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Connect Now
                    </Button>
                    <Button variant="outline" size="lg">
                      <Play className="mr-2 h-4 w-4" />
                      Watch Demo
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => router.push('/contact')}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Get Support
                    </Button>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay={0.2}>
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-lg overflow-hidden border bg-card shadow-2xl"
                  >
                    <img
                      src={integration.screenshots[0]}
                      alt={`${integration.name} dashboard`}
                      className="w-full h-auto"
                    />
                  </motion.div>
                </div>
              </ScrollAnimation>
            </div>
          </section>
        </div>

        {/* Integration Info */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center p-6 rounded-lg border bg-card">
                  <div className="text-2xl font-bold text-primary mb-2">{integration.pricing}</div>
                  <div className="text-sm text-muted-foreground">Pricing</div>
                </div>
                <div className="text-center p-6 rounded-lg border bg-card">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {integration.setupTime}
                  </div>
                  <div className="text-sm text-muted-foreground">Setup Time</div>
                </div>
                <div className="text-center p-6 rounded-lg border bg-card">
                  <div className="text-2xl font-bold text-primary mb-2">{integration.installs}</div>
                  <div className="text-sm text-muted-foreground">Active Installs</div>
                </div>
                <div className="text-center p-6 rounded-lg border bg-card">
                  <div className="text-2xl font-bold text-primary mb-2">{integration.rating}</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
              </div>
            </ScrollAnimation>
          </section>
        </div>

        {/* Detailed Information */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <Tabs defaultValue="features" className="w-full max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="setup">Setup Guide</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="testimonials">Reviews</TabsTrigger>
                  <TabsTrigger value="docs">Documentation</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-primary" />
                          Key Features
                        </CardTitle>
                        <CardDescription>
                          Powerful capabilities that make this integration essential
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {integration.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          Benefits
                        </CardTitle>
                        <CardDescription>
                          How this integration will improve your workflow
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {integration.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="setup" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-primary" />
                        Setup Guide
                      </CardTitle>
                      <CardDescription>Step-by-step instructions to get started</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-4">
                        {integration.setupSteps.map((step, index) => (
                          <li key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p>{step}</p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="requirements" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Requirements
                      </CardTitle>
                      <CardDescription>
                        What you need before setting up this integration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {integration.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Code className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Developer Info</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Developed by {integration.developer} • Last updated{' '}
                          {integration.lastUpdated}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="testimonials" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {integration.testimonials.map((testimonial, index) => (
                      <ScrollAnimation key={testimonial.name} delay={index * 0.1}>
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2 mb-2">
                              <Quote className="h-4 w-4 text-primary" />
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <CardDescription className="italic">
                              "{testimonial.content}"
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Users className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                <p className="text-xs text-muted-foreground">
                                  {testimonial.company}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </ScrollAnimation>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="docs" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <BookOpen className="h-5 w-5 text-primary" />
                          Getting Started
                        </CardTitle>
                        <CardDescription>Quick start guide and basic setup</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Guide
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Code className="h-5 w-5 text-primary" />
                          API Reference
                        </CardTitle>
                        <CardDescription>Complete API documentation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Docs
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <MessageCircle className="h-5 w-5 text-primary" />
                          Troubleshooting
                        </CardTitle>
                        <CardDescription>Common issues and solutions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Get Help
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollAnimation>
          </section>
        </div>

        {/* CTA Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
                  Ready to Connect {integration.name}?
                </h2>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Start integrating {integration.name} with XFlowUp today and unlock powerful
                  insights.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Connect Integration
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download Guide
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
