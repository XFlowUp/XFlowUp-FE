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
  Play,
  Download,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

const products = [
  {
    id: '1',
    name: 'XFlow Analytics Pro',
    description:
      'Advanced analytics platform with AI-powered insights and real-time data visualization.',
    longDescription:
      'XFlow Analytics Pro is a comprehensive analytics platform that leverages artificial intelligence to provide deep insights into your business data. With real-time processing capabilities and intuitive dashboards, you can make data-driven decisions faster than ever before.',
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
    detailedFeatures: [
      {
        title: 'Real-time Data Processing',
        description:
          'Process millions of data points in real-time with our advanced streaming architecture.',
        icon: Zap,
      },
      {
        title: 'AI-Powered Insights',
        description:
          'Machine learning algorithms automatically detect patterns and anomalies in your data.',
        icon: Brain,
      },
      {
        title: 'Custom Dashboards',
        description: 'Build beautiful, interactive dashboards with drag-and-drop simplicity.',
        icon: BarChart3,
      },
      {
        title: 'Advanced Reporting',
        description: 'Generate comprehensive reports with automated scheduling and distribution.',
        icon: Globe,
      },
    ],
    specifications: {
      'Data Processing': 'Up to 1M events/second',
      Storage: 'Unlimited data retention',
      'API Calls': '100K requests/month',
      Users: 'Up to 50 team members',
      Support: '24/7 priority support',
      SLA: '99.9% uptime guarantee',
    },
    testimonials: [
      {
        name: 'Sarah Johnson',
        role: 'Data Director at TechCorp',
        content:
          'XFlow Analytics Pro transformed how we handle data. The AI insights are incredibly accurate.',
        rating: 5,
      },
      {
        name: 'Michael Chen',
        role: 'CTO at StartupXYZ',
        content: 'The real-time processing capabilities are unmatched. Highly recommended!',
        rating: 5,
      },
    ],
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
    ],
  },
  {
    id: '2',
    name: 'XFlow Security Suite',
    description: 'Comprehensive security solution with advanced threat detection and prevention.',
    longDescription:
      'XFlow Security Suite provides enterprise-grade security with advanced threat detection, real-time monitoring, and automated response capabilities. Protect your infrastructure with our comprehensive security platform.',
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
    detailedFeatures: [
      {
        title: 'Advanced Threat Detection',
        description:
          'AI-powered threat detection that identifies and blocks sophisticated attacks.',
        icon: Shield,
      },
      {
        title: 'Real-time Monitoring',
        description:
          '24/7 monitoring of your infrastructure with instant alerts and notifications.',
        icon: Globe,
      },
      {
        title: 'Automated Responses',
        description: 'Automated incident response to contain and mitigate threats immediately.',
        icon: Zap,
      },
      {
        title: 'Compliance Reporting',
        description: 'Comprehensive compliance reports for SOC 2, GDPR, and other standards.',
        icon: Lock,
      },
    ],
    specifications: {
      'Threat Detection': 'AI-powered with 99.9% accuracy',
      Monitoring: '24/7 real-time monitoring',
      'Response Time': 'Sub-second automated response',
      Compliance: 'SOC 2, GDPR, HIPAA ready',
      Integration: '500+ security tools',
      Support: 'Dedicated security experts',
    },
    testimonials: [
      {
        name: 'David Wilson',
        role: 'CISO at FinanceFlow',
        content: "The threat detection accuracy is phenomenal. We've prevented multiple attacks.",
        rating: 5,
      },
      {
        name: 'Lisa Rodriguez',
        role: 'Security Manager at HealthTech',
        content: 'Compliance reporting made our audit process seamless. Excellent product!',
        rating: 5,
      },
    ],
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
    ],
  },
  // Add more products as needed
];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const product = products.find(p => p.id === params.id);

  if (!product) {
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
              <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
              <Button onClick={() => router.push('/products')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
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
            <Button variant="ghost" onClick={() => router.push('/products')} className="self-start">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </section>
        </div>

        {/* Hero Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <ScrollAnimation>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <product.icon className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary">{product.category}</Badge>
                    {product.featured && (
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="mr-1 h-3 w-3" />
                        Popular
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    {product.name}
                  </h1>

                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {product.longDescription}
                  </p>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{product.price}</span>
                    <span className="text-muted-foreground text-lg">{product.period}</span>
                  </div>

                  <div className="flex gap-4">
                    <Button size="lg" onClick={() => router.push('/dashboard')}>
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Play className="mr-2 h-4 w-4" />
                      Watch Demo
                    </Button>
                    <Button variant="outline" size="lg">
                      <MessageCircle
                        className="mr-2 h-4 w-4"
                        onClick={() => router.push('/contact')}
                      />
                      Contact Sales
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
                      src={product.screenshots[activeScreenshot]}
                      alt={`${product.name} screenshot`}
                      className="w-full h-auto"
                    />
                  </motion.div>

                  {product.screenshots.length > 1 && (
                    <div className="flex gap-2 mt-4 justify-center">
                      {product.screenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveScreenshot(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === activeScreenshot ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </ScrollAnimation>
            </div>
          </section>
        </div>

        {/* Detailed Information */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <Tabs defaultValue="features" className="w-full max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {product.detailedFeatures.map((feature, index) => (
                      <ScrollAnimation key={feature.title} delay={index * 0.1}>
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <feature.icon className="h-6 w-6 text-primary" />
                              </div>
                              <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                          </CardContent>
                        </Card>
                      </ScrollAnimation>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="specifications" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Technical Specifications</CardTitle>
                      <CardDescription>
                        Detailed technical specifications for {product.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center p-4 rounded-lg border"
                          >
                            <span className="font-medium">{key}</span>
                            <span className="text-muted-foreground">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="testimonials" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {product.testimonials.map((testimonial, index) => (
                      <ScrollAnimation key={testimonial.name} delay={index * 0.1}>
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <CardDescription>{testimonial.role}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                          </CardContent>
                        </Card>
                      </ScrollAnimation>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing Details</CardTitle>
                      <CardDescription>Everything included in {product.name}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">{product.price}</span>
                        <span className="text-muted-foreground text-lg">{product.period}</span>
                      </div>

                      <ul className="space-y-3">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-4 pt-6">
                        <Button
                          size="lg"
                          className="flex-1"
                          onClick={() => router.push('/dashboard')}
                        >
                          Start Free Trial
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="lg">
                          <Phone className="mr-2 h-4 w-4" onClick={() => router.push('/contact')} />
                          Contact Sales
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
                  Ready to Get Started?
                </h2>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Join thousands of companies already using {product.name} to transform their
                  business operations.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => router.push('/dashboard')}>
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download Brochure
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
