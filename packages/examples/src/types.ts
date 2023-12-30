export interface ApiItemType {
    name: string,
    required?: boolean,
    type?: string,
    expands?: ApiType[],
    description?: string,
    defaultValue?: string,
}

export interface ApiType {
    name: string,
    kind?: 'enum' | 'type' | 'interface',
    types: ApiItemType[],
}

export interface ComponentApiType {
    label: string,
    types:ApiItemType[],
}
