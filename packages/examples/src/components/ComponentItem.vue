<template>
  <NpPage v-if="name" :title="formatTitle(name.title)" full-width>

    <NpText variant="bodyLg" as="p" style="margin-bottom:30px">{{ name.content }}</NpText>

    <NpBlockStack gap="300" style="margin-bottom:30px">
      <component :is="name.title" />
    </NpBlockStack>
  </NpPage>
</template>
<script lang="ts">
import { computed } from "vue";
import { NpPage, NpText, NpBlockStack } from "@ncpl/ncpl-polaris";
import { useRoute } from "vue-router";
import { components } from "../routes/components";
import { kebabCase, upperFirst, lowerCase } from "lodash";

import AccountConnection from "../views/AccountConnection.vue";
import Button from "../views/Button.vue";
import ButtonGroup from "../views/ButtonGroup.vue";
import PageActions from "../views/PageActions.vue";
import Bleed from "../views/Bleed.vue";
import BlockStack from "../views/BlockStack.vue";
import Box from "../views/Box.vue";
import CalloutCard from "../views/CalloutCard.vue";
import Card from "../views/Card.vue";
import EmptyState from "../views/EmptyState.vue";
import Divider from "../views/Divider.vue";
import FormLayout from "../views/FormLayout.vue";
import Grid from "../views/Grid.vue";
import InlineGrid from "../views/InlineGrid.vue";
import InlineStack from "../views/InlineStack.vue";
import Layout from "../views/Layout.vue";
import MediaCard from "../views/MediaCard.vue";
import Page from "../views/Page.vue";
import Autocomplete from "../views/Autocomplete.vue";
import Checkbox from "../views/Checkbox.vue";
import ChoiceList from "../views/ChoiceList.vue";
import ColorPicker from "../views/ColorPicker.vue";
import Combobox from "../views/Combobox.vue";
import ContextualSaveBar from "../views/ContextualSaveBar.vue";
import DatePicker from "../views/DatePicker.vue";
import DropZone from "../views/DropZone.vue";
import Filters from "../views/Filters.vue";
import Form from "../views/Form.vue";
import IndexFilters from "../views/IndexFilters.vue";
import InlineError from "../views/InlineError.vue";
import RadioButton from "../views/RadioButton.vue";
import RangeSlider from "../views/RangeSlider.vue";
import Select from "../views/Select.vue";
import Tag from "../views/Tag.vue";
import TextField from "../views/TextField.vue";
import Avatar from "../views/Avatar.vue";
import Icon from "../views/Icon.vue";
import KeyboardKey from "../views/KeyboardKey.vue";
import Thumbnail from "../views/Thumbnail.vue";
import VideoThumbnail from "../views/VideoThumbnail.vue";
import Badge from "../views/Badge.vue";
import Banner from "../views/Banner.vue";
import ExceptionList from "../views/ExceptionList.vue";
import Loading from "../views/Loading.vue";
import ProgressBar from "../views/ProgressBar.vue";
import SkeletonBodyText from "../views/SkeletonBodyText.vue";
import SkeletonDisplayText from "../views/SkeletonDisplayText.vue";
import SkeletonPage from "../views/SkeletonPage.vue";
import SkeletonTabs from "../views/SkeletonTabs.vue";
import SkeletonThumbnail from "../views/SkeletonThumbnail.vue";
import Toast from "../views/Toast.vue";
import Text from "../views/Text.vue";
import DataTable from "../views/DataTable.vue";
import IndexTable from "../views/IndexTable.vue";
import ActionList from "../views/ActionList.vue";
import DescriptionList from "../views/DescriptionList.vue";
import List from "../views/List.vue";
import Listbox from "../views/Listbox.vue";
import OptionList from "../views/OptionList.vue";
import ResourceItem from "../views/ResourceItem.vue";
import ResourceList from "../views/ResourceList.vue";
import FooterHelp from "../views/FooterHelp.vue";
import FullscreenBar from "../views/FullscreenBar.vue";
import Link from "../views/Link.vue";
import Navigation from "../views/Navigation.vue";
import Pagination from "../views/Pagination.vue";
import Tabs from "../views/Tabs.vue";
import TopBar from "../views/TopBar.vue";
import Modal from "../views/Modal.vue";
import Popover from "../views/Popover.vue";
import Tooltip from "../views/Tooltip.vue";
import AppProvider from "../views/AppProvider.vue";
import Collapsible from "../views/Collapsible.vue";
import Frame from "../views/Frame.vue";
import Scrollable from "../views/Scrollable.vue";


export default {
  components: {
    NpPage, NpText, NpBlockStack,
    AccountConnection, Button, ButtonGroup, PageActions, Bleed, BlockStack, Box, CalloutCard, Card, EmptyState, Divider, FormLayout, Grid, InlineGrid, InlineStack, Layout, MediaCard, Page, Autocomplete, Checkbox, ChoiceList, ColorPicker, Combobox, ContextualSaveBar, DatePicker, DropZone, Filters, Form, IndexFilters, InlineError, RadioButton, RangeSlider, Select, Tag, TextField, Avatar, Icon, KeyboardKey, Thumbnail, VideoThumbnail, Badge, Banner, ExceptionList, Loading, ProgressBar, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, SkeletonTabs, SkeletonThumbnail, Toast, Text, DataTable, IndexTable, ActionList, DescriptionList, List, Listbox, OptionList, ResourceItem, ResourceList, FooterHelp, FullscreenBar, Link, Navigation, Pagination, Tabs, TopBar, Modal, Popover, Tooltip, AppProvider, Collapsible, Frame, Scrollable
  },
  setup() {
    const route = useRoute();
    const name = computed(() => {
      let n1 = route.path.split('/')[2]
      let n2 = route.path.split('/')[3]
      for (let g of components) {
        if (kebabCase(g.title) == n1) {
          for (let s of g.items) {
            if (kebabCase(s.title) == n2) {
              return s;
            }
          }
        }
      }
      return null;
    })

    const formatTitle = (title) => {
      return upperFirst(lowerCase(title))
    };

    return {
      name,
      formatTitle
    }

  }
}

</script>
<style scoped>
.ThumbnailPreview {
  aspect-ratio: 16/9;
  border-radius: var(--border-radius-600);
  overflow: hidden;
  background: var(--p-color-bg-surface-secondary-hover);
  position: relative;
  border: 1px solid var(--p-color-border);
}

h4 {
  color: var(--text-strong);
  font-size: var(--font-size-600);
  font-weight: var(--font-weight-700);
  letter-spacing: var(--letter-spacing-200);
  line-height: 1.25;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  color: var(--text-link);
  display: flex;
  align-items: center;
  gap: .5rem;
}

p {
  padding-right: .5rem;
  color: var(--text);
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>