'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/landing_page/header';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/shared/stores/auth';
import { useCreateSubscriptionCheckoutMutation } from '@/shared/api/mutations/useTopupMutation';
import { toast } from 'sonner';

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
  const { user } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState('hobby');
  const [loading, setLoading] = useState(false);
  const [createSubscriptionCheckout] = useCreateSubscriptionCheckoutMutation();

  const getPlanName = () => {
    if (user?.is_trial) {
      return 'Trial';
    }

    switch (user?.current_plan_id) {
      case '1':
        return 'Hobby';
      case '2':
        return 'Pro';
      default:
        return 'Free';
    }
  };

  const currentPlan = getPlanName();

  const isCurrentPlan = (planName: string) => {
    return currentPlan === planName;
  };

  const handleSelectPlan = async (plan: string) => {
    if (isCurrentPlan(plan === 'hobby' ? 'Hobby' : 'Pro')) {
      return;
    }

    setLoading(true);
    try {
      const planId = plan === 'hobby' ? 1 : 2;
      const currentUrl = window.location.origin;

      const result = await createSubscriptionCheckout({
        variables: {
          planId: planId,
          redirectUrl: `${currentUrl}/dashboard`,
          cancelUrl: `${currentUrl}/upgrade`,
        },
      });

      if (
        result.data?.createSubscriptionCheckout.__typename === 'CreateSubscriptionCheckoutSuccess'
      ) {
        window.location.href = result.data.createSubscriptionCheckout.subscription_url;
      } else if (
        result.data?.createSubscriptionCheckout.__typename === 'CreateSubscriptionCheckoutError'
      ) {
        toast.error(
          result.data.createSubscriptionCheckout.message || 'Error creating subscription checkout'
        );
      }
    } catch (error) {
      console.error('Subscription checkout error:', error);
      toast.error('Error creating subscription checkout');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam === 'pro' || planParam === 'hobby') {
      setSelectedPlan(planParam);
    } else {
      setSelectedPlan('hobby');
    }
  }, [searchParams]);

  return (
    <div className="bg-white dark:bg-[#121212] text-gray-900 dark:text-white min-h-screen">
      <Header />

      <motion.main
        className="max-w-5xl mx-auto py-12 px-4 sm:px-6"
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
          {currentPlan !== 'Free' && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Current plan: <span className="font-medium">{currentPlan}</span>
            </p>
          )}
        </motion.div>

        {/* Display all three plans side by side */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Free Plan */}
          <motion.div
            className={`relative overflow-hidden rounded-xl bg-white dark:bg-[#1A1A1A] border ${
              isCurrentPlan('Free')
                ? 'border-gray-400 dark:border-gray-500 ring-2 ring-gray-400 dark:ring-gray-500'
                : 'border-gray-200 dark:border-gray-700'
            }`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 via-gray-400/5 to-transparent dark:from-gray-500/20 dark:via-gray-400/10 dark:to-transparent"></div>

            <div className="relative p-8">
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-gray-600 dark:bg-gray-500">Free Plan</Badge>
                {isCurrentPlan('Free') && (
                  <Badge
                    variant="outline"
                    className="border-gray-400 text-gray-600 dark:text-gray-400"
                  >
                    Current Plan
                  </Badge>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">Free</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Perfect for getting started and exploring XFlowUp features.
              </p>

              <div className="flex items-baseline mb-6">
                <span className="text-gray-500 dark:text-gray-400 text-xl">$</span>
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                  className="text-5xl font-bold text-gray-600 dark:text-gray-400"
                >
                  0
                </motion.span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">/mo</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-6">FOREVER FREE</p>

              <div className="space-y-4 mb-8">
                {[
                  '512 MB RAM / 2 vCPU per service',
                  'Single developer workspace',
                  'Community Support',
                  '7-day log history',
                  'Limited regions',
                  'Basic features only',
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                  >
                    <div className="flex-shrink-0 h-5 w-5 text-gray-600 dark:text-gray-400">
                      <Check className="h-5 w-5" />
                    </div>
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: isCurrentPlan('Free') ? 1 : 1.05 }}
                whileTap={{ scale: isCurrentPlan('Free') ? 1 : 0.98 }}
              >
                <Button
                  className={`w-full ${
                    isCurrentPlan('Free')
                      ? 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 cursor-not-allowed'
                      : 'bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600'
                  } text-white`}
                  disabled={true}
                >
                  {isCurrentPlan('Free') ? 'Current Plan' : 'Cannot Downgrade'}
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Hobby Plan */}
          <motion.div
            className={`relative overflow-hidden rounded-xl bg-white dark:bg-[#0F1524] border ${
              isCurrentPlan('Hobby')
                ? 'border-blue-400 dark:border-blue-500 ring-2 ring-blue-400 dark:ring-blue-500'
                : 'border-blue-200 dark:border-blue-900/50'
            }`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent dark:from-blue-500/20 dark:via-blue-400/10 dark:to-transparent"></div>

            <div className="relative p-8">
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-blue-600 dark:bg-[#4F8BFF]">Hobby Plan</Badge>
                {isCurrentPlan('Hobby') && (
                  <Badge
                    variant="outline"
                    className="border-blue-400 text-blue-600 dark:text-blue-400"
                  >
                    Current Plan
                  </Badge>
                )}
              </div>

              <h2 className="text-2xl font-bold text-blue-600 dark:text-[#4F8BFF] mb-2">Hobby</h2>
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
              <p className="text-xs text-blue-600 dark:text-[#4F8BFF] mb-6">MINIMUM SPEND</p>

              <div className="space-y-4 mb-8">
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
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: isCurrentPlan('Hobby') ? 1 : 1.05 }}
                whileTap={{ scale: isCurrentPlan('Hobby') ? 1 : 0.98 }}
              >
                <Button
                  className={`w-full ${
                    isCurrentPlan('Hobby')
                      ? 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 dark:bg-[#4F8BFF] dark:hover:bg-[#3A6AD4]'
                  } text-white`}
                  disabled={isCurrentPlan('Hobby') || loading}
                  onClick={() => handleSelectPlan('hobby')}
                >
                  {loading && selectedPlan === 'hobby' ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : isCurrentPlan('Hobby') ? (
                    'Current Plan'
                  ) : (
                    'Select Hobby Plan'
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            className={`relative overflow-hidden rounded-xl bg-white dark:bg-[#1A0F2E] border ${
              isCurrentPlan('Pro')
                ? 'border-purple-400 dark:border-purple-500 ring-2 ring-purple-400 dark:ring-purple-500'
                : 'border-purple-200 dark:border-purple-900/50'
            }`}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent dark:from-purple-500/20 dark:via-purple-400/10 dark:to-transparent"></div>

            <div className="relative p-8">
              <div className="flex justify-between items-start mb-4">
                <Badge className="bg-purple-600 dark:bg-[#A855F7]">Pro Plan</Badge>
                {isCurrentPlan('Pro') && (
                  <Badge
                    variant="outline"
                    className="border-purple-400 text-purple-600 dark:text-purple-400"
                  >
                    Current Plan
                  </Badge>
                )}
              </div>

              <h2 className="text-2xl font-bold text-purple-600 dark:text-[#A855F7] mb-2">Pro</h2>
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
              <p className="text-xs text-purple-600 dark:text-[#A855F7] mb-6">MINIMUM SPEND</p>

              <div className="space-y-4 mb-8">
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
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: isCurrentPlan('Pro') ? 1 : 1.05 }}
                whileTap={{ scale: isCurrentPlan('Pro') ? 1 : 0.98 }}
              >
                <Button
                  className={`w-full ${
                    isCurrentPlan('Pro')
                      ? 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 dark:bg-[#A855F7] dark:hover:bg-[#9333EA]'
                  } text-white`}
                  disabled={isCurrentPlan('Pro') || loading}
                  onClick={() => handleSelectPlan('pro')}
                >
                  {loading && selectedPlan === 'pro' ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : isCurrentPlan('Pro') ? (
                    'Current Plan'
                  ) : (
                    'Select Pro Plan'
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Message when user already has a plan */}
        {(isCurrentPlan('Free') || isCurrentPlan('Hobby') || isCurrentPlan('Pro')) && (
          <motion.div
            className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-lg font-medium mb-2">
              {isCurrentPlan('Free')
                ? 'You are currently on the Free plan'
                : isCurrentPlan('Hobby')
                  ? 'You are currently on the Hobby plan'
                  : 'You are currently on the Pro plan'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {isCurrentPlan('Free')
                ? 'Upgrade to Hobby or Pro plan to unlock more features and resources.'
                : isCurrentPlan('Hobby')
                  ? 'To upgrade to Pro plan, click "Select Pro Plan" above to proceed with the upgrade. Downgrading is not allowed.'
                  : 'You have access to all premium features. Downgrading is not allowed. For plan changes, please contact support.'}
            </p>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}
