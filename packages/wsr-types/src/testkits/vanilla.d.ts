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
  export const floatingNotificationTestkitFactory: VanillaUniTestkitFactory<__WSRTests.FloatingNotificationUniDriver>;
  export const floatingHelperTestkitFactory: VanillaTestkitFactory<__WSRTests.FloatingHelperDriver>;
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
  export const timeInputTestkitFactory: VanillaTestkitFactory<__WSRTests.TimeInputDriver>;
  export const dateInputTestkitFactory: VanillaUniTestkitFactory<__WSRTests.DateInputUniDriver>;
  export const notificationTestkitFactory: VanillaTestkitFactory<__WSRTests.NotificationDriver>;
  export const calendarPanelFooterTestkitFactory: VanillaUniTestkitFactory<__WSRTests.CalendarPanelFooterUniDriver>;
  export const cardGalleryItemTestkitFactory: VanillaUniTestkitFactory<__WSRTests.CardGalleryItemUniDriver>;
  export const sliderTestkitFactory: VanillaTestkitFactory<__WSRTests.SliderDriver>;
  export const colorPickerTestkitFactory: VanillaTestkitFactory<__WSRTests.ColorPickerDriver>;
  export const proportionTestkitFactory: VanillaUniTestkitFactory<__WSRTests.ProportionUniDriver>;
  export const swatchesTestkitFactory: VanillaUniTestkitFactory<__WSRTests.SwatchesUniDriver>;
  export const tabsTestkitFactory: VanillaTestkitFactory<__WSRTests.TabsDriver>;
  export const sortableListTestkitFactory: VanillaTestkitFactory<__WSRTests.SortableListDriver>;
  export const nestableListTestkitFactory: VanillaTestkitFactory<__WSRTests.NestableListDriver>;
  export const multiSelectTestkitFactory: VanillaTestkitFactory<__WSRTests.MultiSelectDriver>;
  export const multiSelectCheckboxTestkitFactory: VanillaTestkitFactory<__WSRTests.MultiSelectCheckboxDriver>;
  export const tableActionCellTestkitFactory: VanillaTestkitFactory<__WSRTests.TableActionCellDriver<
    HTMLElement
  >>;
  export const googlePreviewTestkitFactory: VanillaUniTestkitFactory<__WSRTests.GooglePreviewUniDriver>;

  export const autoCompleteCompositeTestkitFactory: any;
  export const avatarTestkitFactory: any;
  export const badgeTestkitFactory: any;
  export const badgeSelectTestkitFactory: any;
  export const boxTestkitFactory: any;
  export const breadcrumbsTestkitFactory: any;

  export const calendarTestkitFactory: VanillaUniTestkitFactory<__WSRTests.CalendarPanelUniDriver>;
  export const calendarPanelTestkitFactory: VanillaTestkitFactory<__WSRTests.CalendarPanelDriver>;
  export const carouselTestkitFactory: VanillaTestkitFactory<__WSRTests.CarouselDriver>;
  export const circularProgressBarTestkitFactory: VanillaTestkitFactory<__WSRTests.CircularProgressBarDriver>;
  export const colorInputTestkitFactory: any;
  export const contactItemBuilderTestkitFactory: any;
  export const datePickerTestkitFactory: any;
  export const editableSelectorTestkitFactory: VanillaTestkitFactory<__WSRTests.EditableSelectorDriver>;
  export const editableTitleTestkitFactory: VanillaUniTestkitFactory<__WSRTests.EditableTitleUniDriver>;
  export const googleAddressInputWithLabelTestkitFactory: any;
  export const inputAreaTestkitFactory: VanillaTestkitFactory<__WSRTests.InputAreaDriver<
    HTMLElement
  >>;
  export const listItemActionTestkitFactory: any;
  export const listItemSectionTestkitFactory: any;
  export const listItemSelectTestkitFactory: any;
  export const multiSelectCompositeTestkitFactory: any;
  export const noBorderInputTestkitFactory: VanillaTestkitFactory<__WSRTests.NoBorderInputDriver>;
  export const numberInputTestkitFactory: VanillaUniTestkitFactory<__WSRTests.NumberInputUniDriver>;
  export const popoverTestkitFactory: VanillaTestkitFactory<__WSRTests.PopoverDriver>;
  export const popoverMenuTestkitFactory: VanillaTestkitFactory<__WSRTests.PopoverMenuDriver>;
  export const rangeTestkitFactory: any;
  export const richTextInputAreaTestkitFactory: any;
  export const sidebarTestkitFactory: VanillaUniTestkitFactory<__WSRTests.SidebarUniDriver>;
  export const sidebarSectionTitleTestkitFactory: VanillaUniTestkitFactory<__WSRTests.SidebarSectionTitleUniDriver>;
  export const statsWidgetTestkitFactory: any;
  export const toggleSwitchTestkitFactory: any;
  export const sidebarSectionItemTestkitFactory: VanillaUniTestkitFactory<__WSRTests.SidebarSectionItemUniDriver>;
  export const sidebarDividerTestkitFactory: VanillaUniTestkitFactory<__WSRTests.SidebarDividerUniDriver>;
  export const sidebarBackButtonTestkitFactory: VanillaUniTestkitFactory<__WSRTests.SidebarBackButtonUniDriver>;
  export const sidebarHeaderTestkitFactory: VanillaUniTestkitFactory<__WSRTests.SidebarHeaderUniDriver>;
  export const composerHeaderTestkitFactory: any;
  export const barChartTestkitFactory: any;
  export const inputWithLabelTestkitFactory: any;
  export const autoCompleteWithLabelTestkitFactory: any;
  export const dividerTestkitFactory: any;
  export const labelledElementTestkitFactory: any;
  export const mediaOverlayTestkitFactory: any;
  export const infoIconTestkitFactory: any;
  export const socialButtonTestkitFactory: any;
  export const verticalTabsTestkitFactory: VanillaUniTestkitFactory<__WSRTests.VerticalTabsUniDriver>;
  export const verticalTabsItemTestkitFactory: VanillaUniTestkitFactory<__WSRTests.VerticalTabsItemUniDriver>;
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
  export const imageTestkitFactory: any;
}
