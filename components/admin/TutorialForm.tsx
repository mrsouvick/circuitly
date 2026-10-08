'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Plus,
  Trash2,
  Code2,
  Layers,
  HelpCircle,
  Award,
  CheckCircle,
  Eye,
  FileCode,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tutorial, ComponentItem, StepItem, TroubleshootingItem, QuizItem } from '@/types';
import { INITIAL_CATEGORIES } from '@/lib/seedData';
import { DataStore } from '@/lib/data/store';
import { slugify, formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

interface TutorialFormProps {
  initialTutorial?: Tutorial;
  isEditing?: boolean;
}

export function TutorialForm({ initialTutorial, isEditing = false }: TutorialFormProps) {
  const router = useRouter();

  // Tab 1: Basic Info
  const [title, setTitle] = useState(initialTutorial?.title || '');
  const [slug, setSlug] = useState(initialTutorial?.slug || '');
  const [description, setDescription] = useState(initialTutorial?.description || '');
  const [categoryId, setCategoryId] = useState(initialTutorial?.category_id || INITIAL_CATEGORIES[0].id);
  const [difficulty, setDifficulty] = useState<Tutorial['difficulty']>(initialTutorial?.difficulty || 'beginner');
  const [timeEstimate, setTimeEstimate] = useState<number>(initialTutorial?.time_estimate || 20);
  const [costEstimate, setCostEstimate] = useState<number>(initialTutorial?.cost_estimate || 10);
  const [heroImage, setHeroImage] = useState(initialTutorial?.hero_image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80');
  const [circuitDiagram, setCircuitDiagram] = useState(initialTutorial?.circuit_diagram || 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80');
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>(
    initialTutorial?.learning_outcomes || ['Understand core wiring and pinout logic', 'Compile firmware with Arduino IDE']
  );
  const [prerequisites, setPrerequisites] = useState<string[]>(
    initialTutorial?.prerequisites || ['Basic breadboard knowledge']
  );
  const [isPublished, setIsPublished] = useState(initialTutorial?.is_published ?? true);

  // Tab 2: Components
  const [components, setComponents] = useState<ComponentItem[]>(
    initialTutorial?.components || [
      { name: 'Arduino Uno R3', quantity: 1, price: 3.5, buy_url: 'https://store.arduino.cc' },
      { name: 'Red 5mm LED', quantity: 1, price: 0.2, buy_url: 'https://adafruit.com' },
      { name: '220Ω Resistor', quantity: 1, price: 0.1, buy_url: 'https://digikey.com' },
    ]
  );

  // Tab 3: Code & Steps
  const [code, setCode] = useState(
    initialTutorial?.code ||
      `void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}`
  );
  const [steps, setSteps] = useState<StepItem[]>(
    initialTutorial?.steps || [
      {
        order: 1,
        title: 'Insert LED into breadboard',
        description: 'Observe anode and cathode leads carefully across two separate rows.',
        image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      },
    ]
  );

  // Tab 4: Troubleshooting & Quiz
  const [troubleshooting, setTroubleshooting] = useState<TroubleshootingItem[]>(
    initialTutorial?.troubleshooting || [
      {
        question: 'Why does the LED not light up?',
        answer: 'Check LED polarity. The longer leg is the anode and connects towards the positive supply pin.',
      },
    ]
  );
  const [quiz, setQuiz] = useState<QuizItem[]>(
    initialTutorial?.quiz || [
      {
        question: 'What is the positive leg of an LED called?',
        options: ['Cathode', 'Anode', 'Emitter', 'Base'],
        correct_answer: 1,
        explanation: 'The anode is the positive terminal.',
      },
    ]
  );

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isEditing || !slug) {
      setSlug(slugify(newTitle));
    }
  };

  const handleSave = async (publishState = isPublished) => {
    if (!title.trim() || !slug.trim()) {
      toast.error('Title and slug are required');
      return;
    }

    const payload: Tutorial = {
      id: initialTutorial?.id || 'tut-' + Date.now(),
      title,
      slug,
      description,
      category_id: categoryId,
      difficulty,
      time_estimate: Number(timeEstimate),
      cost_estimate: Number(costEstimate),
      hero_image: heroImage,
      circuit_diagram: circuitDiagram,
      learning_outcomes: learningOutcomes.filter((o) => o.trim().length > 0),
      prerequisites: prerequisites.filter((p) => p.trim().length > 0),
      components,
      code,
      steps,
      troubleshooting,
      quiz,
      views_count: initialTutorial?.views_count || 0,
      completions_count: initialTutorial?.completions_count || 0,
      is_published: publishState,
      created_at: initialTutorial?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/admin/tutorials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        DataStore.saveTutorial(payload);
        toast.success(
          isEditing
            ? `Tutorial "${title}" updated successfully in database!`
            : `Tutorial "${title}" created and published!`
        );
        router.push('/admin/tutorials');
      } else {
        const errJson = await res.json();
        toast.error(errJson.error || 'Failed to save to database');
      }
    } catch (err) {
      // Fallback
      DataStore.saveTutorial(payload);
      toast.success('Saved tutorial locally');
      router.push('/admin/tutorials');
    }
  };

  // Component Helpers
  const addComponent = () => {
    setComponents([...components, { name: '', quantity: 1, price: 1.0, buy_url: '' }]);
  };
  const removeComponent = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  // Step Helpers
  const addStep = () => {
    setSteps([
      ...steps,
      {
        order: steps.length + 1,
        title: '',
        description: '',
        image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      },
    ]);
  };
  const removeStep = (index: number) => {
    setSteps(
      steps.filter((_, i) => i !== index).map((s, idx) => ({ ...s, order: idx + 1 }))
    );
  };

  // Quiz Helpers
  const addQuizQuestion = () => {
    setQuiz([
      ...quiz,
      {
        question: '',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct_answer: 0,
        explanation: '',
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {isEditing ? `Edit: ${initialTutorial?.title}` : 'Create New Arduino Tutorial'}
          </h2>
          <p className="text-xs text-muted-foreground">
            Configure metadata, bill-of-materials, Arduino firmware, build steps, and quiz questions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSave(false)}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            variant="mint"
            size="sm"
            onClick={() => handleSave(true)}
            className="gap-1.5 shadow-md"
          >
            <Save className="h-4 w-4" />
            <span>Publish Tutorial</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="bg-secondary/60 p-1 rounded-2xl w-full justify-start overflow-x-auto">
          <TabsTrigger value="basic" className="text-xs gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            1. Basic Metadata
          </TabsTrigger>
          <TabsTrigger value="components" className="text-xs gap-1.5">
            <Award className="h-3.5 w-3.5" />
            2. Components BOM ({components.length})
          </TabsTrigger>
          <TabsTrigger value="code_steps" className="text-xs gap-1.5">
            <FileCode className="h-3.5 w-3.5" />
            3. Code & Steps ({steps.length})
          </TabsTrigger>
          <TabsTrigger value="trouble_quiz" className="text-xs gap-1.5">
            <HelpCircle className="h-3.5 w-3.5" />
            4. FAQ & Quiz ({quiz.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Basic Info */}
        <TabsContent value="basic" className="pt-4 space-y-4">
          <Card className="border-border/80 bg-card/60 p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Title *</label>
                <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">URL Slug *</label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Comprehensive Description (150+ words recommended)
              </label>
              <Textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Category</label>
                <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                  {INITIAL_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Difficulty</label>
                <Select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Tutorial['difficulty'])}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Time (min)</label>
                <Input
                  type="number"
                  value={timeEstimate}
                  onChange={(e) => setTimeEstimate(Number(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Cost ($)</label>
                <Input
                  type="number"
                  step="0.5"
                  value={costEstimate}
                  onChange={(e) => setCostEstimate(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Hero Image URL</label>
                <Input value={heroImage} onChange={(e) => setHeroImage(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">Circuit Diagram URL</label>
                <Input value={circuitDiagram} onChange={(e) => setCircuitDiagram(e.target.value)} />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 2: Components */}
        <TabsContent value="components" className="pt-4 space-y-4">
          <Card className="border-border/80 bg-card/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">Hardware Bill of Materials</h3>
                <p className="text-xs text-muted-foreground">
                  Total BOM: {formatPrice(components.reduce((sum, c) => sum + c.price * c.quantity, 0))}
                </p>
              </div>
              <Button type="button" onClick={addComponent} variant="outline" size="sm" className="gap-1 text-xs">
                <Plus className="h-3.5 w-3.5" />
                Add Component
              </Button>
            </div>

            <div className="space-y-3">
              {components.map((comp, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-2 items-center rounded-xl bg-secondary/30 p-2 border border-border/40">
                  <Input
                    placeholder="Component Name (e.g. HC-SR04)"
                    value={comp.name}
                    onChange={(e) => {
                      const updated = [...components];
                      updated[idx].name = e.target.value;
                      setComponents(updated);
                    }}
                    className="h-8 text-xs flex-1"
                  />
                  <Input
                    type="number"
                    min={1}
                    placeholder="Qty"
                    value={comp.quantity}
                    onChange={(e) => {
                      const updated = [...components];
                      updated[idx].quantity = parseInt(e.target.value) || 1;
                      setComponents(updated);
                    }}
                    className="h-8 text-xs w-20"
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Price ($)"
                    value={comp.price}
                    onChange={(e) => {
                      const updated = [...components];
                      updated[idx].price = parseFloat(e.target.value) || 0;
                      setComponents(updated);
                    }}
                    className="h-8 text-xs w-24"
                  />
                  <Input
                    placeholder="Buy URL"
                    value={comp.buy_url}
                    onChange={(e) => {
                      const updated = [...components];
                      updated[idx].buy_url = e.target.value;
                      setComponents(updated);
                    }}
                    className="h-8 text-xs flex-1"
                  />
                  <Button
                    type="button"
                    onClick={() => removeComponent(idx)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Tab 3: Code & Steps */}
        <TabsContent value="code_steps" className="pt-4 space-y-6">
          <Card className="border-border/80 bg-card/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground">Arduino C++ Sketch</h3>
            <Textarea
              rows={12}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-xs leading-relaxed bg-[#0c0d15] text-emerald-200"
            />
          </Card>

          <Card className="border-border/80 bg-card/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">Build Step Sequence</h3>
              <Button type="button" onClick={addStep} variant="outline" size="sm" className="gap-1 text-xs">
                <Plus className="h-3.5 w-3.5" />
                Add Step
              </Button>
            </div>

            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border/40 bg-secondary/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-primary">Step {step.order}</span>
                    <Button
                      type="button"
                      onClick={() => removeStep(idx)}
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Remove
                    </Button>
                  </div>
                  <Input
                    placeholder="Step Title"
                    value={step.title}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].title = e.target.value;
                      setSteps(updated);
                    }}
                    className="h-8 text-xs font-semibold"
                  />
                  <Textarea
                    placeholder="Detailed wiring description..."
                    rows={2}
                    value={step.description}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].description = e.target.value;
                      setSteps(updated);
                    }}
                    className="text-xs"
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Tab 4: FAQ & Quiz */}
        <TabsContent value="trouble_quiz" className="pt-4 space-y-6">
          <Card className="border-border/80 bg-card/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-foreground">Interactive Quiz Items</h3>
            <div className="space-y-4">
              {quiz.map((q, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-border/40 bg-secondary/20 space-y-3">
                  <span className="text-xs font-mono font-bold text-primary">Question {idx + 1}</span>
                  <Input
                    placeholder="Quiz Question"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...quiz];
                      updated[idx].question = e.target.value;
                      setQuiz(updated);
                    }}
                    className="h-8 text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          name={`quiz-correct-${idx}`}
                          checked={q.correct_answer === optIdx}
                          onChange={() => {
                            const updated = [...quiz];
                            updated[idx].correct_answer = optIdx;
                            setQuiz(updated);
                          }}
                        />
                        <Input
                          value={opt}
                          onChange={(e) => {
                            const updated = [...quiz];
                            updated[idx].options[optIdx] = e.target.value;
                            setQuiz(updated);
                          }}
                          className="h-7 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <Button type="button" onClick={addQuizQuestion} variant="outline" size="sm" className="text-xs gap-1">
                <Plus className="h-3.5 w-3.5" />
                Add Question
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
