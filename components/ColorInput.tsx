'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { colorNames, colorPalettes } from '@/lib/colors';

import chroma from 'chroma-js';

interface ColorInputProps {
	onColorChange: (color: string, colorName: string) => void;
}

export default function ColorInput({ onColorChange }: ColorInputProps) {
	const [inputColor, setInputColor] = useState('#F6F0C2');
	const [error, setError] = useState('');
	const [colorName, setColorName] = useState('');
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const findClosestNamedColor = (inputHex: string) => {
		let closestColor = '';
		let closestDistance = Infinity;
		let closestPalette = '';
		let closestShade = 0;

		Object.entries(colorPalettes).forEach(([paletteName, palette]) => {
			Object.entries(palette).forEach(([shade, hexValue]) => {
				const distance = chroma.distance(inputHex, hexValue, 'lab');
				if (distance < closestDistance) {
					closestDistance = distance;
					closestColor = hexValue;
					closestPalette = paletteName;
					closestShade = parseInt(shade);
				}
			});
		});

		return `${closestPalette} ${closestShade}`;
	};

	const validateColor = (input: string) => {
		try {
			const color = chroma(input);
			setError('');
			const mappedColorName = findClosestNamedColor(color.hex());
			setColorName(mappedColorName);
			onColorChange(color.hex(), mappedColorName);
		} catch (e) {
			setError('Invalid color input. Please enter a valid hex code or color name.');
			setColorName('');
		}
	};

	useEffect(() => {
		validateColor(inputColor);
	}, [inputColor, onColorChange]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputColor(value);
		const filtered = colorNames.filter((name) => name.toLowerCase().includes(value.toLowerCase()));
		setSuggestions(filtered);
		setShowSuggestions(filtered.length > 0);
	};

	const handleSuggestionClick = (suggestion: string) => {
		setInputColor(suggestion);
		setShowSuggestions(false);
		validateColor(suggestion);
	};

	const generateRandomColor = () => {
		const randomColor = chroma.random().hex();
		setInputColor(randomColor);
		validateColor(randomColor);
	};

	const handleBlur = () => {
		setTimeout(() => setShowSuggestions(false), 200);
	};

	return (
		<div className='mb-4 relative'>
			<label htmlFor='colorInput' className='block text-sm font-medium text-gray-700'>
				Enter a color (hex, RGB, HSL, or color name):
			</label>
			<div className='mt-1 flex rounded-md shadow-sm'>
				<Input
					ref={inputRef}
					type='text'
					name='colorInput'
					id='colorInput'
					className={`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-l-md sm:text-sm border-gray-300 ${
						error ? 'border-red-500' : ''
					}`}
					value={inputColor}
					onChange={handleInputChange}
					onBlur={handleBlur}
				/>
				<Button
					onClick={generateRandomColor}
					className='inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm hover:bg-gray-100'
				>
					Random
				</Button>
			</div>
			{showSuggestions && (
				<ul className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							className='cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white'
							onClick={() => handleSuggestionClick(suggestion)}
						>
							{suggestion}
						</li>
					))}
				</ul>
			)}
			{error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
			{colorName && !error && (
				<div className='mt-2 flex items-center'>
					<div className='w-6 h-6 rounded-full mr-2' style={{ backgroundColor: inputColor }}></div>
					<p className='text-sm text-gray-600'>Mapped color: {colorName}</p>
				</div>
			)}
		</div>
	);
}
