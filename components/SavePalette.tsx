import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SavePaletteProps {
	colorScale: { [key: number]: string };
	colorName: string;
}

const SavePalette: React.FC<SavePaletteProps> = ({ colorScale, colorName }) => {
	const [paletteName, setPaletteName] = useState(colorName);

	const handleSave = () => {
		const savedPalettes = JSON.parse(localStorage.getItem('savedPalettes') || '{}');
		savedPalettes[paletteName] = colorScale;
		localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
		alert(`Palette "${paletteName}" has been saved!`);
	};

	return (
		<div className='space-y-4'>
			<div>
				<label htmlFor='paletteName' className='block text-sm font-medium text-gray-700'>
					Palette Name
				</label>
				<Input
					type='text'
					id='paletteName'
					value={paletteName}
					onChange={(e) => setPaletteName(e.target.value)}
					className='mt-1'
				/>
			</div>
			<Button onClick={handleSave}>Save Palette</Button>
		</div>
	);
};

export default SavePalette;
