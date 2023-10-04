<template>
  <div :class="styles.Section">
    <PopoverSection>
      <LegacyStack vertical spacing="tight">
        <TextContainer>
          <Text variant="headingMd" as="h2">
            {{ title }}
            <Badge v-if="badge" :status="badge.status">{{ badge.content }}</Badge>
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
import PopoverSection from '@ncpl-polaris/components/Popover/Section';
import LegacyStack from '@ncpl-polaris/components/LegacyStack';
import TextContainer from '@ncpl-polaris/components/TextContainer';
import Text from '@ncpl-polaris/components/Text';
import Link from '@ncpl-polaris/components/Link';
import Button from '@ncpl-polaris/components/Button';
import Badge from '@ncpl-polaris/components/Badge';
import styles from './Message.module.scss';

defineProps<MessageProps>();
</script>