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
  Building2,
  ShoppingCart,
  Stethoscope,
  GraduationCap,
  Landmark,
  Factory,
  Truck,
  Briefcase,
  TrendingUp,
  Users,
  Shield,
  Zap,
  BarChart3,
  Globe,
  CheckCircle,
  Star,
  Quote,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const useCases = [
  {
    id: 1,
    title: 'E-commerce & Retail',
    description:
      'Transform your retail operations with AI-powered analytics and customer insights.',
    icon: ShoppingCart,
    industry: 'Retail',
    featured: true,
    benefits: [
      'Increase sales by 35% with personalized recommendations',
      'Reduce cart abandonment by 25%',
      'Optimize inventory management',
      'Real-time customer behavior analytics',
    ],
    metrics: {
      'Revenue Growth': '+35%',
      'Customer Retention': '+40%',
      'Operational Efficiency': '+50%',
    },
    testimonial: {
      name: 'Sarah Chen',
      role: 'VP of Digital at RetailCorp',
      content:
        'XFlowUp helped us increase our online sales by 35% in just 6 months. The customer insights are incredible.',
      rating: 5,
    },
    image: '/api/placeholder/600/400',
  },
  {
    id: 2,
    title: 'Healthcare & Medical',
    description: 'Improve patient outcomes with secure, compliant healthcare analytics solutions.',
    icon: Stethoscope,
    industry: 'Healthcare',
    featured: false,
    benefits: [
      'HIPAA-compliant data processing',
      'Predictive health analytics',
      'Patient flow optimization',
      'Clinical decision support',
    ],
    metrics: {
      'Patient Satisfaction': '+45%',
      'Operational Costs': '-30%',
      'Diagnosis Accuracy': '+25%',
    },
    testimonial: {
      name: 'Dr. Michael Rodriguez',
      role: 'Chief Medical Officer at HealthTech',
      content:
        'The predictive analytics have revolutionized how we approach patient care. Truly game-changing.',
      rating: 5,
    },
    image: '/api/placeholder/600/400',
  },
  {
    id: 3,
    title: 'Financial Services',
    description:
      'Enhance risk management and customer experience with advanced financial analytics.',
    icon: Landmark,
    industry: 'Finance',
    featured: true,
    benefits: [
      'Real-time fraud detection',
      'Risk assessment automation',
      'Regulatory compliance reporting',
      'Customer lifetime value optimization',
    ],
    metrics: {
      'Fraud Reduction': '-60%',
      'Processing Speed': '+80%',
      'Compliance Score': '99.9%',
    },
    testimonial: {
      name: 'Jennifer Walsh',
      role: 'Risk Director at FinanceFlow',
      content: "Our fraud detection improved dramatically. We've prevented millions in losses.",
      rating: 5,
    },
    image: '/api/placeholder/600/400',
  },
  {
    id: 4,
    title: 'Education & Learning',
    description:
      'Personalize learning experiences and improve educational outcomes with data insights.',
    icon: GraduationCap,
    industry: 'Education',
    featured: false,
    benefits: [
      'Personalized learning paths',
      'Student performance analytics',
      'Resource optimization',
      'Engagement tracking',
    ],
    metrics: {
      'Student Success': '+30%',
      'Engagement Rate': '+55%',
      'Resource Efficiency': '+40%',
    },
    testimonial: {
      name: 'Prof. David Kim',
      role: 'Dean at TechUniversity',
      content:
        "Student outcomes have improved significantly since implementing XFlowUp's analytics platform.",
      rating: 5,
    },
    image: '/api/placeholder/600/400',
  },
  {
    id: 5,
    title: 'Manufacturing & Industry',
    description: 'Optimize production processes and reduce downtime with industrial IoT analytics.',
    icon: Factory,
    industry: 'Manufacturing',
    featured: false,
    benefits: [
      'Predictive maintenance',
      'Quality control automation',
      'Supply chain optimization',
      'Energy efficiency monitoring',
    ],
    metrics: {
      'Downtime Reduction': '-45%',
      'Quality Improvement': '+35%',
      'Energy Savings': '-25%',
    },
    testimonial: {
      name: 'Robert Johnson',
      role: 'Operations Manager at ManufactureCorp',
      content: 'Predictive maintenance has saved us millions in downtime costs. Exceptional ROI.',
      rating: 5,
    },
    image: '/api/placeholder/600/400',
  },
  {
    id: 6,
    title: 'Logistics & Transportation',
    description:
      'Streamline supply chain operations and optimize delivery routes with smart logistics.',
    icon: Truck,
    industry: 'Logistics',
    featured: false,
    benefits: [
      'Route optimization',
      'Fleet management',
      'Delivery tracking',
      'Cost reduction analytics',
    ],
    metrics: {
      'Delivery Speed': '+25%',
      'Fuel Savings': '-20%',
      'Customer Satisfaction': '+40%',
    },
    testimonial: {
      name: 'Maria Garcia',
      role: 'Logistics Director at ShipFast',
      content: 'Route optimization alone saved us 20% on fuel costs. The ROI was immediate.',
      rating: 5,
    },
    image: '/api/placeholder/600/400',
  },
];

const industries = [
  'All',
  'Retail',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Logistics',
];

export default function UseCasesPage() {
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
          <section className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <Badge variant="outline" className="mb-4">
                  <Briefcase className="mr-2 h-3 w-3" />
                  Use Cases & Industries
                </Badge>
                <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                  Transforming Industries
                  <br />
                  Across the Globe
                </h1>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Discover how businesses across different industries are leveraging XFlowUp to
                  drive growth, improve efficiency, and deliver exceptional customer experiences.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => router.push('/dashboard')}>
                  Start Your Journey
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
              <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Industries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">85%</div>
                  <div className="text-sm text-muted-foreground">Average ROI Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Expert Support</div>
                </div>
              </div>
            </ScrollAnimation>
          </section>
        </div>

        {/* Use Cases Grid */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Industry Solutions
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Tailored solutions for every industry, backed by proven results and expert
                  support.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((useCase, index) => (
                <ScrollAnimation key={useCase.id} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card
                      className={`h-full relative overflow-hidden ${useCase.featured ? 'ring-2 ring-primary' : ''}`}
                    >
                      {useCase.featured && (
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
                            <useCase.icon className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant="secondary">{useCase.industry}</Badge>
                        </div>
                        <CardTitle className="text-xl">{useCase.title}</CardTitle>
                        <CardDescription className="text-sm">{useCase.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Key Benefits:</h4>
                          <ul className="space-y-1">
                            {useCase.benefits.slice(0, 3).map((benefit, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-1 gap-2 pt-2">
                          {Object.entries(useCase.metrics)
                            .slice(0, 2)
                            .map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">{key}:</span>
                                <span className="font-semibold text-primary">{value}</span>
                              </div>
                            ))}
                        </div>

                        <Button
                          className="w-full mt-6"
                          variant={useCase.featured ? 'default' : 'outline'}
                          onClick={() => router.push(`/use-cases/${useCase.id}`)}
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

        {/* Success Stories */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Success Stories
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Real results from real customers across different industries.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {useCases.slice(0, 3).map((useCase, index) => (
                <ScrollAnimation key={useCase.id} delay={index * 0.1}>
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Quote className="h-4 w-4 text-primary" />
                          {[...Array(useCase.testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <CardDescription className="italic">
                          "{useCase.testimonial.content}"
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <useCase.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{useCase.testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {useCase.testimonial.role}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </section>
        </div>

        {/* Why Choose XFlowUp */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Why Industry Leaders Choose XFlowUp
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  The platform trusted by businesses worldwide for digital transformation.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: TrendingUp,
                  title: 'Proven Results',
                  description: 'Average 85% ROI increase across all industries and use cases',
                },
                {
                  icon: Users,
                  title: 'Expert Support',
                  description:
                    'Dedicated industry specialists to guide your transformation journey',
                },
                {
                  icon: Shield,
                  title: 'Enterprise Security',
                  description: 'Bank-level security with industry-specific compliance standards',
                },
                {
                  icon: Zap,
                  title: 'Rapid Deployment',
                  description:
                    'Get up and running in days, not months, with our proven methodology',
                },
                {
                  icon: BarChart3,
                  title: 'Advanced Analytics',
                  description: 'AI-powered insights tailored to your industry and business model',
                },
                {
                  icon: Globe,
                  title: 'Global Scale',
                  description: 'Scalable solutions that grow with your business across markets',
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
                  Ready to Transform Your Industry?
                </h2>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Join thousands of industry leaders who have already transformed their operations
                  with XFlowUp. Start your journey today.
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
                  Schedule Consultation
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
