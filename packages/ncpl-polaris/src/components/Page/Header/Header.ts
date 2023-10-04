import { Component } from 'vue';
import type { PageHeaderTitleProps } from './Title';
import type { MenuActionDescriptor, TooltipAction, DestructableAction, DisableableAction, LoadableAction, IconableAction, MenuGroupDescriptor } from "../../types"
import type { BreadcrumbsProps } from "@ncpl-polaris/components/Breadcrumbs"
import type { PaginationProps } from "@ncpl-polaris/components/Pagination"


export interface PageHeaderPrimaryAction
    extends DestructableAction,
    DisableableAction,
    LoadableAction,
    IconableAction,
    TooltipAction {
    /** Provides extra visual weight and identifies the primary action in a set of buttons */
    primary?: boolean;
}


export interface PageHeaderProps extends PageHeaderTitleProps {
    /** Visually hide the title */
    titleHidden?: boolean;
    /** Primary page-level action */
    primaryAction?: PageHeaderPrimaryAction;
    /** Page-level pagination */
    pagination?: PaginationProps;
    /** A back action link */
    backAction?: BreadcrumbsProps['backAction'];
    /** Collection of secondary page-level actions */
    secondaryActions?: MenuActionDescriptor[] | Component;
    /** Collection of page-level groups of secondary actions */
    actionGroups?: MenuGroupDescriptor[];
    /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
    onActionRollup?(hasRolledUp: boolean): void;
}