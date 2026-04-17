const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

// 简单的 MD5 实现（用于 seed）
function md5(text) {
  return crypto.createHash('md5').update(text).digest('hex');
}

async function main() {
  // 创建邀请码
  const invite = await prisma.invite.upsert({
    where: { invitecode: 'test123' },
    update: {},
    create: {
      invitecode: 'test123',
      status: 1,
    },
  });
  console.log('创建邀请码:', invite);

  // 创建测试用户
  const admin = await prisma.admin.upsert({
    where: { username: 'test' },
    update: {},
    create: {
      username: 'test',
      password: md5('test123'),
      status: 1,
    },
  });
  console.log('创建测试用户:', admin);

  // 检查背包是否已存在
  const existingBag = await prisma.bag.findFirst({
    where: { admin_id: admin.id },
  });

  let bag;
  if (!existingBag) {
    bag = await prisma.bag.create({
      data: {
        admin_id: admin.id,
        soldiermax: 10,
        battlemax: 2,
        status: 1,
      },
    });
    console.log('创建背包:', bag);
  } else {
    bag = existingBag;
    console.log('背包已存在:', bag);
  }

  // 创建测试区服
  const zone = await prisma.zone.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: '测试区服',
      index: 1,
      status: 1,
      tag: 'test',
      player_counts: 0,
    },
  });
  console.log('创建区服:', zone);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
