'use client';

import { useState } from 'react';
import ColorInput from '@/components/ColorInput';
import ColorPalette from '@/components/ColorPalette';
import SampleComponents from '@/components/SampleComponents';

export default function Home() {
	const [baseColor, setBaseColor] = useState('#F6F0C2');
	const [colorName, setColorName] = useState('khaki 200');
	const [isValidColor, setIsValidColor] = useState(true);

	const handleColorChange = (color: string, name: string) => {
		setBaseColor(color);
		setColorName(name);
		setIsValidColor(!!color);
	};

	return (
		<main className='container mx-auto p-4'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold mb-2'>{colorName}</h1>
				<ColorInput onColorChange={handleColorChange} />
			</div>
			{isValidColor && (
				<>
					<ColorPalette baseColor={baseColor} />
					<SampleComponents baseColor={baseColor} />
				</>
			)}
		</main>
	);
}
