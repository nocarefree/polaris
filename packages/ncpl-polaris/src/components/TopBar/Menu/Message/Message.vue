<template>
  <div :class="styles.Section">
    <PopoverSection>
      <LegacyStack vertical spacing="tight">
        <TextContainer>
          <Text variant="headingMd" as="h2">
            {{ title }}
            <Badge v-if="badge" :tone="badge.tone">{{ badge.content }}</Badge>
          </Text>
          <p>{{ description }}</p>
        </TextContainer>

        <Link :url="link.to">{{ link.content }}</Link>

        <Button plain @click="action.onClick">
          {{ action.content }}
        </Button>
      </LegacyStack>
    </PopoverSection>
  </div>
</template>
<script setup lang="ts">
import { MessageProps } from "./Message"
import PopoverSection from '../../../Popover/Section';
import LegacyStack from '../../../LegacyStack';
import TextContainer from '../../../TextContainer';
import Text from '../../../Text';
import Link from '../../../Link';
import Button from '../../../Button';
import Badge from '../../../Badge';
import styles from './Message.module.scss';

defineProps<MessageProps>();
</script>