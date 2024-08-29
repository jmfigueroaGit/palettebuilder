import React from 'react';
import chroma from 'chroma-js';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
} from 'recharts';
import { Camera, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from './ui/button';

const ColorTooltip = ({ children, colors }: { children: any; colors: any }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>
					<div className='text-sm'>
						{Object.entries(colors).map(([name, color]) => (
							<div key={name} className='flex items-center mb-1'>
								<div className='w-4 h-4 mr-2' style={{ backgroundColor: color as any }}></div>
								<span>
									{name}: {color as any}
								</span>
							</div>
						))}
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

const SampleComponents = ({ baseColor, colorScale }: { baseColor: any; colorScale: any }) => {
	const getContrastColor = (bgColor: any) => {
		return chroma(bgColor).luminance() > 0.5 ? '#000000' : '#ffffff';
	};

	const lightShade = chroma(baseColor).brighten(1.5).hex();
	const darkShade = chroma(baseColor).darken(1.5).hex();
	const middleShade = chroma.mix(lightShade, darkShade, 0.5, 'lab').hex();

	const chartData = [
		{ name: 'Jan', value: 4000 },
		{ name: 'Feb', value: 3000 },
		{ name: 'Mar', value: 5000 },
		{ name: 'Apr', value: 4500 },
		{ name: 'May', value: 6000 },
		{ name: 'Jun', value: 5500 },
	];

	return (
		<div className='space-y-4 sm:space-y-6 md:space-y-8'>
			<h2 className='text-xl sm:text-2xl font-bold mb-2 sm:mb-4' style={{ color: colorScale[700] }}>
				Sample Components
			</h2>

			{/* Cards Row */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{/* Gradient Card */}
				<ColorTooltip colors={{ Light: lightShade, Dark: darkShade }}>
					<div
						className='rounded-lg overflow-hidden shadow-lg'
						style={{ background: `linear-gradient(135deg, ${lightShade}, ${darkShade})` }}
					>
						<div className='p-4 sm:p-6'>
							<h3 className='text-lg sm:text-xl font-semibold mb-2' style={{ color: getContrastColor(middleShade) }}>
								Customers
							</h3>
							<p className='text-2xl sm:text-3xl font-bold' style={{ color: getContrastColor(middleShade) }}>
								1,553
							</p>
							<p className='text-xs sm:text-sm mt-2' style={{ color: getContrastColor(middleShade) }}>
								New customers in past 30 days
							</p>
						</div>
					</div>
				</ColorTooltip>

				{/* Chart Card */}
				<ColorTooltip colors={{ Base: baseColor }}>
					<div className='rounded-lg overflow-hidden shadow-lg bg-white p-4'>
						<h3 className='text-lg sm:text-xl font-semibold mb-2' style={{ color: colorScale[700] }}>
							Revenue
						</h3>
						<p className='text-2xl sm:text-3xl font-bold mb-4' style={{ color: colorScale[900] }}>
							$12,543
						</p>
						<div className='h-40 sm:h-48 md:h-56'>
							<ResponsiveContainer width='100%' height='100%'>
								<LineChart data={chartData}>
									<CartesianGrid strokeDasharray='3 3' stroke={colorScale[200]} />
									<XAxis dataKey='name' tick={{ fill: colorScale[700] }} />
									<YAxis tick={{ fill: colorScale[700] }} />
									<RechartsTooltip />
									<Line type='monotone' dataKey='value' stroke={baseColor} strokeWidth={2} />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</ColorTooltip>

				{/* Task Card */}
				<ColorTooltip colors={{ Light: lightShade }}>
					<div className='rounded-lg overflow-hidden shadow-lg bg-white p-4'>
						<h3 className='text-lg sm:text-xl font-semibold mb-4' style={{ color: colorScale[700] }}>
							Today
						</h3>
						<div className='space-y-2'>
							{['Design system meeting', 'Lunch', 'Design review'].map((task, index) => (
								<div key={index} className='p-2 rounded' style={{ backgroundColor: lightShade }}>
									<p style={{ color: getContrastColor(lightShade) }}>{task}</p>
									<p className='text-sm' style={{ color: getContrastColor(lightShade) }}>
										{index === 0 ? '9 - 10 AM' : index === 1 ? '1 - 2 PM' : '3 - 4 PM'}
									</p>
								</div>
							))}
						</div>
					</div>
				</ColorTooltip>
			</div>

			{/* Image Cards Row */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{/* Card 1: Gradient overlay */}
				<ColorTooltip colors={{ Base: baseColor, Overlay: chroma(baseColor).alpha(0.8).css() }}>
					<div className='relative rounded-lg overflow-hidden shadow-lg h-48 sm:h-56 md:h-64'>
						<img src='/placeholder-1.jpg' alt='Woman smiling' className='w-full h-full object-cover' />
						<div
							className='absolute inset-0 flex flex-col justify-end p-4 sm:p-6'
							style={{ background: `linear-gradient(to top, ${chroma(baseColor).alpha(0.8)}, transparent)` }}
						>
							<Camera className='text-white mb-2' size={20} />
							<h3 className='text-xl font-bold' style={{ color: getContrastColor(baseColor) }}>
								Create
							</h3>
							<p className='text-lg' style={{ color: getContrastColor(baseColor) }}>
								color scales in seconds.
							</p>
						</div>
					</div>
				</ColorTooltip>

				{/* Card 2: Solid color overlay */}
				<ColorTooltip colors={{ Light: lightShade, Overlay: chroma(lightShade).alpha(0.8).css() }}>
					<div className='relative rounded-lg overflow-hidden shadow-lg h-48 sm:h-56 md:h-64'>
						<img src='/placeholder-2.jpg' alt='Colorful background' className='w-full h-full object-cover' />
						<div
							className='absolute inset-0 flex items-center justify-center'
							style={{ backgroundColor: chroma(lightShade).alpha(0.8).css() }}
						>
							<div className='text-center'>
								<h3 className='text-xl sm:text-2xl font-bold' style={{ color: getContrastColor(lightShade) }}>
									Create
								</h3>
								<p className='text-base sm:text-lg' style={{ color: getContrastColor(lightShade) }}>
									color scales in seconds.
								</p>
							</div>
						</div>
					</div>
				</ColorTooltip>

				{/* Card 3: Partial overlay */}
				<ColorTooltip colors={{ Dark: darkShade, Overlay: chroma(darkShade).alpha(0.9).css() }}>
					<div className='relative rounded-lg overflow-hidden shadow-lg h-48 sm:h-56 md:h-64'>
						<img src='/placeholder-3.jpg' alt='Woman laughing' className='w-full h-full object-cover' />
						<div
							className='absolute bottom-0 left-0 right-0 p-4 sm:p-6'
							style={{ backgroundColor: chroma(darkShade).alpha(0.9).css() }}
						>
							<h3 className='text-lg sm:text-xl font-bold text-white'>Create</h3>
							<p className='text-base sm:text-lg text-white'>color scales in seconds.</p>
						</div>
					</div>
				</ColorTooltip>
			</div>

			{/* Buttons Row */}
			<div className='space-y-4'>
				<h3 className='text-xl font-semibold' style={{ color: colorScale[700] }}>
					Buttons
				</h3>
				<div className='space-y-2'>
					<div>
						<h4 className='text-lg mb-2' style={{ color: colorScale[600] }}>
							Flat
						</h4>
						<div className='space-x-2'>
							{['Default', 'Hover', 'Active', 'Disabled'].map((label, index) => (
								<ColorTooltip
									key={index}
									colors={{
										Base: baseColor,
										Dark: darkShade,
										Middle: middleShade,
										Disabled: chroma(baseColor).alpha(0.5).css(),
									}}
								>
									<Button
										key={index}
										className={`px-4 py-2 rounded ${index === 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
										style={{
											backgroundColor: index === 1 ? darkShade : index === 2 ? middleShade : baseColor,
											color: getContrastColor(index === 1 ? darkShade : index === 2 ? middleShade : baseColor),
										}}
										disabled={index === 3}
									>
										{label}
									</Button>
								</ColorTooltip>
							))}
						</div>
					</div>
					<div>
						<h4 className='text-lg mb-2' style={{ color: colorScale[600] }}>
							Outline
						</h4>
						<div className='space-x-2'>
							{['Default', 'Hover', 'Active', 'Disabled'].map((label, index) => (
								<ColorTooltip
									key={index}
									colors={{
										Base: baseColor,
										Dark: darkShade,
										Middle: middleShade,
										Disabled: chroma(baseColor).alpha(0.5).css(),
									}}
								>
									<Button
										key={index}
										className={`px-4 py-2 rounded border ${index === 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
										style={{
											borderColor: baseColor,
											color: index === 1 || index === 2 ? getContrastColor(baseColor) : baseColor,
											backgroundColor: index === 1 || index === 2 ? baseColor : 'transparent',
										}}
										disabled={index === 3}
									>
										{label}
									</Button>
								</ColorTooltip>
							))}
						</div>
					</div>
					<div>
						<h4 className='text-lg mb-2' style={{ color: colorScale[600] }}>
							Bezel
						</h4>
						<div className='space-x-2'>
							{['Default', 'Hover', 'Active', 'Disabled'].map((label, index) => (
								<ColorTooltip
									key={index}
									colors={{
										Base: baseColor,
										Dark: darkShade,
										Middle: middleShade,
										Disabled: chroma(baseColor).alpha(0.5).css(),
									}}
								>
									<Button
										key={index}
										className={`px-4 py-2 rounded shadow-md ${index === 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
										style={{
											backgroundColor: index === 1 ? darkShade : index === 2 ? middleShade : baseColor,
											color: getContrastColor(index === 1 ? darkShade : index === 2 ? middleShade : baseColor),
											boxShadow: `0 2px 4px ${chroma(baseColor).alpha(0.5).hex()}`,
										}}
										disabled={index === 3}
									>
										{label}
									</Button>
								</ColorTooltip>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Alerts */}
			<div className='space-y-4'>
				<h3 className='text-xl font-semibold' style={{ color: colorScale[700] }}>
					Alerts
				</h3>
				<ColorTooltip colors={{ Light: lightShade }}>
					<Alert style={{ backgroundColor: lightShade, color: getContrastColor(lightShade) }}>
						<Camera className='h-4 w-4' />
						<AlertTitle>Make sure you save your custom color scale.</AlertTitle>
						<AlertDescription>
							Your color scale will be lost if you don&apos;t save it before leaving the page.
						</AlertDescription>
					</Alert>
				</ColorTooltip>
			</div>
		</div>
	);
};

export default SampleComponents;
