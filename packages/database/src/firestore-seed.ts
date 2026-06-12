import { Firestore } from '@google-cloud/firestore';

/**
 * Firestore seed for FundOS demo.
 */
async function seedFirestore() {
  console.log('🔥 Starting Firestore seed...');
  const projectId = process.env.GOOGLE_CLOUD_PROJECT || 'fundos-demo';

  const db = new Firestore({
    projectId,
    databaseId: 'eur3' // As requested: multi-region eur3
  });

  const signals = [
    {
      id: 'signal_fundos_seed',
      campaignId: 'fundos-seed',
      score: 84.2,
      level: 'STRONG',
      factors: [
        { label: 'Lead Investor', value: 'High', impact: 15 },
        { label: 'Market Timing', value: 'Strong', impact: 10 },
        { label: 'Velocity', value: '25% in 48h', impact: 20 }
      ],
      narrative: 'FundOS is showing exceptional traction with a strong institutional lead.',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'signal_harvest_ai',
      campaignId: 'harvest-ai',
      score: 72.1,
      level: 'MODERATE',
      factors: [
        { label: 'Tech Innovation', value: 'High', impact: 25 },
        { label: 'Burn Rate', value: 'Low', impact: 5 }
      ],
      narrative: 'HarvestAI has a solid technical foundation but needs more market validation.',
      updatedAt: new Date().toISOString()
    }
  ];

  // Batch write signals
  const batch = db.batch();
  for (const signal of signals) {
    const ref = db.collection('confidence_signals').doc(signal.id);
    batch.set(ref, signal);
  }

  // Sarah's Brief
  const sarahBriefRef = db.collection('ai_briefs').doc('brief_sarah_fundos');
  batch.set(sarahBriefRef, {
    id: 'brief_sarah_fundos',
    investorId: 'sarah_id',
    campaignId: 'fundos-seed',
    matchResult: {
      score: 0.95,
      reasons: ['Strong fintech focus', 'Accredited tier matches target'],
      risks: ['High valuation']
    },
    content: 'This project aligns with your interests in Fintech and your previous investments in SaaS infrastructure.',
    generatedAt: new Date().toISOString()
  });

  // Sarah's Profile
  const sarahProfileRef = db.collection('investor_profiles').doc('sarah_id');
  batch.set(sarahProfileRef, {
    investorId: 'sarah_id',
    behavioralTags: ['active', 'high-conviction', 'early-adopter'],
    riskProfile: 'AGGRESSIVE',
    copilotContext: 'Sarah prefers data-driven narratives and focuses on scalability metrics.',
    preferences: {
      minTicket: 1000,
      maxTicket: 50000,
      preferredSectors: ['fintech', 'AI', 'Web3']
    }
  });

  await batch.commit();

  console.log(`✅ Firestore seed for project ${projectId} completed.`);
}

seedFirestore().catch(e => {
  console.error('Firestore seed failed (likely no GCP credentials or local emulator):', e.message);
  // We don't exit with 1 to allow the main seed path to continue in CI/Demo if Firestore is optional
});
