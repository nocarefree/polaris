import type { BadgeProps } from '../../../Badge';

export interface MessageProps {
    title: string;
    description: string;
    action: { onClick(): void; content: string };
    link: { to: string; content: string };
    badge?: { content: string; tone: BadgeProps['tone'] };
}