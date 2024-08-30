// app/api/getUserSubscription/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
	const { email } = await request.json();

	if (!email) {
		return NextResponse.json({ error: 'Email is required' }, { status: 400 });
	}

	try {
		const user = await db
			.select({
				subscriptionTier: users.subscriptionTier,
				subscriptionStatus: users.subscriptionStatus,
				paypalSubscriptionId: users.paypalSubscriptionId,
			})
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (user.length === 0) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json(user[0]);
	} catch (error) {
		console.error('Error fetching user subscription:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
