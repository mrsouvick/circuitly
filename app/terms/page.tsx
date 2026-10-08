import React from 'react';

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-12 space-y-6 text-muted-foreground text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-foreground">Terms of Service</h1>
      <p className="text-xs text-muted-foreground">Last updated: October 2024</p>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-foreground">1. Permitted Use</h2>
        <p>
          All tutorial sketches, schematics, and curriculum documentation provided on Circuitly are licensed for personal, educational, and classroom teaching purposes.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-foreground">2. Hardware Safety Disclaimer</h2>
        <p>
          Makers are responsible for verifying electrical wiring, observing appropriate component voltage ratings, and employing safety precautions when handling power supplies or high-voltage relays.
        </p>
      </section>
    </div>
  );
}
