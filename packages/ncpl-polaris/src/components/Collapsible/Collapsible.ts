

interface Transition {
	duration?: string;
	timingFunction?: string;
}

export interface CollapsibleProps {
	id: string;
	expandOnPrint?: boolean;
	open: boolean;
	transition?: boolean | Transition;
	onAnimationEnd?(): void;
}