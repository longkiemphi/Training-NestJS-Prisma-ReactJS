const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const rounds = parseInt(process.env.ROUND_OF_HASHING || '10', 10); // Default to 10 if not provided
    if (isNaN(rounds)) {
        throw new Error('Invalid ROUND_OF_HASHING value. It must be a number.');
    }

    try {
        // Hash the super admin password
        const superadminPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, rounds);

        // Try creating or upserting the super admin user
        const superAdmin = await prisma.user.upsert({
            where: { email: process.env.SUPER_ADMIN_USERNAME },
            update: {},
            create: {
                email: process.env.SUPER_ADMIN_USERNAME,
                name: 'Super Admin',
                password: superadminPassword,
            },
        });

        console.log('Super admin user upserted:', { superAdmin });
    } catch (error) {
        if (error.code === 'P2002' && error.meta?.target.includes('email')) {
            console.error('Super admin user already exists:', error.message);
        } else {
            console.error('Error creating/updating super admin user:', error.message);
        }
    }
}

main()
    .catch((e) => {
        console.error('Unhandled error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
