import { PrismaClient, UserRole, InvestorTier, CampaignStatus, PaymentRail, InvestmentStatus, DocumentType, NotificationLevel, KycStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  const passwordHash = await bcrypt.hash('Demo1234!', 12);

  // --- Users ---

  // Founder
  const founder = await prisma.user.upsert({
    where: { email: 'yassine@fundos.io' },
    update: {},
    create: {
      email: 'yassine@fundos.io',
      passwordHash,
      role: UserRole.FOUNDER,
      firstName: 'Yassine',
      lastName: 'Fundos',
      kycStatus: KycStatus.VERIFIED,
      founderProfile: {
        create: {
          companyName: 'FundOS Inc.',
          companyRegNumber: 'FR123456789',
          bio: 'Building the future of startup financing.',
          website: 'https://fundos.io',
          credibilityScore: 88.5,
        }
      }
    },
    include: { founderProfile: true }
  });

  // Investor 1: Sarah
  const sarah = await prisma.user.upsert({
    where: { email: 'sarah@fundos.io' },
    update: {},
    create: {
      email: 'sarah@fundos.io',
      passwordHash,
      role: UserRole.INVESTOR,
      firstName: 'Sarah',
      lastName: 'Martin',
      kycStatus: KycStatus.VERIFIED,
      investorProfile: {
        create: {
          tier: InvestorTier.QUALIFIED,
          country: 'France',
          sectors: ['fintech', 'AI', 'Web3'],
          wallets: {
            createMany: {
              data: [
                { rail: PaymentRail.EUR_FIAT, address: 'FR7630006000012345678901234', isVerified: true, balance: 50000 },
                { rail: PaymentRail.USDC, address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', isVerified: true, balance: 10000 }
              ]
            }
          }
        }
      }
    },
    include: { investorProfile: true }
  });

  // Investor 2: Omar
  const omar = await prisma.user.upsert({
    where: { email: 'omar@fundos.io' },
    update: {},
    create: {
      email: 'omar@fundos.io',
      passwordHash,
      role: UserRole.INVESTOR,
      firstName: 'Omar',
      lastName: 'Bennani',
      kycStatus: KycStatus.VERIFIED,
      investorProfile: {
        create: {
          tier: InvestorTier.RETAIL,
          country: 'Morocco',
          sectors: ['fintech', 'SaaS', 'MENA'],
          wallets: {
            create: {
              rail: PaymentRail.EUR_FIAT,
              address: 'MA64000100001234567890123456',
              isVerified: true,
              balance: 5000
            }
          }
        }
      }
    },
    include: { investorProfile: true }
  });

  // --- Campaigns ---

  const fundosCampaign = await prisma.campaign.upsert({
    where: { slug: 'fundos-seed' },
    update: {},
    create: {
      founderId: founder.founderProfile!.id,
      title: 'FundOS Seed',
      slug: 'fundos-seed',
      description: 'The OS for private markets.',
      targetAmount: 500000,
      raisedAmount: 187500,
      status: CampaignStatus.ACTIVE,
      stage: 'Seed',
      confidenceScore: 84.2,
      confidenceLevel: 'Strong',
      scoreHistory: {
        createMany: {
          data: [
            { score: 61.0, dimension: 'overall', reason: 'Initial submission' },
            { score: 74.5, dimension: 'overall', reason: 'Team & Product validated' },
            { score: 84.2, dimension: 'overall', reason: 'Strong market traction and lead investor joined' }
          ]
        }
      }
    }
  });

  const harvestCampaign = await prisma.campaign.upsert({
    where: { slug: 'harvest-ai' },
    update: {},
    create: {
      founderId: founder.founderProfile!.id,
      title: 'HarvestAI Pre-Seed',
      slug: 'harvest-ai',
      description: 'AI-driven agricultural optimization.',
      targetAmount: 250000,
      raisedAmount: 2500,
      status: CampaignStatus.ACTIVE,
      stage: 'Pre-Seed',
      confidenceScore: 72.1,
      confidenceLevel: 'Moderate',
      scoreHistory: {
        create: { score: 72.1, dimension: 'overall', reason: 'Novel AI approach in AgTech' }
      }
    }
  });

  // --- Investments ---

  // Sarah on FundOS
  await prisma.investment.create({
    data: {
      investorId: sarah.investorProfile!.id,
      campaignId: fundosCampaign.id,
      amount: 10000,
      rail: PaymentRail.EUR_FIAT,
      status: InvestmentStatus.SETTLED,
      txHash: 'tx_sarah_fundos_001',
      auditLogs: {
        create: {
          userId: sarah.id,
          action: 'CREATE',
          entity: 'Investment',
          entityId: 'AUTO', // Will be updated by trigger/logic in real app
          changes: { amount: 10000 }
        }
      }
    }
  });

  // Sarah on HarvestAI (Escrow)
  await prisma.investment.create({
    data: {
      investorId: sarah.investorProfile!.id,
      campaignId: harvestCampaign.id,
      amount: 2500,
      rail: PaymentRail.USDC,
      status: InvestmentStatus.ESCROWED,
      txHash: '0xSarahHarvestEscrow',
      escrow: {
        create: {
          escrowAddress: '0xEscrowContractAddress',
          status: 'LOCKED'
        }
      }
    }
  });

  // Omar on FundOS (Escrow)
  await prisma.investment.create({
    data: {
      investorId: omar.investorProfile!.id,
      campaignId: fundosCampaign.id,
      amount: 1500,
      rail: PaymentRail.EUR_FIAT,
      status: InvestmentStatus.ESCROWED,
      txHash: 'tx_omar_fundos_001'
    }
  });

  // --- Other Data ---

  // Watchlist for Omar
  await prisma.watchlistItem.createMany({
    data: [
      { investorId: omar.investorProfile!.id, campaignId: fundosCampaign.id },
      { investorId: omar.investorProfile!.id, campaignId: harvestCampaign.id }
    ]
  });

  // Notification for Yassine
  await prisma.notification.create({
    data: {
      userId: founder.id,
      title: 'New Investment',
      message: 'Sarah Martin just invested €10,000 in FundOS Seed!',
      level: NotificationLevel.SUCCESS,
      channels: [NotificationChannel.SSE, NotificationChannel.EMAIL]
    }
  });

  console.log('✅ Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
