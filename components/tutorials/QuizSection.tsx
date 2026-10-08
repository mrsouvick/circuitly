'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, XCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizItem } from '@/types';
import { useProgress } from '@/hooks/useProgress';

export function QuizSection({
  quiz,
  tutorialId,
}: {
  quiz: QuizItem[];
  tutorialId: string;
}) {
  const { saveQuizScore } = useProgress();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz || quiz.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
        No quiz available for this project yet.
      </div>
    );
  }

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (submitted) return; // Locked once submitted
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct_answer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.length) * 100);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    saveQuizScore(tutorialId, score);

    if (score === 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = submitted ? calculateScore() : 0;
  const allAnswered = Object.keys(selectedAnswers).length === quiz.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div>
          <h3 className="text-xl font-bold text-foreground">Interactive Knowledge Check</h3>
          <p className="text-sm text-muted-foreground">
            Test your understanding of the electrical engineering and code concepts.
          </p>
        </div>
        {submitted && (
          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-bold px-3 py-1 rounded-xl border ${
                score >= 80
                  ? 'bg-[#00E5A0]/20 text-[#00E5A0] border-[#00E5A0]/40'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}
            >
              {score}% Score
            </span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {quiz.map((item, qIndex) => {
          const isAnswered = selectedAnswers[qIndex] !== undefined;
          const selectedOption = selectedAnswers[qIndex];
          const isCorrect = submitted && selectedOption === item.correct_answer;
          const isWrong = submitted && selectedOption !== item.correct_answer;

          return (
            <Card
              key={qIndex}
              className={`p-6 transition-all border ${
                submitted
                  ? isCorrect
                    ? 'border-[#00E5A0]/50 bg-[#00E5A0]/5'
                    : 'border-destructive/50 bg-destructive/5'
                  : 'border-border/80 bg-card/40'
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary">
                  Q{qIndex + 1}
                </span>
                <h4 className="text-base font-semibold text-foreground pt-0.5 leading-snug">
                  {item.question}
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {item.options.map((opt, optIndex) => {
                  const isSelected = selectedOption === optIndex;
                  let optionStyles = 'border-border/80 bg-secondary/30 hover:bg-secondary/60 text-muted-foreground';

                  if (isSelected && !submitted) {
                    optionStyles = 'border-primary bg-primary/10 text-foreground font-semibold shadow-[0_0_15px_rgba(0,229,160,0.15)]';
                  } else if (submitted) {
                    if (optIndex === item.correct_answer) {
                      optionStyles = 'border-[#00E5A0] bg-[#00E5A0]/20 text-[#00E5A0] font-semibold';
                    } else if (isSelected && isWrong) {
                      optionStyles = 'border-destructive bg-destructive/20 text-destructive line-through';
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(qIndex, optIndex)}
                      className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-sm transition-all select-none ${optionStyles}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIndex === item.correct_answer && (
                        <CheckCircle className="h-4 w-4 text-[#00E5A0] shrink-0 ml-2" />
                      )}
                      {submitted && isSelected && isWrong && (
                        <XCircle className="h-4 w-4 text-destructive shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && item.explanation && (
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
                  <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Explanation:</strong> {item.explanation}
                  </span>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Quiz Actions */}
      <div className="flex items-center justify-between pt-4">
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            variant="mint"
            size="lg"
            className="w-full sm:w-auto shadow-md"
          >
            Submit Answers ({Object.keys(selectedAnswers).length}/{quiz.length})
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-5 w-5 text-primary" />
              <span>
                You got {quiz.filter((q, i) => selectedAnswers[i] === q.correct_answer).length} of {quiz.length} questions correct!
              </span>
            </div>
            <Button onClick={handleReset} variant="outline" size="sm" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
