import { withInstall } from '@ncpl-polaris/utils'
import Autocomplete from './Autocomplete.vue'

export const NpAutocomplete = withInstall(Autocomplete)
export default NpAutocomplete

export * from './Autocomplete';
export * from './TextField';
export * from './MappedAction';
export * from './MappedOption';
