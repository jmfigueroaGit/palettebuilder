import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import chroma from 'chroma-js';

interface EditPaletteProps {
	colorScale: { [key: number]: string };
	onUpdateColorScale: (newColorScale: { [key: number]: string }) => void;
}

const EditPalette: React.FC<EditPaletteProps> = ({ colorScale, onUpdateColorScale }) => {
	const [editedColors, setEditedColors] = useState(colorScale);

	const handleColorChange = (shade: number, value: string) => {
		try {
			const color = chroma(value);
			setEditedColors((prev) => ({ ...prev, [shade]: color.hex() }));
		} catch (e) {
			// Invalid color, don't update
		}
	};

	const handleSave = () => {
		console.log(editedColors);
		// onUpdateColorScale(editedColors);
	};

	return (
		<div className='grid grid-cols-1  md:grid-cols-2 gap-2'>
			{Object.entries(editedColors).map(([shade, color]) => (
				<div key={shade} className='space-y-1'>
					<label htmlFor={`color-${shade}`} className='block text-sm font-medium text-gray-700'>
						{shade}
					</label>
					<Input
						type='color'
						id={`color-${shade}`}
						value={color}
						onChange={(e) => handleColorChange(Number(shade), e.target.value)}
						className='w-full h-8'
					/>
					<Input
						type='text'
						value={color}
						onChange={(e) => handleColorChange(Number(shade), e.target.value)}
						className='w-full text-xs'
					/>
				</div>
			))}
			<Button onClick={handleSave}>Save Changes</Button>
		</div>
	);
};

export default EditPalette;
