'use client';
import Footer from '@/components/landing_page/footer';
import { PlanHeader } from '@/components/plan/PlanHeader';
import { PlanSidebar } from '@/components/plan/PlanSidebar';
import { PlanCard } from '@/components/plan/PlanCard';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Check, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/shared/stores/auth';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, type: 'spring', stiffness: 100 },
  },
  hover: {
    y: -10,
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    transition: { duration: 0.3 },
  },
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

function FeatureItem({
  text,
  isNew = false,
  color = 'blue',
  variants,
}: {
  text: string;
  isNew?: boolean;
  color?: 'blue' | 'purple';
  variants?: any;
}) {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-[#4F8BFF]',
    purple: 'text-purple-600 dark:text-[#A855F7]',
  };

  const badgeClasses = {
    blue: 'bg-blue-600 dark:bg-[#4F8BFF]',
    purple: 'bg-purple-600 dark:bg-[#A855F7]',
  };

  return (
    <motion.div variants={variants} className="flex items-start">
      <div className={`flex-shrink-0 h-5 w-5 ${colorClasses[color]}`}>
        <Check className="h-5 w-5" />
      </div>
      <div className="ml-3 flex items-center">
        <p className={`text-sm ${colorClasses[color]}`}>{text}</p>
        {isNew && (
          <Badge className={`ml-2 ${badgeClasses[color]} text-[0.6rem] py-0 px-1.5 h-4`}>NEW</Badge>
        )}
      </div>
    </motion.div>
  );
}

function GiftIcon() {
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
}

export default function PlanPage() {
  const router = useRouter();
  const { user } = useAuthStore();

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

  const scrollToUpgradeOptions = () => {
    const element = document.getElementById('upgrade-options');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-5 lg:px-8 max-w-6xl">
        <PlanHeader />
        <main className="flex flex-row py-8 gap-8">
          <PlanSidebar />
          <div className="flex-1">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="max-w-4xl mx-auto mb-20"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Active Plan</h2>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    className="flex items-center"
                    onClick={scrollToUpgradeOptions}
                  >
                    <span>View Upgrade Options</span>
                  </Button>
                </motion.div>
              </div>

              <PlanCard />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-center mt-8"
              >
                <h3 className="text-xl font-bold mb-2">Ready to go further?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Upgrade and outship the competition
                </p>
              </motion.div>

              <div id="upgrade-options" className="mt-16">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Hobby Plan Card */}
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className={`bg-blue-50 dark:bg-[#0F1524] rounded-lg p-8 border ${isCurrentPlan('Hobby') ? 'border-blue-400 dark:border-[#4F8BFF] ring-2 ring-blue-400 dark:ring-[#4F8BFF]' : 'border-blue-100 dark:border-[#1E2A45]'}`}
                  >
                    {isCurrentPlan('Hobby') && (
                      <div className="mb-4">
                        <Badge className="bg-blue-600 dark:bg-[#4F8BFF]">Current Plan</Badge>
                      </div>
                    )}
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-[#4F8BFF]">Hobby</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6 h-12">
                      For hobbyist developers looking to showcase their side projects.
                    </p>

                    <div className="flex items-baseline mb-6">
                      <span className="text-gray-500 dark:text-gray-400 text-xl">$</span>
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl font-bold text-blue-600 dark:text-[#4F8BFF]"
                      >
                        5
                      </motion.span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">/mo</span>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-[#4F8BFF] mb-8">MINIMUM SPEND</p>

                    <motion.div variants={staggerContainer} className="space-y-4 mb-8">
                      <motion.div variants={featureVariants} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-[#4F8BFF]">
                          <GiftIcon />
                        </div>
                        <p className="ml-3 text-sm text-blue-600 dark:text-[#4F8BFF]">
                          Includes $5 of usage monthly
                        </p>
                      </motion.div>

                      <FeatureItem
                        text="8 GB RAM / 8 vCPU per service"
                        variants={featureVariants}
                      />
                      <FeatureItem text="Single developer workspace" variants={featureVariants} />
                      <FeatureItem text="Community support" variants={featureVariants} />
                      <FeatureItem text="7-day log history" variants={featureVariants} />
                      <FeatureItem text="Global regions" isNew variants={featureVariants} />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className={`w-full ${isCurrentPlan('Hobby') ? 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700' : 'bg-blue-600 hover:bg-blue-700 dark:bg-[#4F8BFF] dark:hover:bg-[#3A6AD4]'} text-white`}
                        onClick={() => router.push('/upgrade?plan=hobby')}
                        disabled={isCurrentPlan('Hobby')}
                      >
                        {isCurrentPlan('Hobby') ? 'Current Plan' : 'Deploy with Hobby'}
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Pro Plan Card */}
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    className={`bg-purple-50 dark:bg-[#1A0F2E] rounded-lg p-8 border ${isCurrentPlan('Pro') ? 'border-purple-400 dark:border-[#A855F7] ring-2 ring-purple-400 dark:ring-[#A855F7]' : 'border-purple-100 dark:border-[#2E1A4A]'}`}
                  >
                    {isCurrentPlan('Pro') && (
                      <div className="mb-4">
                        <Badge className="bg-purple-600 dark:bg-[#A855F7]">Current Plan</Badge>
                      </div>
                    )}
                    <div className="flex items-center">
                      <h2 className="text-2xl font-bold text-purple-600 dark:text-[#A855F7]">
                        Pro
                      </h2>
                      <Info className="h-4 w-4 ml-2 text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6 h-12">
                      For professional developers and teams shipping to production.
                    </p>

                    <div className="flex items-baseline mb-6">
                      <span className="text-gray-500 dark:text-gray-400 text-xl">$</span>
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl font-bold text-purple-600 dark:text-[#A855F7]"
                      >
                        20
                      </motion.span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">/mo</span>
                    </div>
                    <p className="text-xs text-purple-600 dark:text-[#A855F7] mb-8">
                      MINIMUM SPEND
                    </p>

                    <motion.div variants={staggerContainer} className="space-y-4 mb-8">
                      <motion.div variants={featureVariants} className="flex items-start">
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
                      </motion.div>

                      <FeatureItem
                        color="purple"
                        text="32 GB RAM / 32 vCPU per service"
                        variants={featureVariants}
                      />
                      <FeatureItem
                        color="purple"
                        text="Unlimited team seats included"
                        isNew
                        variants={featureVariants}
                      />
                      <FeatureItem
                        color="purple"
                        text="XFlow Support (1 Business Day)"
                        variants={featureVariants}
                      />
                      <FeatureItem
                        color="purple"
                        text="30-day log history"
                        variants={featureVariants}
                      />
                      <FeatureItem
                        color="purple"
                        text="SOC2 compliance report"
                        variants={featureVariants}
                      />
                      <FeatureItem
                        color="purple"
                        text="Multiple concurrent regions"
                        variants={featureVariants}
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className={`w-full ${isCurrentPlan('Pro') ? 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700' : 'bg-purple-600 hover:bg-purple-700 dark:bg-[#A855F7] dark:hover:bg-[#9333EA]'} text-white`}
                        onClick={() => router.push('/upgrade?plan=pro')}
                        disabled={isCurrentPlan('Pro')}
                      >
                        {isCurrentPlan('Pro') ? 'Current Plan' : 'Deploy with Pro'}
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
