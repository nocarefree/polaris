<template>
    <li :class="classNames(
        styles.Item,
        status && styles[variationName('status', status)],
    )">
        <span :class="styles.Icon">
            <Icon v-if="icon" :source="icon" />
            <span v-else :class="styles.Bullet" />
        </span>
        <Truncate v-if="truncate">
            <span v-if="title" :class="styles.Title"> {{ title }} </span>
            <span v-if="description" :class="styles.Description"> {{ description }} </span>
        </Truncate>
        <template v-else>
            <span v-if="title" :class="styles.Title"> {{ title }} </span>
            <span v-if="description" :class="styles.Description"> {{ description }} </span>
        </template>
    </li>
</template>
<script setup lang="ts">
import Icon from "../Icon";
import Truncate from "../Truncate";
import styles from "./ExceptionList.module.scss";
import type { ExceptionListItemProps } from './ExceptionList';
import { classNames, variationName } from "@ncpl-polaris/utils";


defineProps<ExceptionListItemProps>();
</script>