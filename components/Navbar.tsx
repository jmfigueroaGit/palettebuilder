'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/common/mode-toggle';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className='shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-2 lg:px-4'>
				<div className='flex justify-between h-16'>
					<div className='flex'>
						<div className='flex-shrink-0 flex items-center'>
							<Image src='/favicon.ico' className='h-8 w-8' alt='logo' width={8} height={8} />
							<span className='ml-2 text-xl font-bold'>Palette Builder</span>
						</div>
						<div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
							<Link
								href='/create'
								className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:border-gray-300 '
							>
								Create
							</Link>
							<Link
								href='/saved'
								className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:border-gray-300 '
							>
								Saved
							</Link>
							<Link
								href='/browse'
								className='inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium  hover:border-gray-300 '
							>
								Browse
							</Link>
						</div>
					</div>
					<div className='hidden sm:ml-6 sm:flex sm:items-center'>
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<UserButton afterSignOutUrl='/' />
						</SignedIn>
						<div className='ml-4'>
							<ModeToggle />
						</div>
					</div>

					<div className='-mr-2 flex items-center sm:hidden'>
						<Button
							variant='ghost'
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
							onClick={toggleMobileMenu}
						>
							<span className='sr-only'>Open main menu</span>
							{isMobileMenuOpen ? (
								<svg
									className='h-6 w-6'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									aria-hidden='true'
								>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
								</svg>
							) : (
								<svg
									className='h-6 w-6'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									aria-hidden='true'
								>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
								</svg>
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
				<div className='pt-2 pb-3 space-y-1'>
					<Link
						href='/create'
						className='block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
					>
						Create
					</Link>
					<Link
						href='/saved'
						className='block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
					>
						Saved
					</Link>
					<Link
						href='/browse'
						className='block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
					>
						Browse
					</Link>
				</div>
				<div className='pt-4 pb-3 border-t border-gray-200 flex justify-between items-center'>
					<div className='mx-2'>
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</div>
					<div className='mx-2'>
						<ModeToggle />
					</div>
				</div>
			</div>
		</nav>
	);
}
