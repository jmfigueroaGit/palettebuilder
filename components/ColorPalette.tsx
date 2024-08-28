'use client';

import { useState } from 'react';
import chroma from 'chroma-js';

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
		<div className='mb-8'>
			<div className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-semibold'>Color Palette</h2>
				<div className='text-sm text-gray-500'>
					<span className='mr-4'>Contrast grid</span>
					<span className='mr-4'>Export</span>
					<span className='mr-4'>Edit</span>
					<span>Save</span>
				</div>
			</div>
			<div className='grid grid-cols-11 gap-1'>
				{colorScale.map(({ level, hex }) => (
					<button
						key={level}
						onClick={() => copyToClipboard(hex)}
						className='relative aspect-square rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						style={{ backgroundColor: hex }}
						title={`Click to copy: ${hex}`}
					>
						<div className='absolute inset-0 flex flex-col justify-between p-2 text-xs'>
							<span className={level <= 500 ? 'text-gray-800' : 'text-white'}>
								{level}
								{level === 500 && (
									<span className='ml-1 px-1 py-0.5 bg-white bg-opacity-30 rounded text-[10px]'>Default</span>
								)}
							</span>
							<span className={level <= 500 ? 'text-gray-800' : 'text-white'}>{hex.slice(1)}</span>
						</div>
						{copiedColor === hex && (
							<div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm'>
								Copied!
							</div>
						)}
					</button>
				))}
			</div>
		</div>
	);
};

export default ColorPalette;
