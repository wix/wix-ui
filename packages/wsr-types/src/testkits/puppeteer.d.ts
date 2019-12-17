declare module "wix-style-react/dist/testkit/puppeteer" {
  import { Page } from "puppeteer";

  type PuppeteerTestkitFactory<T> = (
    params: PuppeteerTestkitParams
  ) => Promise<T>;

  type PuppeteerUniTestkitFactory<T extends __WSRTests.BaseUniDriver> = (
    params: PuppeteerTestkitParams
  ) => Promise<T>;

  interface PuppeteerTestkitParams {
    dataHook: string;
    page: Page;
  }

  export const loaderTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.LoaderUniDriver>;
  export const textTestkitFactory: PuppeteerTestkitFactory<__WSRTests.TextPuppeteerDriver>;
  export const buttonTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.ButtonUniDriver>;
  export const textButtonTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.TextButtonUniDriver>;
  export const emptyStateTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.EmptyStateUniDriver>;
  export const headingTestkitFactory: PuppeteerTestkitFactory<__WSRTests.HeadingPuppeteerDriver>;
  export const dropdownLayoutTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.DropdownLayoutUniDriver>;
  export const checkboxTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.CheckboxUniDriver>;
  export const inputTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.InputUniDriver>;
  export const formFieldTestkitFactory: PuppeteerTestkitFactory<__WSRTests.FormFieldPuppeteerDriver>;
  export const pageHeaderTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.PageHeaderUniDriver>;
  export const pageTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.PageUniDriver>;
  export const modalTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.ModalUniDriver>;
  export const closeButtonTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.CloseButtonUniDriver>;
  export const iconButtonTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.IconButtonUniDriver>;
  export const filePickerTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.FilePickerUniDriver>;
  export const sectionHelperTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.SectionHelperUniDriver>;
  export const toggleButtonTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.ToggleButtonUniDriver>;
  export const messageBoxFunctionalLayoutTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.MessageBoxFunctionalLayoutUniDriver>;
  export const messageBoxMarketerialLayoutTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.MessageBoxMarketerialLayoutUniDriver>;
  export const modalMobileLayoutTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.ModalMobileLayoutUniDriver>;
  export const modalPreviewLayoutTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.ModalPreviewLayoutUniDriver>;
  export const genericModalLayoutTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.GenericModalLayoutUniDriver>;
  export const fillButtonTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.FillButtonUniDriver>;
  export const tagTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.TagUniDriver>;
  export const linearProgressBarTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.LinearProgressBarUniDriver>;
  export const errorIndicatorTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.ErrorIndicatorUniDriver>;
  export const addItemTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.AddItemUniDriver>;
  export const stepperTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.StepperUniDriver>;
  export const segmentedToggleTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.SegmentedToggleUniDriver>;
  export const accordionTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.AccordionUniDriver>;
  export const imageViewerTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.ImageViewerUniDriver>;
  export const floatingNotificationTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.FloatingNotificationUniDriver>;
  export const socialPreviewTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.SocialPreviewUniDriver>;
  export const fillPreviewTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.FillPreviewUniDriver>;
  export const statisticsWidgetTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.StatisticsWidgetUniDriver>;
  export const thumbnailTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.ThumbnailUniDriver>;
  export const multiSelectTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.MultiSelectUniDriver>;
  export const multiSelectCheckboxTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.MultiSelectCheckboxUniDriver>;
  export const googlePreviewTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.GooglePreviewUniDriver>;

  export const inputWithOptionsTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.InputWithOptionsUniDriver>;
  export const searchTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.SearchUniDriver>;
  export const dropdownTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.DropdownUniDriver>;
  export const dropdownBaseTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.DropdownBaseUniDriver>;
  export const autoCompleteTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.AutoCompleteUniDriver>;
  export const dataTableTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.DataTableUniDriver>;
  export const tableTestkitFactory: PuppeteerTestkitFactory<__WSRTests.TablePuppeteerDriver>;
  export const timeInputTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.TimeInputUniDriver>;
  export const dateInputTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.DateInputUniDriver>;
  export const notificationTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.NotificationUniDriver>;
  export const calendarPanelFooterTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.CalendarPanelFooterUniDriver>;
  export const cardGalleryItemTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.CardGalleryItemUniDriver>;
  export const sliderTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.SliderUniDriver>;
  export const colorPickerTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.ColorPickerUniDriver>;
  export const proportionTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.ProportionUniDriver>;
  export const swatchesTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.SwatchesUniDriver>;
  export const tabsTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.TabsUniDriver>;
  export const autoCompleteCompositeTestkitFactory: any;
  export const avatarTestkitFactory: any;
  export const badgeTestkitFactory: any;
  export const badgeSelectTestkitFactory: any;
  export const boxTestkitFactory: any;
  export const breadcrumbsTestkitFactory: any;
  export const calendarTestkitFactory: any;
  export const calendarPanelTestkitFactory: PuppeteerUniTestkitFactory<__WSRTests.CalendarPanelUniDriver>;
  export const carouselTestkitFactory: any;
  export const circularProgressBarTestkitFactory: any;
  export const colorInputTestkitFactory: any;
  export const contactItemBuilderTestkitFactory: any;
  export const datePickerTestkitFactory: any;
  export const editableSelectorTestkitFactory: any;
  export const editableTitleTestkitFactory: any;
  export const floatingHelperTestkitFactory: any;
  export const googleAddressInputWithLabelTestkitFactory: any;
  export const highlighterTestkitFactory: any;
  export const inputAreaTestkitFactory: any;
  export const listItemActionTestkitFactory: any;
  export const listItemSectionTestkitFactory: any;
  export const listItemSelectTestkitFactory: any;
  export const multiSelectCompositeTestkitFactory: any;
  export const noBorderInputTestkitFactory: any;
  export const numberInputTestkitFactory: any;
  export const popoverTestkitFactory: any;
  export const popoverMenuTestkitFactory: any;
  export const rangeTestkitFactory: any;
  export const richTextInputAreaTestkitFactory: any;
  export const sidebarTestkitFactory: any;
  export const sidebarSectionTitleTestkitFactory: any;
  export const statsWidgetTestkitFactory: any;
  export const tableActionCellTestkitFactory: any;
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
  export const editableRowTestkitFactory: any;
  export const fieldLabelAttributesTestkitFactory: any;
  export const fieldWithSelectionCompositeTestkitFactory: any;
  export const radioButtonTestkitFactory: any;
  export const cardSubheaderTestkitFactory: any;
  export const tooltipTestkitFactory: any;
  export const TooltipTestkit: any;
  export const previewWidgetTestkitFactory: any;
  export const mobilePreviewWidgetTestkitFactory: any;
  export const browserPreviewWidgetTestkitFactory: any;
  export const timeTableTestkitFactory: any;
  export const marketingLayoutTestkitFactory: any;
}
