import { withInstall } from '../../utils'
import BulkActions from './BulkActions.vue'

export const NpBulkActions = withInstall(BulkActions)
export default NpBulkActions
export * from './BulkActions'
export * from "./use-is-bulk-actions-sticky"