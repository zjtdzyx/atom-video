/**
 * @file naive-ui.ts
 * @description Naive UI组件注册和配置
 * @created 2024-04-05
 */
import { create, NButton, NInput, NInputNumber, NSelect, NSwitch, NDatePicker, NTimePicker, NForm, NFormItem, NRadio, NRadioGroup, NCheckbox, NCheckboxGroup, NSlider, NProgress, NLoadingBarProvider, NMessageProvider, NDialogProvider, NConfigProvider, NIcon, NAvatar, NBadge, NTag, NTabs, NTabPane, NCard, NList, NListItem, NThing, NPopover, NDropdown, NMenu, NGrid, NGridItem, NSpace, NDivider, NSpin, NEmpty, NPagination, NImage, NImageGroup, NUpload, NModal, NDrawer, NTooltip, NCollapse, NCollapseItem, NTimeline, NTimelineItem, NResult, NStatistic, NWatermark, NColorPicker, NRate, NTree, NTreeSelect, NDescriptions, NDescriptionsItem, NTable, NDataTable, NInputGroup, NCode, NEl, NScrollbar, NCarousel, NCarouselItem, NBackTop, NSteps, NStep, NAlert, NBreadcrumb, NBreadcrumbItem, NAffix, NRow, NCol, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NLayoutSider, } from 'naive-ui';
const naive = create({
    components: [
        NButton,
        NInput,
        NInputNumber,
        NSelect,
        NSwitch,
        NDatePicker,
        NTimePicker,
        NForm,
        NFormItem,
        NRadio,
        NRadioGroup,
        NCheckbox,
        NCheckboxGroup,
        NSlider,
        NProgress,
        NIcon,
        NAvatar,
        NBadge,
        NTag,
        NTabs,
        NTabPane,
        NCard,
        NList,
        NListItem,
        NThing,
        NPopover,
        NDropdown,
        NMenu,
        NGrid,
        NGridItem,
        NSpace,
        NDivider,
        NSpin,
        NEmpty,
        NPagination,
        NImage,
        NImageGroup,
        NUpload,
        NModal,
        NDrawer,
        NTooltip,
        NCollapse,
        NCollapseItem,
        NTimeline,
        NTimelineItem,
        NResult,
        NStatistic,
        NWatermark,
        NColorPicker,
        NRate,
        NTree,
        NTreeSelect,
        NDescriptions,
        NDescriptionsItem,
        NTable,
        NDataTable,
        NInputGroup,
        NCode,
        NEl,
        NScrollbar,
        NCarousel,
        NCarouselItem,
        NBackTop,
        NSteps,
        NStep,
        NAlert,
        NBreadcrumb,
        NBreadcrumbItem,
        NAffix,
        NRow,
        NCol,
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutFooter,
        NLayoutSider,
    ],
});
export const setupNaiveUI = (app) => {
    app.use(naive);
    // 注册全局provider组件
    app.component('NMessageProvider', NMessageProvider);
    app.component('NDialogProvider', NDialogProvider);
    app.component('NLoadingBarProvider', NLoadingBarProvider);
    app.component('NConfigProvider', NConfigProvider);
};
export default setupNaiveUI;
//# sourceMappingURL=naive-ui.js.map