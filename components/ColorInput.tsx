'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import chroma from 'chroma-js';

interface ColorInputProps {
	onColorChange: (color: string, colorName: string) => void;
}

// Expanded list of color names
const colorNames = [
	'red',
	'blue',
	'green',
	'yellow',
	'purple',
	'orange',
	'pink',
	'brown',
	'gray',
	'black',
	'white',
	'cyan',
	'magenta',
	'lime',
	'indigo',
	'teal',
	'olive',
	'navy',
	'maroon',
	'aqua',
	'turquoise',
	'violet',
	'plum',
	'orchid',
	'coral',
	'salmon',
	'gold',
	'khaki',
	'tan',
	'sienna',
	'crimson',
	'lavender',
	'beige',
	'azure',
	'mint',
	'periwinkle',
	'mauve',
	'chartreuse',
	'burgundy',
	'celadon',
	'cerulean',
	'fuchsia',
	'ochre',
	'sepia',
	'vermilion',
	'charcoal',
	'russet',
	'taupe',
	'ecru',
	'saffron',
	'puce',
	'amber',
	'terracotta',
	'emerald',
	'sapphire',
	'ruby',
	'amethyst',
	'topaz',
	'ivory',
	'ebony',
	'slate',
	'cobalt',
	'mahogany',
	'brass',
	'copper',
	'bronze',
	'steel',
];

const colorPalettes: { [key: string]: { [key: number]: string } } = {
	gray: {
		50: '#F9FAFB',
		100: '#F3F4F6',
		200: '#E5E7EB',
		300: '#D1D5DB',
		400: '#9CA3AF',
		500: '#6B7280',
		600: '#4B5563',
		700: '#374151',
		800: '#1F2937',
		900: '#111827',
	},
	red: {
		50: '#FEF2F2',
		100: '#FEE2E2',
		200: '#FECACA',
		300: '#FCA5A5',
		400: '#F87171',
		500: '#EF4444',
		600: '#DC2626',
		700: '#B91C1C',
		800: '#991B1B',
		900: '#7F1D1D',
	},
	yellow: {
		50: '#FFFBEB',
		100: '#FEF3C7',
		200: '#FDE68A',
		300: '#FCD34D',
		400: '#FBBF24',
		500: '#F59E0B',
		600: '#D97706',
		700: '#B45309',
		800: '#92400E',
		900: '#78350F',
	},
	green: {
		50: '#ECFDF5',
		100: '#D1FAE5',
		200: '#A7F3D0',
		300: '#6EE7B7',
		400: '#34D399',
		500: '#10B981',
		600: '#059669',
		700: '#047857',
		800: '#065F46',
		900: '#064E3B',
	},
	blue: {
		50: '#EFF6FF',
		100: '#DBEAFE',
		200: '#BFDBFE',
		300: '#93C5FD',
		400: '#60A5FA',
		500: '#3B82F6',
		600: '#2563EB',
		700: '#1D4ED8',
		800: '#1E40AF',
		900: '#1E3A8A',
	},
	indigo: {
		50: '#EEF2FF',
		100: '#E0E7FF',
		200: '#C7D2FE',
		300: '#A5B4FC',
		400: '#818CF8',
		500: '#6366F1',
		600: '#4F46E5',
		700: '#4338CA',
		800: '#3730A3',
		900: '#312E81',
	},
	purple: {
		50: '#F5F3FF',
		100: '#EDE9FE',
		200: '#DDD6FE',
		300: '#C4B5FD',
		400: '#A78BFA',
		500: '#8B5CF6',
		600: '#7C3AED',
		700: '#6D28D9',
		800: '#5B21B6',
		900: '#4C1D95',
	},
	pink: {
		50: '#FDF2F8',
		100: '#FCE7F3',
		200: '#FBCFE8',
		300: '#F9A8D4',
		400: '#F472B6',
		500: '#EC4899',
		600: '#DB2777',
		700: '#BE185D',
		800: '#9D174D',
		900: '#831843',
	},
	teal: {
		50: '#F0FDFA',
		100: '#CCFBF1',
		200: '#99F6E4',
		300: '#5EEAD4',
		400: '#2DD4BF',
		500: '#14B8A6',
		600: '#0D9488',
		700: '#0F766E',
		800: '#115E59',
		900: '#134E4A',
	},
	orange: {
		50: '#FFF7ED',
		100: '#FFEDD5',
		200: '#FED7AA',
		300: '#FDBA74',
		400: '#FB923C',
		500: '#F97316',
		600: '#EA580C',
		700: '#C2410C',
		800: '#9A3412',
		900: '#7C2D12',
	},
	brown: {
		50: '#FDFAF5',
		100: '#FAF5EB',
		200: '#F5E5D0',
		300: '#E8CBA8',
		400: '#D4AB7E',
		500: '#B58B5E',
		600: '#96704A',
		700: '#775738',
		800: '#5A4129',
		900: '#40301F',
	},
	slate: {
		50: '#F8FAFC',
		100: '#F1F5F9',
		200: '#E2E8F0',
		300: '#CBD5E1',
		400: '#94A3B8',
		500: '#64748B',
		600: '#475569',
		700: '#334155',
		800: '#1E293B',
		900: '#0F172A',
	},
	zinc: {
		50: '#FAFAFA',
		100: '#F4F4F5',
		200: '#E4E4E7',
		300: '#D4D4D8',
		400: '#A1A1AA',
		500: '#71717A',
		600: '#52525B',
		700: '#3F3F46',
		800: '#27272A',
		900: '#18181B',
	},
	neutral: {
		50: '#FAFAFA',
		100: '#F5F5F5',
		200: '#E5E5E5',
		300: '#D4D4D4',
		400: '#A3A3A3',
		500: '#737373',
		600: '#525252',
		700: '#404040',
		800: '#262626',
		900: '#171717',
	},
	stone: {
		50: '#FAFAF9',
		100: '#F5F5F4',
		200: '#E7E5E4',
		300: '#D6D3D1',
		400: '#A8A29E',
		500: '#78716C',
		600: '#57534E',
		700: '#44403C',
		800: '#292524',
		900: '#1C1917',
	},
	emerald: {
		50: '#ECFDF5',
		100: '#D1FAE5',
		200: '#A7F3D0',
		300: '#6EE7B7',
		400: '#34D399',
		500: '#10B981',
		600: '#059669',
		700: '#047857',
		800: '#065F46',
		900: '#064E3B',
	},
	cyan: {
		50: '#ECFEFF',
		100: '#CFFAFE',
		200: '#A5F3FC',
		300: '#67E8F9',
		400: '#22D3EE',
		500: '#06B6D4',
		600: '#0891B2',
		700: '#0E7490',
		800: '#155E75',
		900: '#164E63',
	},
	sky: {
		50: '#F0F9FF',
		100: '#E0F2FE',
		200: '#BAE6FD',
		300: '#7DD3FC',
		400: '#38BDF8',
		500: '#0EA5E9',
		600: '#0284C7',
		700: '#0369A1',
		800: '#075985',
		900: '#0C4A6E',
	},
	violet: {
		50: '#F5F3FF',
		100: '#EDE9FE',
		200: '#DDD6FE',
		300: '#C4B5FD',
		400: '#A78BFA',
		500: '#8B5CF6',
		600: '#7C3AED',
		700: '#6D28D9',
		800: '#5B21B6',
		900: '#4C1D95',
	},
	fuchsia: {
		50: '#FDF4FF',
		100: '#FAE8FF',
		200: '#F5D0FE',
		300: '#F0ABFC',
		400: '#E879F9',
		500: '#D946EF',
		600: '#C026D3',
		700: '#A21CAF',
		800: '#86198F',
		900: '#701A75',
	},
	rose: {
		50: '#FFF1F2',
		100: '#FFE4E6',
		200: '#FECDD3',
		300: '#FDA4AF',
		400: '#FB7185',
		500: '#F43F5E',
		600: '#E11D48',
		700: '#BE123C',
		800: '#9F1239',
		900: '#881337',
	},
	lime: {
		50: '#F7FEE7',
		100: '#ECFCCB',
		200: '#D9F99D',
		300: '#BEF264',
		400: '#A3E635',
		500: '#84CC16',
		600: '#65A30D',
		700: '#4D7C0F',
		800: '#3F6212',
		900: '#365314',
	},
	amber: {
		50: '#FFFBEB',
		100: '#FEF3C7',
		200: '#FDE68A',
		300: '#FCD34D',
		400: '#FBBF24',
		500: '#F59E0B',
		600: '#D97706',
		700: '#B45309',
		800: '#92400E',
		900: '#78350F',
	},
	khaki: {
		50: '#FDFBE5',
		100: '#FAF5C7',
		200: '#F6F0C2',
		300: '#F2E298',
		400: '#EDCC58',
		500: '#E6B80D',
		600: '#C78E04',
		700: '#955E06',
		800: '#72440C',
		900: '#5B350E',
	},
};
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

		const inputLab = chroma(inputHex).lab();

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
