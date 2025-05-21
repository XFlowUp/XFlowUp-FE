'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TopUpDialogProps {
  children: React.ReactNode;
  onTopUp?: (amount: number) => void;
  colorScheme?: {
    // Màu sắc cho phần background của dialog
    bgColor?: string;
    // Màu sắc cho border
    borderColor?: string;
    // Màu sắc cho text
    textColor?: string;
    // Màu sắc cho nút
    buttonBg?: string;
    buttonHoverBg?: string;
    // Màu sắc cho link
    linkColor?: string;
  };
}

const SUGGESTED_AMOUNTS = [10, 25, 50, 100];
const MAX_AMOUNT = 1000;

// Màu mặc định là violet
const defaultColorScheme = {
  bgColor: 'bg-violet-50 dark:bg-violet-950/30',
  borderColor: 'border-violet-200 dark:border-violet-800',
  textColor: 'text-violet-700 dark:text-violet-300',
  textListColor: 'text-violet-600 dark:text-violet-400',
  buttonBg: 'bg-violet-600',
  buttonHoverBg: 'hover:bg-violet-700',
  buttonOutlineBg: 'hover:bg-violet-50 dark:hover:bg-violet-900/20',
  linkColor: 'text-violet-600 dark:text-violet-400',
};

export function TopUpDialog({ children, onTopUp, colorScheme }: TopUpDialogProps) {
  const [amount, setAmount] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  // Kết hợp màu mặc định với màu tùy chỉnh
  const colors = {
    ...defaultColorScheme,
    bgColor: colorScheme?.bgColor || defaultColorScheme.bgColor,
    borderColor: colorScheme?.borderColor || defaultColorScheme.borderColor,
    textColor: colorScheme?.textColor || defaultColorScheme.textColor,
    buttonBg: colorScheme?.buttonBg || defaultColorScheme.buttonBg,
    buttonHoverBg: colorScheme?.buttonHoverBg || defaultColorScheme.buttonHoverBg,
    linkColor: colorScheme?.linkColor || defaultColorScheme.linkColor,
  };

  const numericAmount = useMemo(() => {
    const parsed = parseFloat(amount);
    return !isNaN(parsed) ? parsed : 0;
  }, [amount]);

  const formattedAmount = useMemo(() => {
    return numericAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, [numericAmount]);

  const isAmountValid = useMemo(() => {
    return numericAmount > 0 && numericAmount <= MAX_AMOUNT;
  }, [numericAmount]);

  const errorMessage = useMemo(() => {
    if (numericAmount <= 0) return null;
    if (numericAmount > MAX_AMOUNT) return `Maximum amount is ${MAX_AMOUNT} $`;
    return null;
  }, [numericAmount]);

  const handleTopUp = () => {
    if (isAmountValid) {
      if (onTopUp) {
        onTopUp(numericAmount);
      }
      setOpen(false);
      setAmount('');
      setSelectedAmount(null);
    }
  };

  const handleSuggestedAmountClick = (suggestedAmount: number) => {
    setSelectedAmount(suggestedAmount);
    setAmount(suggestedAmount.toString());
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 10) return;

    if (value && !/^\d*\.?\d{0,2}$/.test(value)) return;

    setAmount(value);
    setSelectedAmount(null);
  };

  const resetDialog = () => {
    setOpen(false);
    setAmount('');
    setSelectedAmount(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">Top Up Balance</DialogTitle>
          <DialogDescription className="text-center text-gray-500 dark:text-gray-400">
            Add funds to your account to continue using our services
          </DialogDescription>
        </DialogHeader>

        <div className={`my-6 p-4 ${colors.bgColor} rounded-lg border ${colors.borderColor}`}>
          <p className={`text-sm ${colors.textColor} mb-2`}>
            <span className="font-semibold">Benefits of topping up:</span>
          </p>
          <ul
            className={`text-sm ${colors.textListColor || colors.textColor} space-y-1 ml-5 list-disc`}
          >
            <li>Instantly available in your account</li>
            <li>No transaction fees</li>
            <li>Use on any projects in your workspace</li>
          </ul>
        </div>

        <div className="grid gap-6">
          <div>
            <Label className="text-base font-medium mb-2 block">Suggested Amounts</Label>
            <div className="grid grid-cols-4 gap-2">
              {SUGGESTED_AMOUNTS.map(suggestedAmount => (
                <Button
                  key={suggestedAmount}
                  type="button"
                  variant={selectedAmount === suggestedAmount ? 'default' : 'outline'}
                  className={`${
                    selectedAmount === suggestedAmount
                      ? `${colors.buttonBg} text-white ${colors.buttonHoverBg}`
                      : `bg-transparent ${colors.buttonOutlineBg}`
                  } border ${colors.borderColor} h-16`}
                  onClick={() => handleSuggestedAmountClick(suggestedAmount)}
                >
                  <span className="font-semibold text-lg">{suggestedAmount} $</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="amount" className="text-base font-medium">
              Custom Amount
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="pr-12 h-12 text-lg tracking-tight"
                min="1"
                max={MAX_AMOUNT}
                step="0.01"
                inputMode="decimal"
                onKeyDown={e => {
                  if (['e', '+', '-'].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                $
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <p className="text-gray-500 dark:text-gray-400">Minimum amount: 1 $</p>
              <p className="text-gray-500 dark:text-gray-400">Maximum amount: {MAX_AMOUNT} $</p>
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500 dark:text-red-400 mt-1">{errorMessage}</p>
            )}
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Amount to add:</p>
            <p className="text-xl font-bold">
              {formattedAmount} <span className="text-xl">$</span>
            </p>
          </div>
          <Button
            onClick={handleTopUp}
            disabled={!isAmountValid}
            className={`h-12 px-6 ${colors.buttonBg} ${colors.buttonHoverBg}`}
          >
            Top Up Now
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-normal break-words">
            By proceeding with the top-up, you agree to our{' '}
            <a href="#" className={`underline ${colors.linkColor}`}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className={`underline ${colors.linkColor}`}>
              Payment Policy
            </a>
            .
          </p>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={resetDialog} className="w-full">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
