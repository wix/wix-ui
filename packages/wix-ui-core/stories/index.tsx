import * as React from "react";
import { storiesOf } from "@storybook/react";

// Core Stories
import { PaginationStory } from "./Pagination/pagination-story";
import { DividerStory } from "./Divider/divider-story";
import { GoogleMapsIframeClientStory } from "./clients/GoogleMapsIframeClient-story";
import { CheckboxStory } from "./Checkbox/Checkbox-story";
import { TooltipStory } from "./Tooltip/custom";
import { RadioButtonStory } from "./RadioButton";
import EllipsedText from "./EllipsedTooltip";
import Focusable from "./Focusable";

// Backoffice Stories
import AvatarStory from "./backoffice/avatar";
import ButtonsStory from "./backoffice/button-next";

const Components = storiesOf("Components", module);
const Backoffice = storiesOf("Backoffice", module);
const HOCs = storiesOf("HOCs", module);

// components (ordered alphabetically)
import "./AddressInput/index.story";
import "./AddressInput/E2E";
import "./Autocomplete.story";
import "./avatar/avatar.story";
import "./Button.story";
import "../src/components/button-next/button-next.story";
Components.add("Checkbox", () => <CheckboxStory />);
import "./CircularProgressBar/index.story";
Components.add("Divider", () => <DividerStory />);
Components.add("GoogleMapsIframeClient", () => <GoogleMapsIframeClientStory />);
import "./Input/Input.story";
import "./InputWithOptions.story";
import "./IconWithOptions.story";
import "./Label.story";
import "./LabelWithOptions.story";
import "./LinearProgressBar/index.story";
import "./NavStepper.story";
Components.add("Pagination", () => <PaginationStory />);
import "./Popover.story";
Components.add("RadioButton", () => <RadioButtonStory />);
import "./Slider.story";
import "./StylableBadge.story";
import "./Thumbnail.story";
import "./TimePicker/index.story";
import "./ToggleSwitch/index.story";
import "./Tooltip/index.story";
Components.add("Tooltip Custom", () => <TooltipStory />);
import "./Video.story";
HOCs.add("EllipsedTooltip", EllipsedText);
HOCs.add("Focusable", Focusable);

// BackOffice Theme
Backoffice.add("WIP - Avatar", AvatarStory);
Backoffice.add("Buttons", ButtonsStory);
