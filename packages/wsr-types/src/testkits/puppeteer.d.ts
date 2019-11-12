declare module 'wix-style-react/dist/testkit/puppeteer' {
  import { Page } from 'puppeteer';

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

  export const loaderTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.LoaderUniDriver
  >;
  export const textTestkitFactory: PuppeteerTestkitFactory<
    __WSRTests.TextPuppeteerDriver
  >;
  export const buttonTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.ButtonUniDriver
  >;
  export const textButtonTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.TextButtonUniDriver
  >;
  export const emptyStateTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.EmptyStateUniDriver
  >;
  export const headingTestkitFactory: PuppeteerTestkitFactory<
    __WSRTests.HeadingPuppeteerDriver
  >;
  export const dropdownLayoutTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.DropdownLayoutUniDriver
  >;
  export const checkboxTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.CheckboxUniDriver
  >;
  export const inputTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.InputUniDriver
  >;
  export const formFieldTestkitFactory: PuppeteerTestkitFactory<
    __WSRTests.FormFieldPuppeteerDriver
  >;
  export const pageHeaderTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.PageHeaderUniDriver
  >;
  export const pageTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.PageUniDriver
  >;
  export const modalTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.ModalUniDriver
  >;
  export const closeButtonTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.CloseButtonUniDriver
  >;
  export const iconButtonTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.IconButtonUniDriver
  >;
  export const filePickerTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.FilePickerUniDriver
  >;
  export const sectionHelperTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.SectionHelperUniDriver
  >;
  export const toggleButtonTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.ToggleButtonUniDriver
  >;
  export const messageBoxFunctionalLayoutTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.MessageBoxFunctionalLayoutUniDriver
  >;
  export const messageBoxMarketerialLayoutTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.MessageBoxMarketerialLayoutUniDriver
  >;
  export const modalMobileLayoutTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.ModalMobileLayoutUniDriver
  >;
  export const modalPreviewLayoutTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.ModalPreviewLayoutUniDriver
  >;
  export const genericModalLayoutTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.GenericModalLayoutUniDriver
  >;
  export const fillButtonTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.FillButtonUniDriver
  >;
  export const tagTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.TagUniDriver
  >;
  export const linearProgressBarTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.LinearProgressBarUniDriver
  >;
  export const errorIndicatorTestkitFactory: PuppeteerUniTestkitFactory<
    __WSRTests.ErrorIndicatorUniDriver
  >;

  export const accordionTestkitFactory: any;
  export const addItemTestkitFactory: any;
  export const autoCompleteTestkitFactory: any;
  export const autoCompleteCompositeTestkitFactory: any;
  export const avatarTestkitFactory: any;
  export const badgeTestkitFactory: any;
  export const badgeSelectTestkitFactory: any;
  export const boxTestkitFactory: any;
  export const breadcrumbsTestkitFactory: any;
  export const calendarTestkitFactory: any;
  export const calendarPanelTestkitFactory: any;
  export const calendarPanelFooterTestkitFactory: any;
  export const cardGalleryItemTestkitFactory: any;
  export const carouselTestkitFactory: any;
  export const circularProgressBarTestkitFactory: any;
  export const colorInputTestkitFactory: any;
  export const colorPickerTestkitFactory: any;
  export const contactItemBuilderTestkitFactory: any;
  export const counterBadgeTestkitFactory: any;
  export const dataTableTestkitFactory: any;
  export const dateInputTestkitFactory: any;
  export const datePickerTestkitFactory: any;
  export const dropdownTestkitFactory: any;
  export const dropdownBaseTestkitFactory: any;
  export const editableSelectorTestkitFactory: any;
  export const editableTitleTestkitFactory: any;
  export const floatingHelperTestkitFactory: any;
  export const floatingNotificationTestkitFactory: any;
  export const googleAddressInputWithLabelTestkitFactory: any;
  export const googlePreviewTestkitFactory: any;
  export const highlighterTestkitFactory: any;
  export const imageViewerTestkitFactory: any;
  export const inputAreaTestkitFactory: any;
  export const inputWithOptionsTestkitFactory: any;
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
  export const searchTestkitFactory: any;
  export const segmentedToggleTestkitFactory: any;
  export const sidebarTestkitFactory: any;
  export const sidebarSectionTitleTestkitFactory: any;
  export const sliderTestkitFactory: any;
  export const socialPreviewTestkitFactory: any;
  export const sortableListTestkitFactory: any;
  export const statsWidgetTestkitFactory: any;
  export const stepperTestkitFactory: any;
  export const swatchesTestkitFactory: any;
  export const tableTestkitFactory: any;
  export const tableActionCellTestkitFactory: any;
  export const tabsTestkitFactory: any;
  export const thumbnailTestkitFactory: any;
  export const timeInputTestkitFactory: any;
  export const toggleSwitchTestkitFactory: any;
  export const sidebarSectionItemTestkitFactory: any;
  export const sidebarDividerTestkitFactory: any;
  export const sidebarBackButtonTestkitFactory: any;
  export const sidebarHeaderTestkitFactory: any;
  export const statisticsWidgetTestkitFactory: any;
  export const composerHeaderTestkitFactory: any;
  export const fillPreviewTestkitFactory: any;
  export const barChartTestkitFactory: any;
  export const inputWithLabelTestkitFactory: any;
  export const autoCompleteWithLabelTestkitFactory: any;
  export const dividerTestkitFactory: any;
  export const labelledElementTestkitFactory: any;
  export const previewWidgetTestkitFactory: any;
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
  export const radioButtonTestkitFactory: any;
  export const cardSubheaderTestkitFactory: any;
  export const tooltipTestkitFactory: any;
  export const TooltipTestkit: any;
}
