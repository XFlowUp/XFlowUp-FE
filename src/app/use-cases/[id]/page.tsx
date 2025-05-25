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
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Quote,
  Download,
  Play,
  MessageCircle,
  ShoppingCart,
  Stethoscope,
  Landmark,
  GraduationCap,
  Factory,
  Truck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';

const useCases = [
  {
    id: '1',
    title: 'E-commerce & Retail',
    description:
      'Transform your retail operations with AI-powered analytics and customer insights.',
    longDescription:
      "In today's competitive retail landscape, understanding customer behavior and optimizing operations is crucial for success. Our E-commerce & Retail solution leverages advanced AI and machine learning to provide deep insights into customer preferences, inventory optimization, and sales forecasting.",
    icon: ShoppingCart,
    industry: 'Retail',
    featured: true,
    benefits: [
      'Increase sales by 35% with personalized recommendations',
      'Reduce cart abandonment by 25%',
      'Optimize inventory management',
      'Real-time customer behavior analytics',
      'Dynamic pricing optimization',
      'Cross-selling and upselling automation',
    ],
    detailedFeatures: [
      {
        title: 'Customer Analytics',
        description: 'Deep insights into customer behavior, preferences, and purchasing patterns.',
        icon: Users,
      },
      {
        title: 'Inventory Optimization',
        description: 'AI-powered inventory management to reduce costs and prevent stockouts.',
        icon: BarChart3,
      },
      {
        title: 'Sales Forecasting',
        description: 'Accurate sales predictions to optimize planning and resource allocation.',
        icon: TrendingUp,
      },
      {
        title: 'Personalization Engine',
        description: 'Deliver personalized experiences that increase conversion rates.',
        icon: Target,
      },
    ],
    metrics: {
      'Revenue Growth': '+35%',
      'Customer Retention': '+40%',
      'Operational Efficiency': '+50%',
      'Cart Abandonment Reduction': '-25%',
      'Inventory Turnover': '+30%',
      'Customer Satisfaction': '+45%',
    },
    testimonials: [
      {
        name: 'Sarah Chen',
        role: 'VP of Digital at RetailCorp',
        content:
          'XFlowUp helped us increase our online sales by 35% in just 6 months. The customer insights are incredible.',
        rating: 5,
      },
      {
        name: 'Mark Thompson',
        role: 'E-commerce Director at FashionForward',
        content:
          'The personalization engine transformed our customer experience. Conversion rates are through the roof.',
        rating: 5,
      },
    ],
    caseStudy: {
      company: 'RetailCorp',
      challenge: 'Struggling with high cart abandonment rates and inefficient inventory management',
      solution: "Implemented XFlowUp's AI-powered analytics and personalization engine",
      results: [
        '35% increase in online sales',
        '25% reduction in cart abandonment',
        '50% improvement in inventory turnover',
        '$2.5M additional revenue in first year',
      ],
    },
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
    ],
  },
  {
    id: '2',
    title: 'Healthcare & Medical',
    description: 'Improve patient outcomes with secure, compliant healthcare analytics solutions.',
    longDescription:
      'Healthcare organizations face unique challenges in managing patient data, ensuring compliance, and improving outcomes. Our Healthcare & Medical solution provides HIPAA-compliant analytics that help healthcare providers make better decisions, optimize operations, and enhance patient care.',
    icon: Stethoscope,
    industry: 'Healthcare',
    featured: false,
    benefits: [
      'HIPAA-compliant data processing',
      'Predictive health analytics',
      'Patient flow optimization',
      'Clinical decision support',
      'Resource allocation optimization',
      'Quality metrics tracking',
    ],
    detailedFeatures: [
      {
        title: 'Predictive Analytics',
        description: 'AI-powered predictions for patient outcomes and health risks.',
        icon: TrendingUp,
      },
      {
        title: 'Patient Flow Management',
        description: 'Optimize patient flow and reduce wait times across facilities.',
        icon: Users,
      },
      {
        title: 'Clinical Decision Support',
        description: 'Data-driven insights to support clinical decision making.',
        icon: Target,
      },
      {
        title: 'Compliance Monitoring',
        description: 'Automated compliance tracking and reporting for regulatory requirements.',
        icon: BarChart3,
      },
    ],
    metrics: {
      'Patient Satisfaction': '+45%',
      'Operational Costs': '-30%',
      'Diagnosis Accuracy': '+25%',
      'Wait Time Reduction': '-40%',
      'Resource Utilization': '+35%',
      'Compliance Score': '99.9%',
    },
    testimonials: [
      {
        name: 'Dr. Michael Rodriguez',
        role: 'Chief Medical Officer at HealthTech',
        content:
          'The predictive analytics have revolutionized how we approach patient care. Truly game-changing.',
        rating: 5,
      },
    ],
    caseStudy: {
      company: 'HealthTech Medical Center',
      challenge: 'Long patient wait times and inefficient resource allocation',
      solution: "Deployed XFlowUp's healthcare analytics platform with predictive capabilities",
      results: [
        '45% increase in patient satisfaction',
        '40% reduction in wait times',
        '30% decrease in operational costs',
        'Improved clinical outcomes across all departments',
      ],
    },
    screenshots: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
    ],
  },
  // Add more use cases as needed
];

export default function UseCaseDetailPage() {
  const router = useRouter();
  const params = useParams();

  const useCase = useCases.find(uc => uc.id === params.id);

  if (!useCase) {
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
              <h1 className="text-2xl font-bold mb-4">Use Case Not Found</h1>
              <Button onClick={() => router.push('/use-cases')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Use Cases
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
              onClick={() => router.push('/use-cases')}
              className="self-start"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Use Cases
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
                      <useCase.icon className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary">{useCase.industry}</Badge>
                    {useCase.featured && (
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="mr-1 h-3 w-3" />
                        Popular
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                    {useCase.title}
                  </h1>

                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {useCase.longDescription}
                  </p>

                  <div className="flex gap-4">
                    <Button size="lg" onClick={() => router.push('/dashboard')}>
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Play className="mr-2 h-4 w-4" />
                      Watch Demo
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => router.push('/contact')}>
                      <MessageCircle className="mr-2 h-4 w-4" />
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
                      src={useCase.screenshots[0]}
                      alt={`${useCase.title} dashboard`}
                      className="w-full h-auto"
                    />
                  </motion.div>
                </div>
              </ScrollAnimation>
            </div>
          </section>
        </div>

        {/* Key Metrics */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Proven Results
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Real metrics from companies using our {useCase.industry.toLowerCase()} solutions.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-3">
              {Object.entries(useCase.metrics).map(([key, value], index) => (
                <ScrollAnimation key={key} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="text-center p-6 rounded-lg border bg-card"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{value}</div>
                    <div className="text-sm text-muted-foreground">{key}</div>
                  </motion.div>
                </ScrollAnimation>
              ))}
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
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="case-study">Case Study</TabsTrigger>
                  <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                </TabsList>

                <TabsContent value="features" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {useCase.detailedFeatures.map((feature, index) => (
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

                <TabsContent value="benefits" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Benefits</CardTitle>
                      <CardDescription>
                        How {useCase.title} solutions drive business value
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {useCase.benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-4 rounded-lg border"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="case-study" className="mt-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Success Story: {useCase.caseStudy.company}</CardTitle>
                      <CardDescription>Real-world implementation and results</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">Challenge</h4>
                        <p className="text-muted-foreground">{useCase.caseStudy.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Solution</h4>
                        <p className="text-muted-foreground">{useCase.caseStudy.solution}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Results</h4>
                        <ul className="space-y-2">
                          {useCase.caseStudy.results.map((result, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="testimonials" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {useCase.testimonials.map((testimonial, index) => (
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
                                <useCase.icon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </ScrollAnimation>
                    ))}
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
                  Ready to Transform Your {useCase.industry}?
                </h2>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Join industry leaders who are already using XFlowUp to drive growth and
                  innovation.
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
                  Download Case Study
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
