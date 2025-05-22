'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/landing_page/header';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const GiftIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M20 12v10H4V12" />
      <path d="M2 7h20v5H2z" />
      <path d="M12 22V7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
};

export default function UpgradePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [plan, setPlan] = useState('hobby');

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam === 'pro' || planParam === 'hobby') {
      setPlan(planParam);
    } else {
      router.replace('/upgrade?plan=hobby');
    }
  }, [searchParams, router]);

  const switchPlan = () => {
    const newPlan = plan === 'hobby' ? 'pro' : 'hobby';
    router.push(`/upgrade?plan=${newPlan}`);
  };

  return (
    <div className="bg-white dark:bg-[#121212] text-gray-900 dark:text-white min-h-screen">
      <Header />

      <motion.main
        className="max-w-3xl mx-auto py-12 px-4 sm:px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-3">Subscribe to XFlowUp</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            Upgrade your resources, remove usage limits, and ship with ease. Choose the plan that's
            right for you.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={plan}
            className="mb-10"
            initial={{ opacity: 0, x: plan === 'hobby' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: plan === 'hobby' ? 20 : -20 }}
            transition={{ duration: 0.4 }}
          >
            {plan === 'hobby' ? (
              <motion.div
                className="relative overflow-hidden rounded-xl bg-white dark:bg-[#0F1524] border border-blue-200 dark:border-blue-900/50"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent dark:from-blue-500/20 dark:via-blue-400/10 dark:to-transparent"></div>

                <div className="relative p-8">
                  <Badge className="mb-4 bg-blue-600 dark:bg-[#4F8BFF]">Hobby Plan</Badge>

                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-600 dark:text-[#4F8BFF] mb-2">
                        Hobby
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        For individual developers and hobbyists working on personal projects.
                      </p>

                      <div className="flex items-baseline mb-6">
                        <span className="text-gray-500 dark:text-gray-400 text-xl">$</span>
                        <motion.span
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                          className="text-5xl font-bold text-blue-600 dark:text-[#4F8BFF]"
                        >
                          5
                        </motion.span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">/mo</span>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-[#4F8BFF] mb-4">
                        MINIMUM SPEND
                      </p>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={switchPlan}
                          className="mb-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          variant="link"
                        >
                          Need more? Switch to Pro
                        </Button>
                      </motion.div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-[#4F8BFF]">
                          <GiftIcon />
                        </div>
                        <p className="ml-3 text-sm text-blue-600 dark:text-[#4F8BFF]">
                          Includes $5 of usage monthly
                        </p>
                      </div>

                      {[
                        '8 GB RAM / 8 vCPU per service',
                        'Single developer workspace',
                        'Community Support',
                        '7-day log history',
                        'Global regions',
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                        >
                          <div className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-[#4F8BFF]">
                            <Check className="h-5 w-5" />
                          </div>
                          <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="relative overflow-hidden rounded-xl bg-white dark:bg-[#1A0F2E] border border-purple-200 dark:border-purple-900/50"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent dark:from-purple-500/20 dark:via-purple-400/10 dark:to-transparent"></div>

                <div className="relative p-8">
                  <Badge className="mb-4 bg-purple-600 dark:bg-[#A855F7]">Pro Plan</Badge>

                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                    <div>
                      <h2 className="text-2xl font-bold text-purple-600 dark:text-[#A855F7] mb-2">
                        Pro
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        For professional developers and teams shipping to production.
                      </p>

                      <div className="flex items-baseline mb-6">
                        <span className="text-gray-500 dark:text-gray-400 text-xl">$</span>
                        <motion.span
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                          className="text-5xl font-bold text-purple-600 dark:text-[#A855F7]"
                        >
                          20
                        </motion.span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">/mo</span>
                      </div>
                      <p className="text-xs text-purple-600 dark:text-[#A855F7] mb-4">
                        MINIMUM SPEND
                      </p>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={switchPlan}
                          className="mb-4 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                          variant="link"
                        >
                          Need less? Switch to Hobby
                        </Button>
                      </motion.div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-purple-600 dark:text-[#A855F7]">
                          <GiftIcon />
                        </div>
                        <div className="ml-3 flex items-center">
                          <p className="text-sm text-purple-600 dark:text-[#A855F7]">
                            Includes $20 of usage monthly
                          </p>
                          <Badge className="ml-2 bg-purple-600 dark:bg-[#A855F7] text-[0.6rem] py-0 px-1.5 h-4">
                            NEW
                          </Badge>
                        </div>
                      </div>

                      {[
                        '32 GB RAM / 32 vCPU per service',
                        'Unlimited team seats included',
                        'XFlow Support (1 business day)',
                        '30-day log history',
                        'SOC2 compliance report',
                        'Multiple concurrent regions',
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                        >
                          <div className="flex-shrink-0 h-5 w-5 text-purple-600 dark:text-[#A855F7]">
                            <Check className="h-5 w-5" />
                          </div>
                          <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Payment section */}
        <motion.div
          className="relative overflow-hidden rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white/10 to-transparent dark:from-gray-900/30 dark:via-gray-800/10 dark:to-transparent"></div>

          <div className="relative">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
              <h2 className="text-xl font-bold">Start a new usage-based subscription</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                We will charge you for your usage above
                <span
                  className={`font-medium ${plan === 'hobby' ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}`}
                >
                  {' '}
                  ${plan === 'hobby' ? '5' : '20'}
                </span>{' '}
                at the end of the billing cycle.
              </div>
            </div>

            <motion.div
              className="mb-8 space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-[#222]">
                  <svg
                    className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Card number"
                    className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 w-full"
                  />
                  <span
                    className={`${plan === 'hobby' ? 'text-blue-500' : 'text-purple-500'} text-xs font-medium`}
                  >
                    secure
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-[#222]">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 w-full"
                    />
                  </div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-[#222]">
                    <input
                      type="text"
                      placeholder="CVC"
                      className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 w-full"
                    />
                    <svg
                      className="w-5 h-5 ml-1 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className={`w-full py-6 ${
                    plan === 'hobby'
                      ? 'bg-blue-600 hover:bg-blue-700 dark:bg-[#4F8BFF] dark:hover:bg-[#3A6AD4]'
                      : 'bg-purple-600 hover:bg-purple-700 dark:bg-[#A855F7] dark:hover:bg-[#9333EA]'
                  } text-white`}
                >
                  Subscribe to {plan === 'hobby' ? 'Hobby' : 'Pro'} Plan
                </Button>
              </motion.div>

              <motion.p
                className="text-center text-xs text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                You will be charged ${plan === 'hobby' ? '5' : '20'} upfront to activate your plan.
                <br />
                By subscribing, you agree to our{' '}
                <a
                  href="#"
                  className={`underline ${plan === 'hobby' ? 'text-blue-500' : 'text-purple-500'}`}
                >
                  Terms & Conditions
                </a>
                .
              </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
}
