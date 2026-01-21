const { PrismaClient } = require('./src/generated/prisma');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv/config');

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function checkVisitors() {
  try {
    console.log('Checking WebsiteVisitor records...\n');
    
    const visitors = await prisma.websiteVisitor.findMany({
      orderBy: { visitedAt: 'desc' },
      take: 20,
      select: {
        id: true,
        ipAddress: true,
        deviceType: true,
        visitedAt: true,
        day: true,
        month: true,
        year: true,
      }
    });
    
    console.log(`Total recent visitors: ${visitors.length}`);
    console.log('\nRecent visitor records:');
    visitors.forEach(v => {
      console.log(`- ${v.day} | ${v.visitedAt.toISOString()} | ${v.deviceType} | ${v.ipAddress}`);
    });
    
    console.log('\n\nChecking VisitorStats...\n');
    const stats = await prisma.visitorStats.findMany({
      orderBy: { periodValue: 'desc' },
      take: 10,
    });
    
    console.log(`Total stats records: ${stats.length}`);
    stats.forEach(s => {
      console.log(`- ${s.period} | ${s.periodValue} | Total: ${s.totalVisitors} | Mobile: ${s.mobileCount} | Desktop: ${s.desktopCount}`);
    });
    
    // Check for any errors in the last few days
    console.log('\n\nChecking date range...');
    const today = new Date();
    const jan17 = new Date('2026-01-17');
    console.log(`Today: ${today.toISOString()}`);
    console.log(`Jan 17: ${jan17.toISOString()}`);
    console.log(`Days difference: ${Math.floor((today - jan17) / (1000 * 60 * 60 * 24))}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkVisitors();
