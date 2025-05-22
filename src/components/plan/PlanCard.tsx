'use client';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useAuthStore } from '@/shared/stores/auth';
import { useBalance } from '@/shared/api/queries/useUserInfo';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const featureVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export const PlanCard = () => {
  const { user } = useAuthStore();
  const { data: balanceData } = useBalance();

  const balanceInfo = balanceData?.balance;
  const balance = balanceInfo && 'balance' in balanceInfo ? balanceInfo.balance : null;

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

  const planName = getPlanName();

  const getPlanFeatures = () => {
    switch (planName) {
      case 'Hobby':
        return [
          '$5 of resource usage monthly',
          '8 GB RAM / 8 vCPU per service',
          'Single developer workspace',
          'Community support',
        ];
      case 'Pro':
        return [
          '$20 of resource usage monthly',
          '32 GB RAM / 32 vCPU per service',
          'Unlimited team seats included',
          'XFlow Support (1 Business Day)',
        ];
      case 'Trial':
        return [
          '$5 of free resource usage',
          '512 MB RAM / 2 vCPU per service',
          'Code and database deployments',
          'Community Support',
        ];
      default:
        return [
          'Limited resource usage',
          '512 MB RAM / 1 vCPU per service',
          'Public projects only',
          'Community Support',
        ];
    }
  };

  const getPlanColors = () => {
    switch (planName) {
      case 'Hobby':
        return {
          border: 'border-blue-500/50',
          bg: 'bg-white dark:bg-[#0F1524]',
          gradient:
            'from-blue-500/10 via-blue-400/5 to-transparent dark:from-blue-500/20 dark:via-blue-400/10 dark:to-transparent',
          circle: 'bg-blue-100 dark:bg-[#1A2A45]',
          check: 'text-blue-500 dark:text-[#4F8BFF]',
          featureBg: 'bg-blue-50 dark:bg-[#0B1525]/50',
          featureCircle: 'bg-blue-50 dark:bg-[#0F1524]',
        };
      case 'Pro':
        return {
          border: 'border-purple-500/50',
          bg: 'bg-white dark:bg-[#1A0F2E]',
          gradient:
            'from-purple-500/10 via-purple-400/5 to-transparent dark:from-purple-500/20 dark:via-purple-400/10 dark:to-transparent',
          circle: 'bg-purple-100 dark:bg-[#2E1A4A]',
          check: 'text-purple-500 dark:text-[#A855F7]',
          featureBg: 'bg-purple-50 dark:bg-[#190A28]/50',
          featureCircle: 'bg-purple-50 dark:bg-[#1A0F2E]',
        };
      case 'Trial':
        return {
          border: 'border-green-500/50',
          bg: 'bg-white dark:bg-[#0F2A1A]',
          gradient:
            'from-green-500/10 via-green-400/5 to-transparent dark:from-green-500/20 dark:via-green-400/10 dark:to-transparent',
          circle: 'bg-green-100 dark:bg-[#1A4A2E]',
          check: 'text-green-500 dark:text-[#4ADE80]',
          featureBg: 'bg-green-50 dark:bg-[#0B1A10]/50',
          featureCircle: 'bg-green-50 dark:bg-[#0F2A1A]',
        };
      default:
        return {
          border: 'border-gray-500/50',
          bg: 'bg-white dark:bg-[#1A1A1A]',
          gradient:
            'from-gray-500/10 via-gray-400/5 to-transparent dark:from-gray-500/20 dark:via-gray-400/10 dark:to-transparent',
          circle: 'bg-gray-100 dark:bg-[#2A2A2A]',
          check: 'text-gray-500 dark:text-[#A0A0A0]',
          featureBg: 'bg-gray-50 dark:bg-[#1A1A1A]/50',
          featureCircle: 'bg-gray-50 dark:bg-[#2A2A2A]',
        };
    }
  };

  const colors = getPlanColors();
  const features = getPlanFeatures();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-lg p-8 ${colors.bg} border-1 ${colors.border}`}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${colors.gradient}`}></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className={`w-24 h-24 rounded-full ${colors.circle} flex items-center justify-center mb-4`}
          >
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
              <div className="grid grid-cols-3 grid-rows-3 gap-1">
                {[1, 0, 1, 0, 1, 0, 1, 0, 1].map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-3 h-3 ${value ? `bg-${colors.check.split(' ')[0].replace('text-', '')}` : 'bg-white'}`}
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
            You&#39;re on the {planName} Plan
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 dark:text-gray-400 text-center max-w-2xl"
          >
            Thanks for being part of XFlowUp. As a member of the {planName} Plan, you have access
            to:
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureVariants}
              className={`${colors.featureBg} backdrop-blur-sm rounded-md p-4 flex items-start`}
              whileHover={{ x: 5 }}
            >
              <div
                className={`w-5 h-5 rounded-full ${colors.featureCircle} flex items-center justify-center mr-3 mt-0.5`}
              >
                <Check className={`h-3 w-3 ${colors.check}`} />
              </div>
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
