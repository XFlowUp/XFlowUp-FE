'use client';

import MouseMoveEffect from '@/components/mouse-move-effect';
import { Header } from '@/components/landing_page/header';
import Footer from '@/components/landing_page/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollAnimation } from '@/components/animations/scroll-animation';
import {
  Users,
  Target,
  Award,
  Globe,
  ArrowRight,
  Lightbulb,
  Heart,
  Zap,
  Shield,
  Rocket,
  Star,
  TrendingUp,
  Building,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AboutPage() {
  const router = useRouter();

  const stats = [
    { label: 'Happy Customers', value: '50,000+', icon: Users },
    { label: 'Countries Served', value: '150+', icon: Globe },
    { label: 'Years of Experience', value: '10+', icon: Calendar },
    { label: 'Uptime Guarantee', value: '99.9%', icon: TrendingUp },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description:
        'We constantly push the boundaries of technology to deliver cutting-edge solutions that drive business growth.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description:
        'Our customers are at the heart of everything we do. Their success is our success, and we go above and beyond to ensure it.',
    },
    {
      icon: Shield,
      title: 'Security & Trust',
      description:
        'We maintain the highest standards of security and privacy, ensuring your data and business are always protected.',
    },
    {
      icon: Zap,
      title: 'Performance',
      description:
        'We deliver lightning-fast, reliable solutions that scale with your business needs and exceed expectations.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Executive Officer',
      bio: 'Former VP of Engineering at Google with 15+ years of experience in scaling technology companies.',
      image: '/api/placeholder/300/300',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      bio: 'Ex-Amazon architect who led the development of several cloud infrastructure platforms.',
      image: '/api/placeholder/300/300',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Chief Product Officer',
      bio: 'Product visionary with a track record of launching successful B2B SaaS products at scale.',
      image: '/api/placeholder/300/300',
    },
    {
      name: 'David Kim',
      role: 'Chief Security Officer',
      bio: 'Cybersecurity expert with extensive experience in enterprise security and compliance.',
      image: '/api/placeholder/300/300',
    },
  ];

  const milestones = [
    {
      year: '2014',
      title: 'Company Founded',
      description:
        'XFlowUp was founded with a vision to democratize enterprise-grade technology for businesses of all sizes.',
    },
    {
      year: '2016',
      title: 'First Product Launch',
      description:
        'Launched our first analytics platform, serving over 1,000 customers in the first year.',
    },
    {
      year: '2018',
      title: 'Series A Funding',
      description:
        'Raised $10M in Series A funding to expand our product suite and global presence.',
    },
    {
      year: '2020',
      title: 'Global Expansion',
      description: 'Expanded to serve customers in over 100 countries with localized support.',
    },
    {
      year: '2022',
      title: 'AI Integration',
      description:
        'Integrated advanced AI capabilities across all our products, revolutionizing business intelligence.',
    },
    {
      year: '2024',
      title: 'Industry Leader',
      description:
        'Recognized as a leader in the business intelligence and analytics space, serving 50,000+ customers.',
    },
  ];

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
                  <Building className="mr-2 h-3 w-3" />
                  About XFlowUp
                </Badge>
                <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                  Empowering Businesses
                  <br />
                  Through Technology
                </h1>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  We're on a mission to democratize enterprise-grade technology, making powerful
                  tools accessible to businesses of all sizes. Since 2014, we've been helping
                  companies transform their operations and accelerate growth through innovative
                  solutions.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => router.push('/contact')}>
                  Join Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push('/products')}>
                  Explore Products
                </Button>
              </div>
            </ScrollAnimation>
          </section>
        </div>

        {/* Stats Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <ScrollAnimation key={stat.label} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </section>
        </div>

        {/* Mission & Vision */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <ScrollAnimation>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">Our Mission</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      To democratize enterprise-grade technology and make powerful business tools
                      accessible to organizations of all sizes. We believe that every business,
                      regardless of its size, should have access to the same cutting-edge technology
                      that drives the world's most successful companies.
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation delay={0.2}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Rocket className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">Our Vision</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      To be the leading platform that empowers businesses worldwide to achieve their
                      full potential through innovative technology solutions. We envision a future
                      where technology barriers are eliminated, and every business can compete on a
                      level playing field.
                    </p>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>
          </section>
        </div>

        {/* Values */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Our Core Values
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  The principles that guide everything we do and shape our company culture.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              {values.map((value, index) => (
                <ScrollAnimation key={value.title} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <value.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-xl">{value.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </section>
        </div>

        {/* Timeline */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Our Journey
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Key milestones in our company's growth and evolution.
                </p>
              </div>
            </ScrollAnimation>

            <div className="relative max-w-5xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <ScrollAnimation key={milestone.year} delay={index * 0.1}>
                    <div
                      className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <div
                        className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}
                      >
                        <Card>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{milestone.year}</Badge>
                              <CardTitle className="text-lg">{milestone.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm">{milestone.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="relative z-10 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                      <div className="w-1/2"></div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Leadership Team */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Leadership Team
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Meet the experienced leaders driving our vision forward.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <ScrollAnimation key={member.name} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="text-center h-full">
                      <CardHeader>
                        <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-4">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          {member.role}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{member.bio}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </section>
        </div>

        {/* Awards & Recognition */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Awards & Recognition
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Industry recognition for our innovation and excellence.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  title: 'Best SaaS Platform 2024',
                  organization: 'TechCrunch Awards',
                  description: 'Recognized for innovation in business intelligence and analytics.',
                },
                {
                  title: 'Top 50 Startups to Watch',
                  organization: 'Forbes',
                  description: 'Featured in Forbes list of most promising technology companies.',
                },
                {
                  title: 'Customer Choice Award',
                  organization: 'Gartner',
                  description: 'Highest customer satisfaction rating in the analytics category.',
                },
              ].map((award, index) => (
                <ScrollAnimation key={award.title} delay={index * 0.1}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div className="mx-auto w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                        <Award className="h-6 w-6 text-yellow-500" />
                      </div>
                      <CardTitle className="text-lg">{award.title}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {award.organization}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{award.description}</p>
                    </CardContent>
                  </Card>
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
                  Ready to Join Our Journey?
                </h2>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Whether you're looking to transform your business or join our team, we'd love to
                  hear from you.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => router.push('/products')}>
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.push('/contact')}>
                  Contact Us
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
