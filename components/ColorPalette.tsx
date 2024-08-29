import React, { useState } from 'react';
import chroma from 'chroma-js';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ContrastGrid from './ContrastGrid';
import ExportPalette from './ExportPalette';
import EditPalette from './EditPalette';
import SavePalette from './SavePalette';

interface ColorPaletteProps {
	baseColor: string;
	colorName: string;
	colorScale: { [key: number]: string };
	onUpdateColorScale: (newColorScale: { [key: number]: string }) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ baseColor, colorName, colorScale, onUpdateColorScale }) => {
	const [copiedColor, setCopiedColor] = useState<string | null>(null);
	const [showContrastGrid, setShowContrastGrid] = useState(false);
	const [showExport, setShowExport] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [showSave, setShowSave] = useState(false);

	const getContrastColor = (bgColor: string) => {
		return chroma(bgColor).luminance() > 0.5 ? colorScale[900] : colorScale[50];
	};

	const copyToClipboard = (color: string) => {
		navigator.clipboard.writeText(color).then(() => {
			setCopiedColor(color);
			setTimeout(() => setCopiedColor(null), 2000);
		});
	};

	return (
		<div className='mb-4 sm:mb-6 md:mb-8'>
			<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4'>
				<h2 className='text-xl sm:text-2xl font-semibold mb-2 sm:mb-0'>{colorName} Color Palette</h2>
				<div className='flex flex-wrap gap-2 text-xs sm:text-sm'>
					<Button variant='outline' size='sm' onClick={() => setShowContrastGrid(true)}>
						Contrast grid
					</Button>
					<Button variant='outline' size='sm' onClick={() => setShowExport(true)}>
						Export
					</Button>
					<Button variant='outline' size='sm' onClick={() => setShowEdit(true)}>
						Edit
					</Button>
					<Button variant='outline' size='sm' onClick={() => setShowSave(true)}>
						Save
					</Button>
				</div>
			</div>
			<div className='grid grid-cols-5 sm:grid-cols-6 md:grid-cols-11 gap-1 sm:gap-2'>
				{Object.entries(colorScale).map(([level, hex]) => (
					<TooltipProvider key={level}>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									onClick={() => copyToClipboard(hex)}
									className='relative aspect-square w-full rounded overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform hover:scale-105'
									style={{ backgroundColor: hex }}
								>
									<div className='absolute inset-0 flex flex-col justify-between p-1 sm:p-2 text-[8px] sm:text-xs'>
										<span style={{ color: getContrastColor(hex) }}>
											{level}
											{level === '500' && (
												<span className='ml-1 px-1 py-0.5 bg-white bg-opacity-30 rounded text-[6px] sm:text-[8px]'>
													Base
												</span>
											)}
										</span>
										<span style={{ color: getContrastColor(hex) }}>{hex.toUpperCase()}</span>
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
			<Dialog open={showContrastGrid} onOpenChange={setShowContrastGrid}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Contrast Grid</DialogTitle>
					</DialogHeader>
					<ContrastGrid colorScale={colorScale} onClose={() => setShowContrastGrid(false)} />
				</DialogContent>
			</Dialog>
			<Dialog open={showExport} onOpenChange={setShowExport}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Export Palette</DialogTitle>
					</DialogHeader>
					<ExportPalette colorScale={colorScale} colorName={colorName} onClose={() => setShowExport(false)} />
				</DialogContent>
			</Dialog>
			<Dialog open={showEdit} onOpenChange={setShowEdit}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Palette</DialogTitle>
					</DialogHeader>
					<EditPalette colorScale={colorScale} onUpdateColorScale={onUpdateColorScale} />
				</DialogContent>
			</Dialog>
			<Dialog open={showSave} onOpenChange={setShowSave}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Save Palette</DialogTitle>
					</DialogHeader>
					<SavePalette colorScale={colorScale} colorName={colorName} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ColorPalette;
