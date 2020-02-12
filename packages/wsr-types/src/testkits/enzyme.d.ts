declare module "wix-style-react/dist/testkit/enzyme" {
  import { ReactWrapper } from "enzyme";

  type EnzymeTestkitFactory<T extends __WSRTests.BaseDriver> = (
    params: EnzymeTestkitParams
  ) => T;

  type EnzymeUniTestkitFactory<T extends __WSRTests.BaseUniDriver> = (
    params: EnzymeTestkitParams
  ) => T;

  interface EnzymeTestkitParams {
    wrapper: ReactWrapper;
    dataHook: string;
  }

  export const loaderTestkitFactory: EnzymeTestkitFactory<__WSRTests.LoaderDriver>;
  export const textTestkitFactory: EnzymeTestkitFactory<__WSRTests.TextDriver>;
  export const buttonTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.ButtonUniDriver>;
  export const textButtonTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.TextButtonUniDriver>;
  export const emptyStateTestkitFactory: EnzymeTestkitFactory<__WSRTests.EmptyStateDriver>;
  export const headingTestkitFactory: EnzymeTestkitFactory<__WSRTests.HeadingDriver>;
  export const dropdownLayoutTestkitFactory: EnzymeTestkitFactory<__WSRTests.DropdownLayoutDriver>;
  export const labelTestkitFactory: EnzymeTestkitFactory<__WSRTests.LabelDriver>;
  export const checkboxTestkitFactory: EnzymeTestkitFactory<__WSRTests.CheckboxDriver>;
  export const inputTestkitFactory: EnzymeTestkitFactory<__WSRTests.InputDriver>;
  export const formFieldTestkitFactory: EnzymeTestkitFactory<__WSRTests.FormFieldDriver>;
  export const pageHeaderTestkitFactory: EnzymeTestkitFactory<__WSRTests.PageHeaderDriver>;
  export const pageTestkitFactory: EnzymeTestkitFactory<__WSRTests.PageDriver>;
  export const modalTestkitFactory: EnzymeTestkitFactory<__WSRTests.ModalDriver<
    import("enzyme").ReactWrapper
  >>;
  export const closeButtonTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.CloseButtonUniDriver>;
  export const iconButtonTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.IconButtonUniDriver>;
  export const skeletonTestkitFactory: EnzymeTestkitFactory<__WSRTests.SkeletonDriver>;
  export const filePickerTestkitFactory: EnzymeTestkitFactory<__WSRTests.FilePickerDriver>;
  export const sectionHelperTestkitFactory: EnzymeTestkitFactory<__WSRTests.SectionHelperDriver>;
  export const toggleButtonTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.ToggleButtonUniDriver>;
  export const modalPreviewLayoutTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.ModalPreviewLayoutUniDriver>;
  export const messageBoxFunctionalLayoutTestkitFactory: EnzymeTestkitFactory<__WSRTests.MessageBoxFunctionalLayoutDriver<
    import("enzyme").ReactWrapper
  >>;
  export const messageBoxMarketerialLayoutTestkitFactory: EnzymeTestkitFactory<__WSRTests.MessageBoxMarketerialLayoutDriver>;
  export const modalMobileLayoutTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.ModalMobileLayoutUniDriver>;
  export const modalSelectorLayoutTestkitFactory: EnzymeTestkitFactory<__WSRTests.ModalSelectorLayoutDriver>;
  export const genericModalLayoutTestkitFactory: EnzymeTestkitFactory<__WSRTests.GenericModalLayoutDriver>;
  export const selectorTestkitFactory: EnzymeTestkitFactory<__WSRTests.SelectorDriver>;
  export const radioGroupTestkitFactory: EnzymeTestkitFactory<__WSRTests.RadioGroupDriver>;
  export const radioButtonTestkitFactory: EnzymeTestkitFactory<__WSRTests.RadioButtonDriver>;
  export const fillButtonTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.FillButtonUniDriver>;
  export const tagTestkitFactory: EnzymeTestkitFactory<__WSRTests.TagDriver>;
  export const highlighterTestkitFactory: EnzymeTestkitFactory<__WSRTests.HighlighterDriver<
    ReactWrapper
  >>;
  export const stepperTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.StepperUniDriver>;
  export const segmentedToggleTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.SegmentedToggleUniDriver>;
  export const accordionTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.AccordionUniDriver>;
  export const imageViewerTestkitFactory: EnzymeTestkitFactory<__WSRTests.ImageViewerDriver<
    ReactWrapper
  >>;
  export const floatingNotificationTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.FloatingNotificationUniDriver>;
  export const socialPreviewTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.SocialPreviewUniDriver>;
  export const fillPreviewTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.FillPreviewUniDriver>;
  export const statisticsWidgetTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.StatisticsWidgetUniDriver>;
  export const thumbnailTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.ThumbnailUniDriver>;
  export const linearProgressBarTestkitFactory: EnzymeTestkitFactory<__WSRTests.LinearProgressBarDriver>;
  export const errorIndicatorTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.ErrorIndicatorUniDriver>;
  export const addItemTestkitFactory: EnzymeTestkitFactory<__WSRTests.AddItemDriver<
    ReactWrapper
  >>;
  export const inputWithOptionsTestkitFactory: EnzymeTestkitFactory<__WSRTests.InputWithOptionsDriver>;
  export const inputWithLabelTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.InputWithLabelUniDriver>;
  export const autoCompleteWithLabelTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.AutoCompleteUniDriver>;
  export const searchTestkitFactory: EnzymeTestkitFactory<__WSRTests.SearchDriver>;
  export const dropdownTestkitFactory: EnzymeTestkitFactory<__WSRTests.DropdownDriver>;
  export const dropdownBaseTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.DropdownBaseUniDriver>;
  export const counterBadgeTestkitFactory: EnzymeTestkitFactory<__WSRTests.CounterBadgeDriver>;
  export const autoCompleteTestkitFactory: EnzymeTestkitFactory<__WSRTests.AutoCompleteDriver>;
  export const dataTableTestkitFactory: EnzymeTestkitFactory<__WSRTests.DataTableDriver>;
  export const tableTestkitFactory: EnzymeTestkitFactory<__WSRTests.TableDriver<
    ReactWrapper
  >>;
  export const floatingHelperTestkitFactory: EnzymeTestkitFactory<__WSRTests.FloatingHelperDriver>;
  export const dateInputTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.DateInputUniDriver>;
  export const notificationTestkitFactory: EnzymeTestkitFactory<__WSRTests.NotificationDriver>;
  export const calendarPanelFooterTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.CalendarPanelFooterUniDriver>;

  export const cardGalleryItemTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.CardGalleryItemUniDriver>;
  export const sliderTestkitFactory: EnzymeTestkitFactory<__WSRTests.SliderDriver>;
  export const timeInputTestkitFactory: EnzymeTestkitFactory<__WSRTests.TimeInputDriver>;
  export const sortableListTestkitFactory: EnzymeTestkitFactory<__WSRTests.SortableListDriver>;
  export const nestableListTestkitFactory: EnzymeTestkitFactory<__WSRTests.NestableListDriver>;
  export const multiSelectTestkitFactory: EnzymeTestkitFactory<__WSRTests.MultiSelectDriver>;
  export const multiSelectCheckboxTestkitFactory: EnzymeTestkitFactory<__WSRTests.MultiSelectCheckboxDriver>;
  export const tableActionCellTestkitFactory: EnzymeTestkitFactory<__WSRTests.TableActionCellDriver<
    ReactWrapper
  >>;
  export const colorPickerTestkitFactory: EnzymeTestkitFactory<__WSRTests.ColorPickerDriver>;
  export const proportionTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.ProportionUniDriver>;
  export const swatchesTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.SwatchesUniDriver>;
  export const tabsTestkitFactory: EnzymeTestkitFactory<__WSRTests.TabsDriver>;
  export const googlePreviewTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.GooglePreviewUniDriver>;
  export const autoCompleteCompositeTestkitFactory: any;
  export const avatarTestkitFactory: any;
  export const badgeTestkitFactory: any;
  export const badgeSelectTestkitFactory: any;
  export const boxTestkitFactory: any;
  export const breadcrumbsTestkitFactory: any;
  export const calendarTestkitFactory: any;
  export const calendarPanelTestkitFactory: EnzymeTestkitFactory<__WSRTests.CalendarPanelDriver>;
  export const carouselTestkitFactory: EnzymeTestkitFactory<__WSRTests.CarouselDriver>;
  export const circularProgressBarTestkitFactory: EnzymeTestkitFactory<__WSRTests.CircularProgressBarDriver>;
  export const colorInputTestkitFactory: any;
  export const contactItemBuilderTestkitFactory: EnzymeTestkitFactory<__WSRTests.ContactItemBuilderDriver>;
  export const datePickerTestkitFactory: any;
  export const editableSelectorTestkitFactory: EnzymeTestkitFactory<__WSRTests.EditableSelectorDriver>;
  export const editableTitleTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.EditableTitleUniDriver>;
  export const googleAddressInputWithLabelTestkitFactory: any;
  export const inputAreaTestkitFactory: EnzymeTestkitFactory<__WSRTests.InputAreaDriver<
    ReactWrapper
  >>;
  export const listItemActionTestkitFactory: any;
  export const listItemSectionTestkitFactory: any;
  export const listItemSelectTestkitFactory: any;
  export const multiSelectCompositeTestkitFactory: any;
  export const noBorderInputTestkitFactory: EnzymeTestkitFactory<__WSRTests.NoBorderInputDriver>;
  export const numberInputTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.NumberInputUniDriver>;
  export const popoverTestkitFactory: EnzymeTestkitFactory<__WSRTests.PopoverDriver>;
  export const popoverMenuTestkitFactory: EnzymeTestkitFactory<__WSRTests.PopoverMenuDriver>;
  export const rangeTestkitFactory: EnzymeTestkitFactory<__WSRTests.RangeDriver>;
  export const richTextInputAreaTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.RichTextInputAreaUniDriver>;
  export const sidebarTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.SidebarUniDriver>;
  export const sidebarSectionTitleTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.SidebarSectionTitleUniDriver>;
  export const statsWidgetTestkitFactory: any;
  export const toggleSwitchTestkitFactory: any;
  export const sidebarSectionItemTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.SidebarSectionItemUniDriver>;
  export const sidebarDividerTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.SidebarDividerUniDriver>;
  export const sidebarBackButtonTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.SidebarBackButtonUniDriver>;
  export const sidebarHeaderTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.SidebarHeaderUniDriver>;
  export const composerHeaderTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.ComposerHeaderUniDriver>;
  export const barChartTestkitFactory: any;
  export const dividerTestkitFactory: any;
  export const labelledElementTestkitFactory: any;
  export const mediaOverlayTestkitFactory: any;
  export const infoIconTestkitFactory: any;
  export const socialButtonTestkitFactory: any;
  export const verticalTabsTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.VerticalTabsUniDriver>;
  export const verticalTabsItemTestkitFactory: EnzymeUniTestkitFactory<__WSRTests.VerticalTabsItemUniDriver>;
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
