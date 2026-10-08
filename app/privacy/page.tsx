import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-12 space-y-6 text-muted-foreground text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-foreground">Privacy Policy</h1>
      <p className="text-xs text-muted-foreground">Last updated: October 2024</p>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-foreground">1. Information We Collect</h2>
        <p>
          We collect your email address, username, profile information, and local learning progress (completed steps, quiz scores, and bookmarks) to provide an educational service.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-foreground">2. How We Use Data</h2>
        <p>
          Your information is solely used to authenticate your session, save your project progress across devices, and deliver optional weekly newsletter digests. We do not sell user data to third parties.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-foreground">3. Local Storage & Cookies</h2>
        <p>
          Circuitly utilizes secure browser storage and session cookies to persist your learning progress and color mode preferences.
        </p>
      </section>
    </div>
  );
}
