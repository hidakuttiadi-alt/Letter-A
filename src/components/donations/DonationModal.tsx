'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useParticipation, ContributionRecord } from '@/context/ParticipationContext';
import { X, CheckCircle, ShieldCheck, Heart, Sparkles, Download, ArrowRight } from 'lucide-react';

interface DonationModalProps {
  initialCause?: any;
  onClose: () => void;
}

export default function DonationModal({ initialCause, onClose }: DonationModalProps) {
  const { t } = useLanguage();
  const { addContribution } = useParticipation();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCauseId, setSelectedCauseId] = useState(
    initialCause ? initialCause.id : t.donations.causes[0].id
  );
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<ContributionRecord | null>(null);

  const currentCause =
    t.donations.causes.find((c) => c.id === selectedCauseId) || t.donations.causes[0];

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCustomAmount(e.target.value);
    if (!isNaN(val) && val > 0) {
      setAmount(val);
    }
  };

  const handleCompletePayment = async () => {
    setIsProcessing(true);

    try {
      // 1. Create Donation Intent via Backend API
      const intentRes = await fetch('/api/v1/donations/intents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(amount),
          currency: 'INR',
          cause: currentCause.title,
          donorName: isAnonymous ? 'Anonymous Centenary Patron' : donorName || 'Centenary Supporter',
          donorEmail: donorEmail || 'supporter@samasthalive.org',
          donorPhone: donorPhone || undefined,
          isAnonymous,
          isDemo: true,
        }),
      });

      let referenceId = '';
      if (intentRes.ok) {
        const intentData = await intentRes.json();
        referenceId = intentData?.data?.referenceId || '';

        // 2. Complete Demo Donation
        if (referenceId) {
          await fetch('/api/v1/donations/demo/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              referenceId,
              paymentMethod: 'UPI / Demo NetBanking',
            }),
          });
        }
      }

      // Add to local participation state
      const record = addContribution({
        causeId: currentCause.id,
        causeTitle: currentCause.title,
        amount,
        donorName: isAnonymous ? 'Anonymous Centenary Supporter' : donorName || 'Centenary Supporter',
        donorEmail: donorEmail || 'supporter@samasthalive.org',
        isAnonymous,
      });

      setReceipt(record);
      setStep(4);
    } catch (err) {
      console.warn('Backend payment simulation fallback', err);
      const record = addContribution({
        causeId: currentCause.id,
        causeTitle: currentCause.title,
        amount,
        donorName: isAnonymous ? 'Anonymous Centenary Supporter' : donorName || 'Centenary Supporter',
        donorEmail: donorEmail || 'supporter@samasthalive.org',
        isAnonymous,
      });
      setReceipt(record);
      setStep(4);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-[92%] max-w-[560px] bg-white border border-burgundy-200 rounded-3xl p-6 sm:p-8 relative shadow-2xl my-8 text-[#1F171A]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-burgundy-50 text-burgundy-800 hover:bg-burgundy-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Indicators */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-burgundy-100 text-[0.75rem] font-bold text-[#6B5A60]">
            <span className={step >= 1 ? 'text-burgundy-800 font-extrabold' : ''}>
              {t.donations.stepCause}
            </span>
            <span>→</span>
            <span className={step >= 2 ? 'text-burgundy-800 font-extrabold' : ''}>
              {t.donations.stepAmount}
            </span>
            <span>→</span>
            <span className={step >= 3 ? 'text-burgundy-800 font-extrabold' : ''}>
              {t.donations.stepReview}
            </span>
          </div>
        )}

        {/* STEP 1: Select Cause & Amount */}
        {step === 1 && (
          <div>
            <div className="mb-5">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-burgundy-800 px-3 py-1 rounded-full bg-burgundy-50 inline-block mb-2">
                Step 1 of 3
              </span>
              <h3 className="font-extrabold text-[1.375rem] text-burgundy-950">
                Choose Centenary Cause
              </h3>
            </div>

            <div className="space-y-2.5 mb-6">
              {t.donations.causes.map((cause) => (
                <div
                  key={cause.id}
                  onClick={() => setSelectedCauseId(cause.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedCauseId === cause.id
                      ? 'bg-burgundy-50/80 border-burgundy-700 shadow-sm'
                      : 'bg-canvas-light border-burgundy-100 hover:border-burgundy-300'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-[0.9375rem] text-burgundy-950">{cause.title}</h4>
                    <span className="text-[0.75rem] text-[#6B5A60]">{cause.beneficiaries}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedCauseId === cause.id
                        ? 'border-burgundy-800 bg-burgundy-800'
                        : 'border-burgundy-300'
                    }`}
                  >
                    {selectedCauseId === cause.id && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.9375rem] shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <span>Continue to Amount</span>
              <ArrowRight className="w-4 h-4 text-gold-300" />
            </button>
          </div>
        )}

        {/* STEP 2: Select Amount */}
        {step === 2 && (
          <div>
            <div className="mb-5">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-burgundy-800 px-3 py-1 rounded-full bg-burgundy-50 inline-block mb-2">
                Step 2 of 3
              </span>
              <h3 className="font-extrabold text-[1.375rem] text-burgundy-950">
                Select Contribution Amount
              </h3>
              <p className="text-[0.8125rem] text-[#6B5A60]">
                Supporting: <strong>{currentCause.title}</strong>
              </p>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {presetAmounts.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleAmountSelect(val)}
                  className={`py-3 rounded-xl font-bold text-[1rem] tabular-nums border transition-all ${
                    amount === val && !customAmount
                      ? 'bg-burgundy-800 text-gold-200 border-burgundy-800 shadow-md'
                      : 'bg-canvas-light text-burgundy-900 border-burgundy-200 hover:border-burgundy-400'
                  }`}
                >
                  ₹{val.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                {t.donations.customAmount}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[1rem] font-bold text-burgundy-800">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="e.g. 15000"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-burgundy-200 focus:outline-none focus:ring-2 focus:ring-burgundy-800 text-[0.9375rem] font-semibold"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-[30%] py-3.5 rounded-xl bg-canvas-light border border-burgundy-200 text-burgundy-900 font-semibold text-[0.875rem]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-[70%] py-3.5 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.9375rem] shadow-lg flex items-center justify-center gap-2"
              >
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4 text-gold-300" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Donor Details & Confirmation */}
        {step === 3 && (
          <div>
            <div className="mb-5">
              <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-burgundy-800 px-3 py-1 rounded-full bg-burgundy-50 inline-block mb-2">
                Step 3 of 3
              </span>
              <h3 className="font-extrabold text-[1.375rem] text-burgundy-950">
                Review & Complete
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-canvas-light border border-burgundy-100 mb-5">
              <div className="flex justify-between items-center mb-1 text-[0.8125rem]">
                <span className="text-[#6B5A60]">Selected Cause:</span>
                <span className="font-bold text-burgundy-950">{currentCause.title}</span>
              </div>
              <div className="flex justify-between items-center text-[1.125rem] font-extrabold text-burgundy-900 border-t border-burgundy-200/60 pt-2 mt-2">
                <span>Total Amount:</span>
                <span className="text-gold-700 font-black">₹{amount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="space-y-3.5 mb-5">
              <div>
                <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                  {t.donations.donorName}
                </label>
                <input
                  type="text"
                  placeholder="e.g. K. Kunhali"
                  value={donorName}
                  disabled={isAnonymous}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-burgundy-800 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[0.8125rem] font-bold text-burgundy-950 mb-1">
                  {t.donations.donorEmail} *
                </label>
                <input
                  type="email"
                  required
                  placeholder="donor@example.com"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-burgundy-200 text-[0.875rem] focus:outline-none focus:ring-2 focus:ring-burgundy-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 text-burgundy-800 rounded border-burgundy-300 focus:ring-burgundy-800"
                />
                <label htmlFor="anonymousCheck" className="text-[0.8125rem] font-medium text-[#443539] cursor-pointer">
                  {t.donations.anonymous}
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-[30%] py-3.5 rounded-xl bg-canvas-light border border-burgundy-200 text-burgundy-900 font-semibold text-[0.875rem]"
              >
                Back
              </button>
              <button
                onClick={handleCompletePayment}
                disabled={isProcessing}
                className="w-[70%] py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-heritage-obsidian font-extrabold text-[0.9375rem] shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShieldCheck className="w-5 h-5 text-heritage-obsidian" />
                <span>
                  {isProcessing
                    ? 'Processing Demo Transaction...'
                    : `Complete ₹${amount.toLocaleString('en-IN')}`}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Instant Confirmation & Official Centenary Receipt */}
        {step === 4 && receipt && (
          <div className="text-center">
            <span className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 shadow">
              <CheckCircle className="w-8 h-8" />
            </span>

            <h3 className="font-extrabold text-[1.5rem] text-burgundy-950 mb-1">
              Contribution Received!
            </h3>
            <p className="text-[0.875rem] text-[#55474B] mb-6">
              Thank you for supporting the Samastha Centenary mission.
            </p>

            {/* Receipt Card */}
            <div className="p-6 rounded-2xl bg-canvas-light border-2 border-gold-400 text-left mb-6 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-burgundy-200/60 pb-3 mb-4">
                <span className="font-bold text-[0.8125rem] text-burgundy-900">
                  {t.donations.receiptTitle}
                </span>
                <span className="text-[0.75rem] font-mono font-bold text-gold-700">
                  {receipt.reference}
                </span>
              </div>

              <div className="space-y-2 text-[0.8125rem] text-[#332528]">
                <div className="flex justify-between">
                  <span className="text-[#6B5A60]">Donor:</span>
                  <span className="font-bold">{receipt.donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B5A60]">Cause:</span>
                  <span className="font-semibold">{receipt.causeTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B5A60]">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-t border-burgundy-200/60 pt-2 text-[1rem] font-black text-burgundy-950">
                  <span>Amount Paid:</span>
                  <span className="text-gold-700">₹{receipt.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className="text-[0.6875rem] text-[#7A696F] mt-4 pt-3 border-t border-burgundy-200/60 italic">
                {t.donations.receiptNotice}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-heritage-obsidian font-bold text-[0.875rem] flex items-center justify-center gap-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-burgundy-800 hover:bg-burgundy-700 text-gold-200 font-bold text-[0.875rem]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
