import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import chroma from 'chroma-js';

interface ExportPaletteProps {
	colorScale: { [key: number]: string };
	colorName: string;
	onClose: () => void;
}

const ExportPalette: React.FC<ExportPaletteProps> = ({ colorScale, colorName, onClose }) => {
	const generateTailwindHex = () => {
		return Object.entries(colorScale)
			.map(([level, hex]) => `${level}: '${hex}',`)
			.join('\n');
	};

	const generateTailwindOKLCH = () => {
		return Object.entries(colorScale)
			.map(([level, hex]) => {
				const oklch = chroma(hex).oklch();
				return `${level}: 'oklch(${oklch[0].toFixed(3)} ${oklch[1].toFixed(3)} ${oklch[2].toFixed(3)})',`;
			})
			.join('\n');
	};

	const generateTailwindHSL = () => {
		return Object.entries(colorScale)
			.map(([level, hex]) => {
				const hsl = chroma(hex).hsl();
				return `${level}: 'hsl(${Math.round(hsl[0])} ${Math.round(hsl[1] * 100)}% ${Math.round(hsl[2] * 100)}%)',`;
			})
			.join('\n');
	};

	const generateSCSS = () => {
		return Object.entries(colorScale)
			.map(([level, hex]) => `$${colorName}-${level}: ${hex};`)
			.join('\n');
	};

	const generateCSS = (format: 'hex' | 'rgb') => {
		return Object.entries(colorScale)
			.map(([level, hex]) => {
				const color = format === 'hex' ? hex : chroma(hex).css();
				return `--${colorName}-${level}: ${color};`;
			})
			.join('\n');
	};

	const generateSVG = () => {
		const swatches = Object.entries(colorScale)
			.map(([level, hex], index) => `<rect x="0" y="${index * 50}" width="100" height="50" fill="${hex}" />`)
			.join('\n');
		return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="550">
      ${swatches}
    </svg>`;
	};

	const downloadFile = (content: string, filename: string) => {
		const blob = new Blob([content], { type: 'text/plain' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		link.click();
	};

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Export Palette</DialogTitle>
				</DialogHeader>
				<div className='grid grid-cols-2 gap-2'>
					<Button onClick={() => downloadFile(generateTailwindHex(), `${colorName}-tailwind-hex.js`)}>
						Tailwind (HEX)
					</Button>
					<Button onClick={() => downloadFile(generateTailwindOKLCH(), `${colorName}-tailwind-oklch.js`)}>
						Tailwind (OKLCH)
					</Button>
					<Button onClick={() => downloadFile(generateTailwindHSL(), `${colorName}-tailwind-hsl.js`)}>
						Tailwind (HSL)
					</Button>
					<Button onClick={() => downloadFile(generateSCSS(), `${colorName}.scss`)}>SCSS (HEX)</Button>
					<Button onClick={() => downloadFile(generateCSS('hex'), `${colorName}-hex.css`)}>CSS (HEX)</Button>
					<Button onClick={() => downloadFile(generateCSS('rgb'), `${colorName}-rgb.css`)}>CSS (RGB)</Button>
					<Button onClick={() => downloadFile(generateSVG(), `${colorName}.svg`)}>SVG (For Figma)</Button>
				</div>
				<DialogClose />
			</DialogContent>
		</Dialog>
	);
};

export default ExportPalette;
