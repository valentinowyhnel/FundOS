'use client';

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { colors, typography, spacing, radius, shadows } from '@fundos/design-system';

export default function DevTokensPage() {
  return (
    <AppShell>
      <div className="space-y-16">
        <section>
          <h2 className="text-h2 font-display font-semibold mb-8 border-b pb-4">Color Palette</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-h4 mb-4">Surface & Border</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(colors.surface).map(([name, hex]) => (
                  <ColorSwatch key={name} name={`surface.${name}`} hex={hex} />
                ))}
                {Object.entries(colors.border).map(([name, hex]) => (
                  <ColorSwatch key={name} name={`border.${name}`} hex={hex} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-h4 mb-4">Text</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(colors.text).map(([name, hex]) => (
                  <ColorSwatch key={name} name={`text.${name}`} hex={hex} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-h4 mb-4">Accents</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(colors.accent).map(([name, hex]) => (
                  <ColorSwatch key={name} name={`accent.${name}`} hex={hex} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-h2 font-display font-semibold mb-8 border-b pb-4">Typography</h2>
          <div className="space-y-6">
            {Object.keys(typography.sizes).map((size) => (
              <div key={size} className="flex items-baseline gap-8 border-b border-surface-muted pb-4">
                <span className="w-40 text-caption text-text-tertiary font-mono">{size}</span>
                <span className={`text-${size}`}>The quick brown fox jumps over the lazy dog</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-h2 font-display font-semibold mb-8 border-b pb-4">Shadows</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.keys(shadows).map((shadow) => (
              <div key={shadow} className="flex flex-col gap-4">
                <div className={`h-32 w-full rounded-default bg-white shadow-${shadow}`} />
                <span className="text-caption text-center font-mono">{shadow}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-h2 font-display font-semibold mb-8 border-b pb-4">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.keys(radius).map((r) => (
              <div key={r} className="flex flex-col gap-2">
                <div className={`h-20 w-full bg-accent-primary rounded-${r}`} />
                <span className="text-caption font-mono">{r}: {radius[r as keyof typeof radius]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-20 w-full rounded-small border border-border-default shadow-subtle"
        style={{ backgroundColor: hex }}
      />
      <div className="flex flex-col">
        <span className="text-caption font-semibold truncate">{name}</span>
        <span className="text-[10px] text-text-tertiary font-mono uppercase">{hex}</span>
      </div>
    </div>
  );
}
