import { PrismaClient } from '@prisma/client';
import { seedExample } from './seeds';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  console.log('Iniciando seeds...');

  await Promise.all([seedExample(prisma)]);

  console.log('Seeds finalizados com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao executar seeds:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
