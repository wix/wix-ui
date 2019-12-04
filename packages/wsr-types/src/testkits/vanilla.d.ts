import {VanillaTestkitFactory} from "wix-style-react/dist/testkit";

declare module "wix-style-react/dist/testkit" {
  type VanillaTestkitFactory<T extends __WSRTests.BaseDriver> = (
    params: VanillaTeskitParams
  ) => T;

  type VanillaUniTestkitFactory<T extends __WSRTests.BaseUniDriver> = (
    params: VanillaTeskitParams
  ) => T;

  interface VanillaTeskitParams {
    wrapper: HTMLElement;
    dataHook: string;
  }

  export const loaderTestkitFactory: VanillaTestkitFactory<__WSRTests.LoaderDriver>;
  export const textTestkitFactory: VanillaTestkitFactory<__WSRTests.TextDriver>;
  export const buttonTestkitFactory: VanillaUniTestkitFactory<__WSRTests.ButtonUniDriver>;
  export const textButtonTestkitFactory: VanillaUniTestkitFactory<__WSRTests.TextButtonUniDriver>;
  export const emptyStateTestkitFactory: VanillaTestkitFactory<__WSRTests.EmptyStateDriver>;
  export const headingTestkitFactory: VanillaTestkitFactory<__WSRTests.HeadingDriver>;
  export const dropdownLayoutTestkitFactory: VanillaTestkitFactory<__WSRTests.DropdownLayoutDriver>;
  export const labelTestkitFactory: VanillaTestkitFactory<__WSRTests.LabelDriver>;
  export const checkboxTestkitFactory: VanillaTestkitFactory<__WSRTests.CheckboxDriver>;
  export const inputTestkitFactory: VanillaTestkitFactory<__WSRTests.InputDriver>;
  export const formFieldTestkitFactory: VanillaTestkitFactory<__WSRTests.FormFieldDriver>;
  export const pageHeaderTestkitFactory: VanillaTestkitFactory<__WSRTests.PageHeaderDriver>;
  export const pageTestkitFactory: VanillaTestkitFactory<__WSRTests.PageDriver>;
  export const modalTestkitFactory: VanillaTestkitFactory<__WSRTests.ModalDriver<
    HTMLElement
  >>;
  export const closeButtonTestkitFactory: VanillaUniTestkitFactory<__WSRTests.CloseButtonUniDriver>;
  export const iconButtonTestkitFactory: VanillaUniTestkitFactory<__WSRTests.IconButtonUniDriver>;
  export const skeletonTestkitFactory: VanillaTestkitFactory<__WSRTests.SkeletonDriver>;
  export const filePickerTestkitFactory: VanillaTestkitFactory<__WSRTests.FilePickerDriver>;
  export const sectionHelperTestkitFactory: VanillaTestkitFactory<__WSRTests.FilePickerDriver>;
  export const toggleButtonTestkitFactory: VanillaUniTestkitFactory<__WSRTests.ToggleButtonUniDriver>;
  export const messageBoxFunctionalLayoutTestkitFactory: VanillaTestkitFactory<__WSRTests.MessageBoxFunctionalLayoutDriver<
    HTMLElement
  >>;
  export const messageBoxMarketerialLayoutTestkitFactory: VanillaTestkitFactory<__WSRTests.MessageBoxMarketerialLayoutDriver>;
  export const modalMobileLayoutTestkitFactory: VanillaUniTestkitFactory<__WSRTests.ModalMobileLayoutUniDriver>;
  export const modalPreviewLayoutTestkitFactory: VanillaUniTestkitFactory<__WSRTests.ModalPreviewLayoutUniDriver>;
  export const modalSelectorLayoutTestkitFactory: VanillaTestkitFactory<__WSRTests.ModalSelectorLayoutDriver>;
  export const genericModalLayoutTestkitFactory: VanillaTestkitFactory<__WSRTests.GenericModalLayoutDriver>;
  export const selectorTestkitFactory: VanillaTestkitFactory<__WSRTests.SelectorDriver>;
  export const radioGroupTestkitFactory: VanillaTestkitFactory<__WSRTests.RadioGroupDriver>;
  export const radioButtonTestkitFactory: VanillaTestkitFactory<__WSRTests.RadioButtonDriver>;
  export const fillButtonTestkitFactory: VanillaUniTestkitFactory<__WSRTests.FillButtonUniDriver>;
  export const tagTestkitFactory: VanillaTestkitFactory<__WSRTests.TagDriver>;
  export const highlighterTestkitFactory: VanillaTestkitFactory<__WSRTests.HighlighterDriver<
    HTMLElement
  >>;
  export const stepperTestkitFactory: VanillaUniTestkitFactory<__WSRTests.StepperUniDriver>;
  export const segmentedToggleTestkitFactory: VanillaUniTestkitFactory<__WSRTests.SegmentedToggleUniDriver>;
  export const accordionTestkitFactory: VanillaUniTestkitFactory<__WSRTests.AccordionUniDriver>;
  export const imageViewerTestkitFactory: VanillaTestkitFactory<__WSRTests.ImageViewerDriver<
    HTMLElement
  >>;
  export const floatingHelperTestkitFactory: VanillaUniTestkitFactory<__WSRTests.FloatingNotificationUniDriver>;
  export const socialPreviewTestkitFactory: VanillaUniTestkitFactory<__WSRTests.SocialPreviewUniDriver>;
  export const fillPreviewTestkitFactory: VanillaUniTestkitFactory<__WSRTests.FillPreviewUniDriver>;
  export const statisticsWidgetTestkitFactory: VanillaUniTestkitFactory<__WSRTests.StatisticsWidgetUniDriver>;
  export const thumbnailTestkitFactory: VanillaUniTestkitFactory<__WSRTests.ThumbnailUniDriver>;
  export const linearProgressBarTestkitFactory: VanillaTestkitFactory<__WSRTests.LinearProgressBarDriver>;
  export const errorIndicatorTestkitFactory: VanillaUniTestkitFactory<__WSRTests.ErrorIndicatorUniDriver>;
  export const addItemTestkitFactory: VanillaTestkitFactory<__WSRTests.AddItemDriver<
    HTMLElement
  >>;
  export const inputWithOptionsTestkitFactory: VanillaTestkitFactory<__WSRTests.InputWithOptionsDriver>;
  export const searchTestkitFactory: VanillaTestkitFactory<__WSRTests.SearchDriver>;
  export const dropdownTestkitFactory: VanillaTestkitFactory<__WSRTests.DropdownDriver>;
  export const dropdownBaseTestkitFactory: VanillaUniTestkitFactory<__WSRTests.DropdownBaseUniDriver>;
  export const counterBadgeTestkitFactory: VanillaTestkitFactory<__WSRTests.CounterBadgeDriver>;
  export const autoCompleteTestkitFactory: VanillaTestkitFactory<__WSRTests.AutoCompleteDriver>;
  export const dataTableTestkitFactory: VanillaTestkitFactory<__WSRTests.DataTableDriver>;
  export const tableTestkitFactory: VanillaTestkitFactory<__WSRTests.TableDriver<
    HTMLElement
  >>;

  export const autoCompleteCompositeTestkitFactory: any;
  export const avatarTestkitFactory: any;
  export const badgeTestkitFactory: any;
  export const badgeSelectTestkitFactory: any;
  export const boxTestkitFactory: any;
  export const breadcrumbsTestkitFactory: any;

  export const calendarTestkitFactory: any;
  export const calendarPanelTestkitFactory: any;
  export const calendarPanelFooterTestkitFactory: any;
  export const cardGalleryItemTestkitFactory: VanillaUniTestkitFactory<__WSRTests.CardGalleryItemUniDriver>;
  export const carouselTestkitFactory: any;
  export const circularProgressBarTestkitFactory: any;
  export const colorInputTestkitFactory: any;
  export const colorPickerTestkitFactory: any;
  export const contactItemBuilderTestkitFactory: any;
  export const dateInputTestkitFactory: any;
  export const datePickerTestkitFactory: any;
  export const editableSelectorTestkitFactory: any;
  export const editableTitleTestkitFactory: any;
  export const floatingNotificationTestkitFactory: any;
  export const googleAddressInputWithLabelTestkitFactory: any;
  export const googlePreviewTestkitFactory: any;
  export const inputAreaTestkitFactory: any;
  export const listItemActionTestkitFactory: any;
  export const multiSelectTestkitFactory: any;
  export const multiSelectCheckboxTestkitFactory: any;
  export const multiSelectCompositeTestkitFactory: any;
  export const nestableListTestkitFactory: any;
  export const noBorderInputTestkitFactory: any;
  export const notificationTestkitFactory: any;
  export const numberInputTestkitFactory: any;
  export const popoverTestkitFactory: any;
  export const popoverMenuTestkitFactory: any;
  export const proportionTestkitFactory: any;
  export const rangeTestkitFactory: any;
  export const richTextInputAreaTestkitFactory: any;
  export const sidebarTestkitFactory: any;
  export const sidebarSectionTitleTestkitFactory: any;
  export const sliderTestkitFactory: any;
  export const sortableListTestkitFactory: any;
  export const statsWidgetTestkitFactory: any;
  export const swatchesTestkitFactory: any;
  export const tableActionCellTestkitFactory: any;
  export const tabsTestkitFactory: any;
  export const timeInputTestkitFactory: any;
  export const toggleSwitchTestkitFactory: any;
  export const sidebarSectionItemTestkitFactory: any;
  export const sidebarDividerTestkitFactory: any;
  export const sidebarBackButtonTestkitFactory: any;
  export const sidebarHeaderTestkitFactory: any;
  export const composerHeaderTestkitFactory: any;
  export const barChartTestkitFactory: any;
  export const inputWithLabelTestkitFactory: any;
  export const autoCompleteWithLabelTestkitFactory: any;
  export const dividerTestkitFactory: any;
  export const labelledElementTestkitFactory: any;
  export const mediaOverlayTestkitFactory: any;
  export const infoIconTestkitFactory: any;
  export const socialButtonTestkitFactory: any;
  export const verticalTabsTestkitFactory: any;
  export const verticalTabsItemTestkitFactory: any;
  export const sideMenuDrillTestkitFactory: any;
  export const headerTestkitFactory: any;
  export const sideMenuTestkitFactory: any;
  export const draggableTestkitFactory: any;
  export const editableRowTestkitFactory: any;
  export const fieldLabelAttributesTestkitFactory: any;
  export const fieldWithSelectionCompositeTestkitFactory: any;
  export const cardSubheaderTestkitFactory: any;
  export const tooltipTestkitFactory: any;
  export const TooltipTestkit: any;
  export const previewWidgetTestkitFactory: any;
  export const mobilePreviewWidgetTestkitFactory: any;
  export const browserPreviewWidgetTestkitFactory: any;
  export const timeTableTestkitFactory: any;
  export const marketingLayoutTestkitFactory: any;
}
