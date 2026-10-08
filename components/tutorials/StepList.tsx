'use client';

import React from 'react';
import Image from 'next/image';
import { Check, CheckCircle2 } from 'lucide-react';
import { StepItem } from '@/types';
import { useProgress } from '@/hooks/useProgress';
import { Progress } from '@/components/ui/progress';

export function StepList({
  steps,
  tutorialId,
}: {
  steps: StepItem[];
  tutorialId: string;
}) {
  const { toggleStep, isStepCompleted, markTutorialComplete } = useProgress();

  const completedCount = steps.filter((s) => isStepCompleted(tutorialId, s.order)).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const handleStepToggle = (order: number) => {
    toggleStep(tutorialId, order);
    if (completedCount + 1 === steps.length) {
      markTutorialComplete(tutorialId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress header */}
      <div className="rounded-2xl border border-border/80 bg-card/60 p-5 space-y-3">
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#059669]" />
            Build Steps Progress: {completedCount} of {steps.length} completed
          </span>
          <span className="font-mono text-[#059669] font-bold">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} indicatorColor="bg-[#059669]" />
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step) => {
          const completed = isStepCompleted(tutorialId, step.order);

          return (
            <div
              key={step.order}
              onClick={() => handleStepToggle(step.order)}
              className={`group flex flex-col md:flex-row items-start gap-4 rounded-2xl border p-5 transition-all cursor-pointer ${
                completed
                  ? 'border-[#A7F3D0] bg-[#ECFDF5]'
                  : 'border-border/80 bg-card/40 hover:border-border hover:bg-card/70'
              }`}
            >
              {/* Checkbox circle */}
              <div
                className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border transition-all ${
                  completed
                    ? 'border-[#059669] bg-[#059669] text-white shadow-sm'
                    : 'border-border bg-secondary text-transparent group-hover:border-primary/60'
                }`}
              >
                <Check className="h-4 w-4 stroke-[3]" />
              </div>

              {/* Step info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold uppercase text-primary">
                    Step {step.order}
                  </span>
                  <h4
                    className={`text-base font-semibold transition-colors ${
                      completed ? 'text-muted-foreground line-through' : 'text-foreground'
                    }`}
                  >
                    {step.title}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {step.image_url && (
                  <div className="relative mt-3 h-48 w-full max-w-md overflow-hidden rounded-xl border border-border/60 bg-muted">
                    <Image
                      src={step.image_url}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
