interface SourceSet {
  source: string;
  descriptor?: string;
}

export interface ImageProps {
  source?: string;
  sourceSet?: SourceSet[];
}
