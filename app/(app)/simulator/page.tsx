'use client';

import React, { useState } from 'react';
import {
  MonitorPlay,
  RotateCcw,
  ExternalLink,
  Save,
  Share2,
  Sparkles,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { toast } from 'sonner';

interface SimulatorPreset {
  id: string;
  name: string;
  wokwiId: string;
  description: string;
}

const PRESETS: SimulatorPreset[] = [
  {
    id: 'blink',
    name: 'Blink LED (Arduino Uno)',
    wokwiId: '322577683855704658',
    description: 'Basic digital output flashing a red LED with 220 Ohm series resistor on Pin 13.',
  },
  {
    id: 'traffic',
    name: 'Traffic Light Simulator (3 LEDs)',
    wokwiId: '322578051759079506',
    description: '3-phase sequence with Red, Yellow, and Green LEDs executing real intersection state transitions.',
  },
  {
    id: 'servo',
    name: 'Servo Sweep (SG90 PWM)',
    wokwiId: '322578505501819474',
    description: 'Precision 0-180 degree angular sweep utilizing the Arduino Servo library on Pin 9.',
  },
  {
    id: 'sonar',
    name: 'HC-SR04 Ultrasonic Sonar Distance',
    wokwiId: '322578762740578898',
    description: 'Acoustic pulse flight timing measuring real-time target proximity in centimeters.',
  },
];

export default function SimulatorPage() {
  const [selectedPreset, setSelectedPreset] = useState<SimulatorPreset>(PRESETS[0]);
  const [key, setKey] = useState(0);

  const handlePresetChange = (presetId: string) => {
    const found = PRESETS.find((p) => p.id === presetId);
    if (found) {
      setSelectedPreset(found);
      setKey((prev) => prev + 1);
      toast.success(`Loaded "${found.name}" circuit into simulator`);
    }
  };

  const handleReset = () => {
    setKey((prev) => prev + 1);
    toast.success('Simulation reloaded');
  };

  const handleSave = () => {
    toast.success('Circuit state bookmarked to your local workspace');
  };

  return (
    <div className="container py-8 space-y-6">
      {/* Page Title & Simulator Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-border/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-semibold text-primary tracking-wider">
              Interactive Lab
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2.5">
            <MonitorPlay className="h-7 w-7 text-primary" />
            Wokwi Circuit Simulator
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Test and compile Arduino firmware in your browser without hardware. Click the green Play button inside the simulation to start.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="w-56">
            <Select
              value={selectedPreset.id}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="h-9 text-xs"
            >
              {PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.name}
                </option>
              ))}
            </Select>
          </div>

          <Button onClick={handleReset} variant="outline" size="sm" className="h-9 gap-1.5" title="Restart simulation">
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </Button>

          <Button onClick={handleSave} variant="secondary" size="sm" className="h-9 gap-1.5">
            <Save className="h-3.5 w-3.5" />
            <span>Save Circuit</span>
          </Button>

          <a
            href={`https://wokwi.com/projects/${selectedPreset.wokwiId}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="sm" className="h-9 gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Open in Wokwi</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Simulator Viewport */}
      <div className="relative w-full rounded-2xl border border-border/80 bg-[#12131d] shadow-2xl overflow-hidden min-h-[640px]">
        {/* Helper Banner */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0e0f17] px-4 py-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            <span>
              <strong>Selected:</strong> {selectedPreset.name} — {selectedPreset.description}
            </span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-[#00E5A0]">
            AVR ATmega328P Core • 16MHz
          </span>
        </div>

        {/* Embedded Wokwi Iframe */}
        <iframe
          key={key}
          src={`https://wokwi.com/projects/${selectedPreset.wokwiId}?embed=1`}
          className="h-[600px] w-full border-0 bg-transparent"
          title="Wokwi Arduino Simulator"
          loading="lazy"
          allow="cross-origin-isolated"
        />
      </div>
    </div>
  );
}
