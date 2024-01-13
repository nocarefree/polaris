import { withInstall } from '@ncpl-polaris/utils'
import IndexTable from './IndexTable.vue'

export const NpIndexTable = withInstall(IndexTable)
export default NpIndexTable

export * from './types';
export * from './Cell';
export * from './Row';
