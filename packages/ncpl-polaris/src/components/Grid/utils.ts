export function formatAreas(areas?: string[]) {
    if (!areas) return;
    return `'${areas?.join(`' '`)}'`;
}