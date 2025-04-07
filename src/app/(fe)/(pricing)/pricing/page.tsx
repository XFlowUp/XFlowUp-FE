'use client';
import Link from 'next/link';
import { Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/landing_page/header';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0B0B14] text-white">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Active Plan Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Active Plan</h2>
            <Button
              variant="ghost"
              className="text-[#A855F7] hover:text-[#9333EA] flex items-center"
              onClick={() => router.push('/upgrade?plan=hobby')}
            >
              <span>View Upgrade Options</span>
            </Button>
          </div>

          <div className="bg-[#0F2A1A] border border-[#1A4A2E] rounded-lg p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-[#1A4A2E] flex items-center justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                  <div className="grid grid-cols-3 grid-rows-3 gap-1">
                    {[1, 0, 1, 0, 1, 0, 1, 0, 1].map((value, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 ${value ? 'bg-[#4ADE80]' : 'bg-white'}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2">You're on the Trial Plan</h3>
              <p className="text-gray-400 text-center max-w-2xl">
                Thanks for verifying your account and being part of XFlow. As a member of the Trial
                Plan, you have access to:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-[#0B1A10] rounded-md p-4 flex items-start">
                <div className="w-5 h-5 rounded-full bg-[#0F2A1A] flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-3 w-3 text-[#4ADE80]" />
                </div>
                <span className="text-gray-300">$5 of free resource usage</span>
              </div>
              <div className="bg-[#0B1A10] rounded-md p-4 flex items-start">
                <div className="w-5 h-5 rounded-full bg-[#0F2A1A] flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-3 w-3 text-[#4ADE80]" />
                </div>
                <span className="text-gray-300">512 MB RAM / 2 vCPU per service</span>
              </div>
              <div className="bg-[#0B1A10] rounded-md p-4 flex items-start">
                <div className="w-5 h-5 rounded-full bg-[#0F2A1A] flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-3 w-3 text-[#4ADE80]" />
                </div>
                <span className="text-gray-300">Code and database deployments</span>
              </div>
              <div className="bg-[#0B1A10] rounded-md p-4 flex items-start">
                <div className="w-5 h-5 rounded-full bg-[#0F2A1A] flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-3 w-3 text-[#4ADE80]" />
                </div>
                <span className="text-gray-300">Community Support</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <h3 className="text-xl font-bold mb-2">Ready to go further?</h3>
            <p className="text-gray-400">Upgrade and outship the competition</p>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-20">
          Pay for usage, unlock the following
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-[#0F1524] rounded-lg p-8 border border-[#1E2A45]">
            <h2 className="text-2xl font-bold text-[#4F8BFF]">Hobby</h2>
            <p className="text-gray-400 mt-2 mb-6 h-12">
              For hobbyist developers looking to showcase their side projects.
            </p>

            <div className="flex items-baseline mb-6">
              <span className="text-gray-400 text-xl">$</span>
              <span className="text-5xl font-bold text-[#4F8BFF]">5</span>
              <span className="text-gray-400 ml-1">/mo</span>
            </div>
            <p className="text-xs text-[#4F8BFF] mb-8">MINIMUM SPEND</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-[#4F8BFF]">
                  <GiftIcon />
                </div>
                <p className="ml-3 text-sm text-[#4F8BFF]">Includes $5 of usage monthly</p>
              </div>

              <FeatureItem text="8 GB RAM / 8 vCPU per service" />
              <FeatureItem text="Single developer workspace" />
              <FeatureItem text="Community support" />
              <FeatureItem text="7-day log history" />
              <FeatureItem text="Global regions" isNew />
            </div>

            <Button
              className="w-full bg-[#4F8BFF] hover:bg-[#3A6AD4] text-white"
              onClick={() => router.push('/upgrade?plan=hobby')}
            >
              Sign Up for XFlow
            </Button>
          </div>

          <div className="bg-[#1A0F2E] rounded-lg p-8 border border-[#2E1A4A]">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-[#A855F7]">Pro</h2>
              <Info className="h-4 w-4 ml-2 text-gray-400" />
            </div>
            <p className="text-gray-400 mt-2 mb-6 h-12">
              For professional developers and teams shipping to production.
            </p>

            <div className="flex items-baseline mb-6">
              <span className="text-gray-400 text-xl">$</span>
              <span className="text-5xl font-bold text-[#A855F7]">20</span>
              <span className="text-gray-400 ml-1">/mo</span>
            </div>
            <p className="text-xs text-[#A855F7] mb-8">MINIMUM SPEND</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 text-[#A855F7]">
                  <GiftIcon />
                </div>
                <div className="ml-3 flex items-center">
                  <p className="text-sm text-[#A855F7]">Includes $20 of usage monthly</p>
                  <Badge className="ml-2 bg-[#A855F7] text-[0.6rem] py-0 px-1.5 h-4">NEW</Badge>
                </div>
              </div>

              <FeatureItem color="purple" text="32 GB RAM / 32 vCPU per service" />
              <FeatureItem color="purple" text="Unlimited team seats included" isNew />
              <FeatureItem color="purple" text="XFlow Support (1 Business Day)" />
              <FeatureItem color="purple" text="30-day log history" />
              <FeatureItem color="purple" text="SOC2 compliance report" />
              <FeatureItem color="purple" text="Multiple concurrent regions" />
            </div>

            <Button
              className="w-full bg-[#A855F7] hover:bg-[#9333EA] text-white"
              onClick={() => router.push('/upgrade?plan=pro')}
            >
              Deploy with Pro
            </Button>
          </div>

          {/* Pro Add-Ons */}
          <div className="bg-[#0F2A1A] rounded-lg p-8 border border-[#1A4A2E]">
            <h2 className="text-2xl font-bold text-[#4ADE80]">Pro Add-Ons</h2>
            <p className="text-gray-400 mt-2 mb-6 h-12">
              Add-ons are available to Pro users that achieve monthly minimum spends.
            </p>

            <div className="flex items-baseline mb-6">
              <span className="text-gray-400 text-xl">$</span>
              <span className="text-5xl font-bold text-[#4ADE80]">500+</span>
              <span className="text-gray-400 ml-1">/mo</span>
            </div>
            <p className="text-xs text-[#4ADE80] mb-8">MINIMUM SPEND</p>

            <div className="space-y-4 mb-8">
              <FeatureItem color="green" text="Support SLOs at $500 spend" isNew />
              <FeatureItem color="green" text="90-day log history at $500 spend" />
              <FeatureItem color="green" text="HIPAA BAAs at $1,000 spend" />
              <FeatureItem color="green" text="Dedicated VMs at $10,000 spend" isNew />
            </div>

            <Button className="w-full bg-[#4ADE80] hover:bg-[#22C55E] text-black">
              Contact Us
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 p-4 bg-[#1A0F2E] bg-opacity-50 rounded-lg border border-[#2E1A4A] flex items-center">
          <Info className="h-4 w-4 mr-2 text-gray-400" />
          <p className="text-sm text-gray-400">
            <Link href="#" className="text-[#A855F7] ml-1 hover:underline">
              Read the docs
            </Link>{' '}
            to learn more.
          </p>
        </div>
      </main>
    </div>
  );
}

function FeatureItem({
  text,
  isNew = false,
  color = 'blue',
}: {
  text: string;
  isNew?: boolean;
  color?: 'blue' | 'purple' | 'green';
}) {
  const colorMap = {
    blue: 'text-[#4F8BFF]',
    purple: 'text-[#A855F7]',
    green: 'text-[#4ADE80]',
  };

  return (
    <div className="flex items-start">
      <div className={`flex-shrink-0 h-5 w-5 ${colorMap[color]}`}>
        <Check className="h-5 w-5" />
      </div>
      <div className="ml-3 flex items-center">
        <p className="text-sm text-gray-300">{text}</p>
        {isNew && <Badge className="ml-2 bg-[#A855F7] text-[0.6rem] py-0 px-1.5 h-4">NEW</Badge>}
      </div>
    </div>
  );
}

function GiftIcon() {
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
