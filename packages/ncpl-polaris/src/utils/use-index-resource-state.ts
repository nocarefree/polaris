import { ref } from 'vue';

export enum SelectionType {
  All = 'all',
  Page = 'page',
  Multi = 'multi',
  Single = 'single',
  Range = 'range',
}
type Range = [number, number];
type ResourceIDResolver<T extends { [key: string]: unknown }> = (
  resource: T,
) => string;

function defaultResourceIDResolver(resource: { [key: string]: any }): string {
  if ('id' in resource) {
    return resource.id;
  }

  throw new Error(
    'Your resource does not directly contain an `id`. Pass a `resourceIDResolver` to `useIndexResourceState`',
  );
}

export function useIndexResourceState<T extends { [key: string]: unknown }>(
  resources: T[],
  {
    selectedResources: initSelectedResources = [],
    allResourcesSelected: initAllResourcesSelected = false,
    resourceIDResolver = defaultResourceIDResolver,
    resourceFilter = undefined,
  }: {
    selectedResources?: string[];
    allResourcesSelected?: boolean;
    resourceIDResolver?: ResourceIDResolver<T>;
    resourceFilter?: (value: T, index: number) => boolean;
  } = {
      selectedResources: [],
      allResourcesSelected: false,
      resourceIDResolver: defaultResourceIDResolver,
      resourceFilter: undefined,
    },
) {
  const selectedResources = ref(initSelectedResources);
  const allResourcesSelected = ref(initAllResourcesSelected);

  const handleSelectionChange =
    (
      selectionType: SelectionType,
      isSelecting: boolean,
      selection?: string | Range,
    ) => {
      if (selectionType === SelectionType.All) {
        allResourcesSelected.value = isSelecting;
      } else if (allResourcesSelected) {
        allResourcesSelected.value = false;
      }

      switch (selectionType) {
        case SelectionType.Single:
          selectedResources.value = isSelecting ? [...selectedResources.value, selection as string] : selectedResources.value.filter((id) => id !== selection);
          break;
        case SelectionType.All:
        case SelectionType.Page:
          if (resourceFilter) {
            const filteredResources = resources.filter(resourceFilter);
            selectedResources.value = isSelecting && selectedResources.value.length < filteredResources.length ? filteredResources.map(resourceIDResolver) : [];
          } else {
            selectedResources.value = isSelecting ? resources.map(resourceIDResolver) : [];
          }

          break;
        case SelectionType.Multi:
          if (!selection) break;
          selectedResources.value = ((currentSelectedResources) => {
            const ids: string[] = [];
            const filteredResources = resourceFilter
              ? resources.filter(resourceFilter)
              : resources;
            for (
              let i = selection[0] as number;
              i <= (selection[1] as number);
              i++
            ) {
              if (filteredResources.includes(resources[i])) {
                const id = resourceIDResolver(resources[i]);

                if (
                  (isSelecting && !currentSelectedResources.includes(id)) ||
                  (!isSelecting && currentSelectedResources.includes(id))
                ) {
                  ids.push(id);
                }
              }
            }

            return isSelecting
              ? [...currentSelectedResources, ...ids]
              : currentSelectedResources.filter((id) => !ids.includes(id));
          })(selectedResources.value);

          break;
        case SelectionType.Range:
          if (!selection) break;

          selectedResources.value = ((currentSelectedResources) => {
            const filteredResources = resourceFilter
              ? resources.filter(resourceFilter)
              : resources;

            const resourceIds = filteredResources.map(resourceIDResolver);

            const selectedIds = resourceIds.slice(
              Number(selection[0]),
              Number(selection[1]) + 1,
            );

            const isIndeterminate = selectedIds.some((id) => {
              return currentSelectedResources.includes(id);
            });

            const isChecked = selectedIds.every((id) => {
              return currentSelectedResources.includes(id);
            });

            const isSelectingAllInRange =
              !isChecked && (isSelecting || isIndeterminate);

            const nextSelectedResources = isSelectingAllInRange
              ? [
                ...new Set([
                  ...currentSelectedResources,
                  ...selectedIds,
                ]).values(),
              ]
              : currentSelectedResources.filter(
                (id) => !selectedIds.includes(id),
              );

            return nextSelectedResources;
          })(selectedResources.value);
          break;
      }
    }

  const clearSelection = () => {
    selectedResources.value = [];
    allResourcesSelected.value = false;
  };

  const removeSelectedResources = (removeResources: string[]) => {
    const selectedResourcesCopy = [...selectedResources.value];

    const newSelectedResources = selectedResourcesCopy.filter(
      (resource) => !removeResources.includes(resource),
    );

    selectedResources.value = newSelectedResources;

    if (newSelectedResources.length === 0) {
      allResourcesSelected.value = false;
    }
  }

  return {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
    removeSelectedResources,
  };
}
