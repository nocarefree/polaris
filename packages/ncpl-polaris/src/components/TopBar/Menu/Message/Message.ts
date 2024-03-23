import type { BadgeProps } from '@ncpl-polaris/components/Badge';

export interface MessageProps {
    title: string;
    description: string;
    action: { onClick(): void; content: string };
    link: { to: string; content: string };
    badge?: { content: string; status: BadgeProps['status'] };
}