// hooks/useSubscription.ts

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export function useSubscription() {
	const { user } = useUser();
	const [subscriptionTier, setSubscriptionTier] = useState<string>('free');
	const [subscriptionStatus, setSubscriptionStatus] = useState<string>('inactive');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (user) {
			const fetchSubscription = async () => {
				try {
					const response = await fetch('/api/getUserSubscription', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email: user.emailAddresses[0].emailAddress,
						}),
					});

					const data = await response.json();
					setSubscriptionTier(data.subscriptionTier);
					setSubscriptionStatus(data.subscriptionStatus);
				} catch (error) {
					console.error('Error fetching subscription:', error);
				}
			};

			fetchSubscription();

			setIsLoading(false);
		} else {
			setIsLoading(false);
		}
	}, [user]);

	const isPremium = subscriptionTier !== 'free' && subscriptionStatus === 'active';

	return { subscriptionTier, subscriptionStatus, isPremium, isLoading };
}
