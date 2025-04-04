'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/landing_page/header';

export default function UpgradePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [plan, setPlan] = useState('hobby');

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam === 'pro' || planParam === 'hobby') {
      setPlan(planParam);
    } else {
      // Default to hobby if no valid plan is specified
      router.replace('/upgrade?plan=hobby');
    }
  }, [searchParams, router]);

  const switchPlan = () => {
    const newPlan = plan === 'hobby' ? 'pro' : 'hobby';
    router.push(`/upgrade?plan=${newPlan}`);
  };

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Subscribe</h1>
          <p className="text-gray-400">
            Upgrade your resources, remove usage limits, and ship with ease.
          </p>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 mb-6">
          {plan === 'hobby' ? (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-blue-400 mb-1">Hobby</h2>
                  <p className="text-gray-400 text-sm">
                    For individual developers and hobbyists working on personal projects.
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Includes $5 of usage monthly</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold">
                      <span className="text-white">$</span>{' '}
                      <span className="text-white text-4xl">5</span>{' '}
                      <span className="text-gray-400 text-lg">/mo</span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">MINIMUM SPEND</p>
                  </div>

                  <Button
                    onClick={switchPlan}
                    className="text-sm text-gray-400 hover:text-white"
                    variant="link"
                  >
                    Need more? Switch to Pro
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-4 h-4 mr-2"></div>8 GB RAM / 8 vCPU per service
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-4 h-4 mr-2"></div>
                    Single developer workspace
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-4 h-4 mr-2"></div>
                    Community Support
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-4 h-4 mr-2"></div>
                    7-day log history
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-4 h-4 mr-2"></div>
                    Global regions
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-purple-400 mb-1">Pro</h2>
                  <p className="text-gray-400 text-sm">
                    For professional developers and teams shipping to production.
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">All Hobby plan features and:</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold">
                      <span className="text-white">$</span>{' '}
                      <span className="text-white text-4xl">20</span>{' '}
                      <span className="text-gray-400 text-lg">/mo</span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">MINIMUM SPEND</p>
                  </div>

                  <Button
                    onClick={switchPlan}
                    className="text-sm text-gray-400 hover:text-white"
                    variant="link"
                  >
                    Need less? Switch to Hobby
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-4 h-4 mr-2"></div>
                    32 GB RAM / 32 vCPU per service
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-4 h-4 mr-2"></div>
                    Railway Support (1 business day)
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-4 h-4 mr-2"></div>
                    30-day log history
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-4 h-4 mr-2"></div>
                    SOC2 compliance report
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <div className="w-4 h-4 mr-2"></div>
                    Multiple concurrent regions
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Payment section */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold">Start a new usage-based subscription</h2>
            <div className="text-right text-sm text-gray-400">
              We will charge you for your usage above
              <br />${plan === 'hobby' ? '5' : '20'} at the end of the billing cycle.
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center border border-gray-700 rounded p-3 bg-[#1a1a1a]">
              <svg className="w-5 h-5 mr-2 text-gray-400" viewBox="0 0 24 24" fill="none">
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
                className="bg-transparent border-none outline-none text-gray-300 w-full"
              />
              <span className="text-green-500 text-xs">link</span>
            </div>
          </div>

          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6">
            Subscribe to {plan === 'hobby' ? 'Hobby' : 'Pro'} Plan
          </Button>

          <p className="text-center text-xs text-gray-500 mt-3">
            You will be charged ${plan === 'hobby' ? '5' : '20'} upfront to activate your plan.
          </p>
        </div>
      </main>
    </div>
  );
}
