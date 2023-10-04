import type {
  Component,
} from "vue";
import type { I18n } from "@ncpl-polaris/utils";

export interface FeaturesConfig {
  [key: string]: boolean | undefined;
}

type I18nPropType = ConstructorParameters<typeof I18n>[0];

export type AppProviderProps = {
  i18n?: I18nPropType;
  features?: FeaturesConfig;
  linkComponent?: Component;
}
