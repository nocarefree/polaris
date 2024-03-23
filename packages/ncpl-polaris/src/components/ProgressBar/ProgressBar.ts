type Size = 'small' | 'medium' | 'large';
type Tone = 'highlight' | 'primary' | 'success' | 'critical';

export type ProgressBarProps = {
      /**
   * The progression of certain tasks
   * @default 0
   */
  progress?: number;
  /**
   * Size of progressbar
   * @default 'medium'
   */
  size?: Size;
  /**
   * Whether the fill animation is triggered
   * @default 'true'
   */
  animated?: boolean;
  /**
   * Id (ids) of element (elements) that describes progressbar
   */
  ariaLabelledBy?: string;
  /**
   * Color of progressbar
   * @default 'highlight'
   */
  tone?: Tone;
}
