import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import chroma from 'chroma-js';

interface ContrastGridProps {
	colorScale: { [key: number]: string };
	onClose: () => void;
}

const ContrastGrid: React.FC<ContrastGridProps> = ({ colorScale, onClose }) => {
	const getContrastRatio = (color1: string, color2: string) => {
		return chroma.contrast(color1, color2).toFixed(2);
	};

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className='max-w-[90vw] max-h-[90vh] overflow-auto'>
				<DialogHeader>
					<DialogTitle>Contrast Grid</DialogTitle>
				</DialogHeader>
				<div className='grid grid-cols-11 gap-1'>
					<div className='col-span-1'></div>
					{Object.entries(colorScale).map(([level, hex]) => (
						<div key={level} className='text-center text-xs font-bold'>
							{level}
						</div>
					))}
					{Object.entries(colorScale).map(([rowLevel, rowHex]) => (
						<React.Fragment key={rowLevel}>
							<div className='text-center text-xs font-bold'>{rowLevel}</div>
							{Object.entries(colorScale).map(([colLevel, colHex]) => (
								<div
									key={`${rowLevel}-${colLevel}`}
									className='aspect-square flex items-center justify-center text-xs'
									style={{ backgroundColor: rowHex, color: colHex }}
								>
									{getContrastRatio(rowHex, colHex)}
								</div>
							))}
						</React.Fragment>
					))}
				</div>
				<DialogClose />
			</DialogContent>
		</Dialog>
	);
};

export default ContrastGrid;
