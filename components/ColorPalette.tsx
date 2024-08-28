'use client';

import { useState } from 'react';
import chroma from 'chroma-js';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface ColorPaletteProps {
	baseColor: string;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ baseColor }) => {
	const [copiedColor, setCopiedColor] = useState<string | null>(null);

	const generateColorScale = (color: string) => {
		try {
			const baseChroma = chroma(color);
			return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((level) => {
				const scaledColor =
					level === 500
						? baseChroma
						: level < 500
						? chroma.mix('white', baseChroma, level / 500)
						: chroma.mix(baseChroma, 'black', (level - 500) / 500);
				return {
					level,
					hex: scaledColor.hex().toUpperCase(),
				};
			});
		} catch (error) {
			console.error('Invalid color input:', error);
			return [];
		}
	};

	const colorScale = generateColorScale(baseColor);

	const copyToClipboard = (color: string) => {
		navigator.clipboard.writeText(color).then(() => {
			setCopiedColor(color);
			setTimeout(() => setCopiedColor(null), 2000); // Reset after 2 seconds
		});
	};

	return (
		<div className='mb-4 sm:mb-6 md:mb-8'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4'>
				<h2 className='text-xl sm:text-2xl font-semibold mb-2 sm:mb-0'>Color Palette</h2>
				<div className='flex flex-wrap gap-2 text-xs sm:text-sm text-gray-500'>
					<span className='cursor-pointer hover:text-gray-700'>Contrast grid</span>
					<span className='cursor-pointer hover:text-gray-700'>Export</span>
					<span className='cursor-pointer hover:text-gray-700'>Edit</span>
					<span className='cursor-pointer hover:text-gray-700'>Save</span>
				</div>
			</div>
			<div className='grid grid-cols-5 sm:grid-cols-6 md:grid-cols-11 gap-1 sm:gap-2'>
				{colorScale.map(({ level, hex }) => (
					<TooltipProvider key={level.toString()}>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									onClick={() => copyToClipboard(hex)}
									className='relative aspect-square w-full rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform hover:scale-105'
									style={{ backgroundColor: hex }}
								>
									<div className='absolute inset-0 flex flex-col justify-between p-1 sm:p-2 text-[8px] sm:text-xs'>
										<span className={chroma(hex).luminance() > 0.5 ? 'text-gray-800' : 'text-white'}>{level}</span>
										<span className={chroma(hex).luminance() > 0.5 ? 'text-gray-800' : 'text-white'}>
											{hex.slice(1)}
										</span>
									</div>
									{copiedColor === hex && (
										<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs sm:text-sm'>
											Copied!
										</div>
									)}
								</button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Click to copy: {hex}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</div>
		</div>
	);
};

export default ColorPalette;
