'use client';
import Link from 'next/link';
import { Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/landing_page/header';
import { useRouter } from 'next/navigation';
import MouseMoveEffect from '@/components/mouse-move-effect';
import { motion } from 'framer-motion';

// Animation variants
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

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <MouseMoveEffect />
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]"
        />
      </div>
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-16">
          {/* Active Plan Section */}
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
                  onClick={() => router.push('/upgrade?plan=hobby')}
                >
                  <span>View Upgrade Options</span>
                </Button>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#0F2A1A] border border-gray-200 dark:border-[#1A4A2E] rounded-lg p-8"
            >
              <div className="flex flex-col items-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="w-24 h-24 rounded-full bg-green-100 dark:bg-[#1A4A2E] flex items-center justify-center mb-4"
                >
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <div className="grid grid-cols-3 grid-rows-3 gap-1">
                      {[1, 0, 1, 0, 1, 0, 1, 0, 1].map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`w-3 h-3 ${value ? 'bg-[#4ADE80]' : 'bg-white'}`}
                        ></motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold mb-2"
                >
                  You&#39;re on the Trial Plan
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 dark:text-gray-400 text-center max-w-2xl"
                >
                  Thanks for verifying your account and being part of XFlow. As a member of the
                  Trial Plan, you have access to:
                </motion.p>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
              >
                {[
                  '$5 of free resource usage',
                  '512 MB RAM / 2 vCPU per service',
                  'Code and database deployments',
                  'Community Support',
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={featureVariants}
                    className="bg-gray-50 dark:bg-[#0B1A10] rounded-md p-4 flex items-start"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-green-50 dark:bg-[#0F2A1A] flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-green-500 dark:text-[#4ADE80]" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

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
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20"
          >
            Pay for usage, unlock the following
          </motion.h1>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {/* Hobby Plan Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-blue-50 dark:bg-[#0F1524] rounded-lg p-8 border border-blue-100 dark:border-[#1E2A45]"
            >
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

                <FeatureItem text="8 GB RAM / 8 vCPU per service" variants={featureVariants} />
                <FeatureItem text="Single developer workspace" variants={featureVariants} />
                <FeatureItem text="Community support" variants={featureVariants} />
                <FeatureItem text="7-day log history" variants={featureVariants} />
                <FeatureItem text="Global regions" isNew variants={featureVariants} />
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-[#4F8BFF] dark:hover:bg-[#3A6AD4] text-white"
                  onClick={() => router.push('/upgrade?plan=hobby')}
                >
                  Sign Up for XFlow
                </Button>
              </motion.div>
            </motion.div>

            {/* Pro Plan Card */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-purple-50 dark:bg-[#1A0F2E] rounded-lg p-8 border border-purple-100 dark:border-[#2E1A4A]"
            >
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-purple-600 dark:text-[#A855F7]">Pro</h2>
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
              <p className="text-xs text-purple-600 dark:text-[#A855F7] mb-8">MINIMUM SPEND</p>

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
                <FeatureItem color="purple" text="30-day log history" variants={featureVariants} />
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
                  className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-[#A855F7] dark:hover:bg-[#9333EA] text-white"
                  onClick={() => router.push('/upgrade?plan=pro')}
                >
                  Deploy with Pro
                </Button>
              </motion.div>
            </motion.div>

            {/* Pro Add-Ons */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-green-50 dark:bg-[#0F2A1A] rounded-lg p-8 border border-green-100 dark:border-[#1A4A2E]"
            >
              <h2 className="text-2xl font-bold text-green-600 dark:text-[#4ADE80]">Pro Add-Ons</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6 h-12">
                Add-ons are available to Pro users that achieve monthly minimum spends.
              </p>

              <div className="flex items-baseline mb-6">
                <span className="text-gray-500 dark:text-gray-400 text-xl">$</span>
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-5xl font-bold text-green-600 dark:text-[#4ADE80]"
                >
                  500+
                </motion.span>
                <span className="text-gray-500 dark:text-gray-400 ml-1">/mo</span>
              </div>
              <p className="text-xs text-green-600 dark:text-[#4ADE80] mb-8">MINIMUM SPEND</p>

              <motion.div variants={staggerContainer} className="space-y-4 mb-8">
                <FeatureItem
                  color="green"
                  text="Support SLOs at $500 spend"
                  isNew
                  variants={featureVariants}
                />
                <FeatureItem
                  color="green"
                  text="90-day log history at $500 spend"
                  variants={featureVariants}
                />
                <FeatureItem
                  color="green"
                  text="HIPAA BAAs at $1,000 spend"
                  variants={featureVariants}
                />
                <FeatureItem
                  color="green"
                  text="Dedicated VMs at $10,000 spend"
                  isNew
                  variants={featureVariants}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-[#4ADE80] dark:hover:bg-[#22C55E] text-white dark:text-black">
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="max-w-6xl mx-auto mt-8 p-4 bg-purple-50 dark:bg-[#1A0F2E] bg-opacity-50 dark:bg-opacity-50 rounded-lg border border-purple-100 dark:border-[#2E1A4A] flex items-center"
          >
            <Info className="h-4 w-4 mr-2 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <motion.span whileHover={{ x: 2 }}>
                <Link href="#" className="text-black dark:text-white ml-1 hover:underline">
                  Read the docs
                </Link>
              </motion.span>{' '}
              to learn more.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function FeatureItem({
  text,
  isNew = false,
  color = 'blue',
  variants,
}: {
  text: string;
  isNew?: boolean;
  color?: 'blue' | 'purple' | 'green';
  variants?: any;
}) {
  const colorMap = {
    blue: 'text-blue-600 dark:text-[#4F8BFF]',
    purple: 'text-purple-600 dark:text-[#A855F7]',
    green: 'text-green-600 dark:text-[#4ADE80]',
  };

  return (
    <motion.div variants={variants} whileHover={{ x: 5 }} className="flex items-start">
      <div className={`flex-shrink-0 h-5 w-5 ${colorMap[color]}`}>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 0.5, delay: Math.random() }}
        >
          <Check className="h-5 w-5" />
        </motion.div>
      </div>
      <div className="ml-3 flex items-center">
        <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
        {isNew && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            <Badge className="ml-2 bg-purple-600 dark:bg-[#A855F7] text-[0.6rem] py-0 px-1.5 h-4">
              NEW
            </Badge>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function GiftIcon() {
  // GiftIcon remains unchanged
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 12 20 22 4 22 4 12"></polyline>
      <rect x="2" y="7" width="20" height="5"></rect>
      <line x1="12" y1="22" x2="12" y2="7"></line>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
  );
}
