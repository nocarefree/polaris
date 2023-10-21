<template>
  <div :class="wrapperClassName" ref="dataTable">
    <AfterInitialMount>
      <div :class="styles.StickyHeaderWrapper" role="presentation">
        <Sticky :bounding-element="dataTable"
          @stickyChange="(isSticky) => { this.changeHeadingFocus(); this.stickyHeaderActive = isSticky; }">
          <template #default="{ isSticky }">
            <div :class="stickyHeaderInnerClassNames">
              <div>
                <Navigation :column-visibility-data="columnVisibilityData"
                  :is-scrolled-farthest-left="isScrolledFarthestLeft"
                  :is-scrolled-farthest-right="isScrolledFarthestRight" :navigate-table-left="this.navigateTable('left')"
                  :navigate-table-right="this.navigateTable('right')" :fixed-first-columns="fixedFirstColumns"
                  :ref="(ref: any) => { if (location === 'header') { this.headerNav = ref; } else if (location === 'sticky') { this.stickyNav = ref; } }" />
              </div>
              <table class="stickyHeaderTableClassNames" ref="this.stickyTable">
                <thead>
                  <tr class="styles.StickyTableHeadingsRow">
                    <Heading v-for="heading in headings" :heading="heading" v-bind="{
                      headingIndex: index,
                      inFixedNthColumn: Boolean(
                        index <= fixedFirstColumns - 1 &&
                        fixedFirstColumns,
                      ),
                      inStickyHeader: true,
                    }"></Heading>
                  </tr>
                </thead>
              </table>
            </div>
          </template>
        </Sticky>
      </div>
    </AfterInitialMount>
    <Navigation 
      :column-visibility-data="columnVisibilityData" :
      :is-scrolled-farthest-left="isScrolledFarthestLeft"
      :is-scrolled-farthest-right="isScrolledFarthestRight" 
      :navigate-table-left="this.navigateTable('left')"
      :navigate-table-right="this.navigateTable('right')" 
      :fixed-first-columns="fixedFirstColumns"
      :ref="(ref: any) => { if (location === 'header') { this.headerNav = ref;  } else if (location === 'sticky') {this.stickyNav = ref; } }" />
    <div :class="className">
      <div :class="styles.ScrollContainer" ref="scrollContainer">
        <EventListener event="resize" handler="this.handleResize" />
        <EventListener capture passive event="scroll" handler="this.scrollListener" />
        <table v-if="condensed && fixedFirstColumns !== 0"
          :class="classNames( styles.FixedFirstColumn, !isScrolledFarthestLeft && styles.separate,)"
          :style="{ width: `${columnVisibilityData[fixedFirstColumns - 1]?.rightEdge}px` }">
          <thead>
            <tr :style="{ height: `${headerRowHeights[0]}px` }">
              <Heading v-for="heading in nthHeadings" v-bind="{
                heading,
                headingIndex: index,
                inFixedNthColumn: true,
                inStickyHeader: false,
              }"></Heading>
            </tr>
            <tr v-if="totals && !showTotalsInFooter" :style="{ height: `${headerRowHeights[1]}px` }">
              <Total v-for="(total, index) in nthTotals" :total="total"></Total>
            </tr>
          </thead>
          <tbody>
            <Row v-for="row in nthColumns" v-bind="{
            row,
            index,
            inFixedNthColumn: true,
            rowHeights: bodyRowHeights,
            }" ></Row>
          </tbody>
          <tfoot v-if="totals && showTotalsInFooter">
            <tr>
              <Total v-for="(total, index) in nthTotals" :total="total"></Total>
            </tr>
          </tfoot>
        </table>
        <table class="styles.Table" ref="this.table">
          <thead>
            <tr>
              <Heading v-for="heading in headings" v-bind="{
                heading,
                headingIndex: index,
                inFixedNthColumn: false,
                inStickyHeader: false,
              }"></Heading>
            </tr>
            <tr><Total v-for="(total, index) in nthTotals" :total="total"></Total></tr>
          </thead>
          <tbody>
            <Row v-for="row in rows" v-bind="{
              row,
              index,
              inFixedNthColumn: false,
            }" ></Row>
          </tbody>
          <tr><Total v-for="(total, index) in nthTotals" :total="total"></Total></tr>
        </table>
      </div>
      <div v-if="$slots.footerContent" :class="styles.Footer"><slot name="footerContent"></slot></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { DataTableProps } from './DataTable'
import styles from './DataTable.module.scss'

defineOptions({
  name: 'NpDataTable',
})
defineProps<DataTableProps>()
</script>
