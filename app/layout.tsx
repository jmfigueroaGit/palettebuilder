import type { Metadata } from 'next';
import './globals.css';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'Palette Generator',
	description: 'Color palette generator and theme builder for Tailwind CSS and React applications with TypeScript.',
	keywords:
		'color, palette, generator, theme, builder, tailwind, css, react, typescript, hueforge, chroma-js, nextjs, next.js, vercel, zeit, zeit.co, now.sh, now, font, inter, google, fonts, latin',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>{children}</body>
		</html>
	);
}
