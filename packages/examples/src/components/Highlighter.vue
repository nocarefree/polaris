<template>
    <span v-if="className" :class="className">{{ type }}</span>
    <template v-else-if="isType">
        <span class="SyntaxType">
            <button class="ExpandableType" @click="$emit('click', type)">
                {{ type }}
            </button>
        </span>
    </template>
    <template v-else-if="prev === type">{{ type }}</template>
    <template v-else>
        <Highlighter v-for="token in type.split(tokenRegex)" :prev="type" :type="token" @click="e => $emit('click', e)" />
    </template>
</template>
<script setup lang="ts">

const tokenRegex = /([^a-z0-9'"/-]+)/gi;
const wordRegext = /^[a-z]+$/gi;
const { type, prev } = defineProps<{ type: string, prev?: string }>();
defineEmits(['click'])

const isString =
    type === 'string' ||
    type.match(/^['][^']+'$/) !== null ||
    type.match(/^["][^"]+"$/) !== null;
const isType =
    type.match(/^[A-Z][A-Za-z]+$/) || type === 'any' || type === 'void';

let className = null;
if (isString) {
    className = 'SyntaxString';
} else if (type === 'boolean') {
    className = 'SyntaxBoolean'
} else if (type === 'number' || !Number.isNaN(parseInt(type))) {
    className = 'SyntaxNumber';
} else if (isType) {

} else if (type.match(wordRegext)) {
    className = 'SyntaxKeyword';
}

</script>
<style lang="scss">
.SyntaxString {
    color: var(--code-string);
}

.SyntaxBoolean {
    color: var(--code-boolean);
}

.SyntaxType {
    color: var(--code-keyword);
}

.SyntaxNumber {
    color: var(--code-number);
}

.ExpandableType {
    background: transparent;
    border-bottom: 1px dashed var(--border-color);
    border: none;
    color: inherit;
    padding: 0;
}
</style>