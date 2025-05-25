'use client';

import MouseMoveEffect from '@/components/mouse-move-effect';
import { Header } from '@/components/landing_page/header';
import Footer from '@/components/landing_page/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollAnimation } from '@/components/animations/scroll-animation';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Headphones,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                  Get in Touch
                </h1>
                <p className="mt-4 text-muted-foreground sm:text-lg">
                  Ready to transform your business? Our team of experts is here to help you get
                  started with XFlowUp. Reach out to us and let's discuss how we can accelerate your
                  growth.
                </p>
              </div>
            </ScrollAnimation>
          </section>
        </div>

        {/* Contact Methods */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Mail,
                  title: 'Email Us',
                  description: 'Send us an email anytime',
                  contact: 'hello@xflowup.com',
                  action: 'mailto:hello@xflowup.com',
                },
                {
                  icon: Phone,
                  title: 'Call Us',
                  description: 'Mon-Fri from 8am to 5pm',
                  contact: '+1 (555) 123-4567',
                  action: 'tel:+15551234567',
                },
                {
                  icon: MessageCircle,
                  title: 'Live Chat',
                  description: 'Chat with our support team',
                  contact: 'Start a conversation',
                  action: '#',
                },
                {
                  icon: MapPin,
                  title: 'Visit Us',
                  description: 'Come say hello at our office',
                  contact: '123 Business St, Tech City',
                  action: '#',
                },
              ].map((method, index) => (
                <ScrollAnimation key={method.title} delay={index * 0.1}>
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="text-center h-full">
                      <CardHeader>
                        <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <method.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{method.title}</CardTitle>
                        <CardDescription>{method.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <a
                          href={method.action}
                          className="text-primary hover:underline font-medium"
                        >
                          {method.contact}
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollAnimation>
              ))}
            </div>
          </section>
        </div>

        {/* Contact Form & Info */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <ScrollAnimation>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Company"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help?"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more about your project..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              {/* Company Info */}
              <ScrollAnimation delay={0.2}>
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">Why Choose XFlowUp?</CardTitle>
                      <CardDescription>
                        We're committed to helping businesses succeed with cutting-edge technology.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[
                        {
                          icon: Users,
                          title: 'Expert Team',
                          description:
                            'Our team of experienced professionals is dedicated to your success.',
                        },
                        {
                          icon: Headphones,
                          title: '24/7 Support',
                          description:
                            'Round-the-clock support to ensure your business never stops.',
                        },
                        {
                          icon: Globe,
                          title: 'Global Reach',
                          description: 'Serving customers worldwide with localized support.',
                        },
                      ].map((feature, index) => (
                        <div key={feature.title} className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <feature.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Office Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Monday - Friday</p>
                          <p className="text-sm text-muted-foreground">8:00 AM - 6:00 PM PST</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Saturday</p>
                          <p className="text-sm text-muted-foreground">9:00 AM - 2:00 PM PST</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Sunday</p>
                          <p className="text-sm text-muted-foreground">Closed</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollAnimation>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <div className="flex w-full items-center justify-center">
          <section className="container flex flex-col items-center justify-center space-y-16 px-4 py-16 md:px-6">
            <ScrollAnimation>
              <div className="mx-auto max-w-[58rem] text-center">
                <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground sm:text-lg">
                  Quick answers to questions you may have about our products and services.
                </p>
              </div>
            </ScrollAnimation>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              {[
                {
                  question: 'How quickly can I get started?',
                  answer:
                    'You can get started immediately with our free trial. Our onboarding process takes less than 5 minutes.',
                },
                {
                  question: 'Do you offer custom solutions?',
                  answer:
                    'Yes, we offer fully customized solutions for enterprise clients. Contact our sales team to discuss your specific needs.',
                },
                {
                  question: 'What kind of support do you provide?',
                  answer:
                    'We provide 24/7 support via email, chat, and phone. Enterprise customers get dedicated support representatives.',
                },
                {
                  question: 'Is there a free trial available?',
                  answer:
                    'Yes, we offer a 14-day free trial for all our products. No credit card required to get started.',
                },
                {
                  question: 'How secure is your platform?',
                  answer:
                    'We use enterprise-grade security with SOC 2 compliance, end-to-end encryption, and regular security audits.',
                },
                {
                  question: 'Can I integrate with existing tools?',
                  answer:
                    'Absolutely! We offer APIs and pre-built integrations with over 500 popular business tools and platforms.',
                },
              ].map((faq, index) => (
                <ScrollAnimation key={faq.question} delay={index * 0.1}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}
