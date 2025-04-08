'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/landing_page/header';
import { motion, AnimatePresence } from 'motion/react';

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
        className="max-w-3xl mx-auto py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">Subscribe</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upgrade your resources, remove usage limits, and ship with ease.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-lg p-8 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ boxShadow: '0px 5px 15px rgba(0,0,0,0.1)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={plan}
              initial={{ opacity: 0, x: plan === 'hobby' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: plan === 'hobby' ? 20 : -20 }}
              transition={{ duration: 0.4 }}
            >
              {plan === 'hobby' ? (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-blue-500 dark:text-blue-400 mb-1">
                        Hobby
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        For individual developers and hobbyists working on personal projects.
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Includes $5 of usage monthly
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <h3 className="text-3xl font-bold">
                          <span className="text-gray-900 dark:text-white">$</span>{' '}
                          <span className="text-gray-900 dark:text-white text-4xl">5</span>{' '}
                          <span className="text-gray-600 dark:text-gray-400 text-lg">/mo</span>
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">MINIMUM SPEND</p>
                      </div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={switchPlan}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          variant="link"
                        >
                          Need more? Switch to Pro
                        </Button>
                      </motion.div>
                    </div>

                    <div className="space-y-3">
                      {[
                        '8 GB RAM / 8 vCPU per service',
                        'Single developer workspace',
                        'Community Support',
                        '7-day log history',
                        'Global regions',
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                        >
                          <div className="w-4 h-4 mr-2"></div>
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-purple-500 dark:text-purple-400 mb-1">
                        Pro
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        For professional developers and teams shipping to production.
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        All Hobby plan features and:
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <h3 className="text-3xl font-bold">
                          <span className="text-gray-900 dark:text-white">$</span>{' '}
                          <span className="text-gray-900 dark:text-white text-4xl">20</span>{' '}
                          <span className="text-gray-600 dark:text-gray-400 text-lg">/mo</span>
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">MINIMUM SPEND</p>
                      </div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={switchPlan}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          variant="link"
                        >
                          Need less? Switch to Hobby
                        </Button>
                      </motion.div>
                    </div>

                    <div className="space-y-3">
                      {[
                        '32 GB RAM / 32 vCPU per service',
                        'Railway Support (1 business day)',
                        '30-day log history',
                        'SOC2 compliance report',
                        'Multiple concurrent regions',
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                        >
                          <div className="w-4 h-4 mr-2"></div>
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Payment section */}
        <motion.div
          className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold">Start a new usage-based subscription</h2>
            <div className="text-right text-sm text-gray-600 dark:text-gray-400">
              We will charge you for your usage above
              <br />${plan === 'hobby' ? '5' : '20'} at the end of the billing cycle.
            </div>
          </div>

          <motion.div className="mb-6" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded p-3 bg-gray-100 dark:bg-[#1a1a1a]">
              <svg
                className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400"
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
              <span className="text-green-500 text-xs">link</span>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6">
              Subscribe to {plan === 'hobby' ? 'Hobby' : 'Pro'} Plan
            </Button>
          </motion.div>

          <motion.p
            className="text-center text-xs text-gray-500 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            You will be charged ${plan === 'hobby' ? '5' : '20'} upfront to activate your plan.
          </motion.p>
        </motion.div>
      </motion.main>
    </div>
  );
}
