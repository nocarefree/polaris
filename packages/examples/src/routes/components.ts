import { kebabCase } from "lodash";
import { TitleMinor, ButtonMinor, AppExtensionMinor, ListMajor, TemplateMinor, EditMinor, NavigationMajor, AnalyticsTableMinor, ConversationMinor, ImageMajor, StatusActiveMajor } from "@ncpl/ncpl-icons"
import ComponentList from "../components/ComponentList.vue";
import ComponentItem from "../components/ComponentItem.vue";


export const components = [
  {
    title: "Actions",
    icon: ButtonMinor,
    content: "Perform tasks or take actions within the Shopify admin.",
    items: [
      {
        title: "AccountConnection",
        content: 'Used for connecting or disconnecting a store to various accounts, like Facebook for the sales channel.'
      },
      {
        title: "Button",
        content: "Used primarily for actions like 'Add', 'Close', 'Cancel', or 'Save'. Plain buttons are used for less important actions."
      },
      {
        title: "ButtonGroup",
        content: "Displays multiple related actions stacked or in a horizontal row for arrangement and spacing."
      },
      {
        title: "PageActions",
        content: "Allows merchants to take key actions at the bottom of specific pages in the interface."
      },
    ]
  },
  {
    title: "LayoutAndStructure",
    icon: TemplateMinor,
    content: "Layout is the arrangement of elements on a page. A good layout helps merchants understand and find information to complete their goals. To learn more, visit the Layout documentation.",
    items: [
      { title: "Bleed", content: 'Applies negative margin to a layout, extending it to the edge of the screen on small screens.' },
      { title: "BlockStack", content: 'Use to display children vertically and horizontally with full width by default. Based on CSS Flexbox.' },
      { title: "Box", content: 'Box is the most primitive layout component. It’s a way to access Polaris design tokens.' },
      { title: "CalloutCard", content: 'Callout cards are used to encourage merchants to take an action related to a new feature or opportunity. They are most commonly displayed in the sales channels section of Shopify.' },
      { title: "Card", content: 'Used to group similar concepts and tasks together for easier scanning and reading.' },
      { title: "EmptyState", content: 'Empty states are used when a list, table, or chart has no items or data to show. This is an opportunity to provide explanation or guidance to help merchants progress. The empty state component is intended for use when a full page in the admin is empty, and not for individual elements or areas in the interface.' },
      { title: "Divider", content: 'Use to separate or group content.' },
      { title: "FormLayout", content: 'Manages the layout of all forms and fields within it. Used for the layout of new forms and managing the layout of all forms.' },
      { title: "Grid", content: 'Create complex layouts based on CSS Grid.' },
      { title: "InlineGrid", content: 'Use to lay out children horizontally with equal gap between columns. Based on CSS Grid.' },
      { title: "InlineStack", content: 'Use to display children horizontally in a row. Based on CSS Flexbox.' },
      { title: "Layout", content: 'A structural component used to group other components. Creates consistent spacing and helps layout stack and scale responsively.' },
      { title: "MediaCard", content: 'Provides a container for introductory or highlight information. Often used in a grid to present related content.' },
      { title: "Page", content: 'Used to build the layout of a page in the Shopify admin. A flexible container for composing pages consistently.' },
    ]
  },
  {
    title: "SelectionAndInput",
    icon: EditMinor,
    content: "Choose or enter information using elements like checkboxes, text fields, and more.",
    items: [
      { title: "Autocomplete", content: "The autocomplete component is an input field that provides selectable suggestions as a merchant types into it. It allows merchants to quickly search through and select from large collections of options. It's a convenience wrapper around the Combobox and Listbox components with minor UI differences." },
      { title: "Checkbox", content: 'Checkboxes are most commonly used to give merchants a way to make a range of selections (zero, one, or multiple). They may also be used as a way to have merchants indicate they agree to specific terms and services.' },
      { title: "ChoiceList", content: 'A choice list lets you create a list of grouped radio buttons or checkboxes. Use this component if you need to group together a related list of interactive choices.' },
      { title: "ColorPicker", content: 'Allows merchants to choose a color visually, or by entering a hex value.' },
      { title: "Combobox", content: 'Combobox is an accessible autocomplete input that enables merchants to filter a list of options and select one or more values.' },
      { title: "ContextualSaveBar", content: 'Informs merchants of their options once they have made changes to a form on the page or while creating a new object.' },
      { title: "DatePicker", content: 'Date pickers let merchants choose dates from a visual calendar that’s consistently applied wherever dates need to be selected across Shopify.' },
      { title: "DropZone", content: 'The drop zone component lets users upload files by dragging and dropping the files into an area on a page, or activating a button.' },
      { title: "Filters", content: 'A composite component that filters the items of a list or table.' },
      { title: "Form", content: 'A wrapper component that handles the submission of forms.' },
      { title: "IndexFilters", content: 'Use index filters to allow merchants to filter, search, and sort their index table data and create unique saved views from the results.' },
      { title: "InlineError", content: 'Inline errors are brief, in-context messages that tell merchants something went wrong with a single or group of inputs in a form. Use inline errors to help merchants understand why a form input may not be valid and how to fix it.' },
      { title: "RadioButton", content: 'Use radio buttons to present each item in a list of options where merchants must make a single selection.' },
      { title: "RangeSlider", content: 'A range slider is an input field that merchants can use to select a numeric value within a given range (minimum and maximum values).' },
      { title: "Select", content: 'Select lets merchants choose one option from an options menu. Consider select when you have 4 or more options, to avoid cluttering the interface.' },
      { title: "Tag", content: 'Tags represent a set of interactive, merchant-supplied keywords that help label, organize, and categorize objects. Tags can be added or removed from an object by merchants.' },
      { title: "TextField", content: 'A text field is an input field that merchants can type into. It has a range of options and supports several text formats including numbers.' },
    ]
  },
  {
    title: "ImagesAndIcons",
    icon: ImageMajor,
    content: "Represent visual content, such as avatars and thumbnails for images or video.",
    items: [
      { title: "Avatar", content: 'Used to show a thumbnail representation of an individual or business in the interface.' },
      { title: "Icon", content: 'Used to visually communicate core parts of the product and available actions, acting as wayfinding tools.' },
      { title: "KeyboardKey", content: 'Used to educate merchants about keyboard shortcuts.' },
      { title: "Thumbnail", content: 'Used as a visual anchor and identifier for an object, along with text to provide context.' },
      { title: "VideoThumbnail", content: 'A clickable placeholder image that opens a video player within a modal or full screen when clicked.' },
    ]
  },

  {
    title: "FeedbackIndicators",
    icon: StatusActiveMajor,
    content: "Inform merchants about the status of a process, provide feedback on actions and tasks, or indicate progress.",
    items: [

      { title: "Badge", content: 'Used to inform merchants of the tone of an object or an action taken.' },
      { title: "Banner", content: 'Informs merchants about important changes or persistent conditions in a prominent way.' },
      { title: "ExceptionList", content: 'Helps merchants notice important, standout information that adds extra context to a task.' },
      { title: "Loading", content: 'Used to indicate to merchants that a page is loading or an upload is processing.' },
      { title: "ProgressBar", content: 'Used to visually represent the completion of a task or operation.' },
      { title: "SkeletonBodyText", content: 'Provides a low fidelity representation of content before it appears, improving perceived load times.' },
      { title: "SkeletonDisplayText", content: 'Provides a low fidelity representation of content before it appears, improving perceived load times.' },
      { title: "SkeletonPage", content: 'Used with other skeleton loading components to provide a low fidelity representation of the UI before content appears.' },
      { title: "SkeletonTabs", content: 'Provides a low fidelity representation of content before it appears, improving perceived load times.' },
      { title: "SkeletonThumbnail", content: 'Used to notify merchants that their action is being processed. Used for content that can’t be represented with skeleton loading components.' },
      { title: "Toast", content: 'A non-disruptive message that provides quick feedback on the outcome of an action.' },
    ]
  },
  {
    title: "Typography",
    icon: TitleMinor,
    content: "Establish hierarchy and communicate importance through text presentation.",
    items: [
      { title: "Text", content: 'Typography helps establish hierarchy and communicate important content by creating clear visual patterns.' },
    ]
  },
  {
    title: "Tables",
    icon: AnalyticsTableMinor,
    content: "Display, organize, and sort data for merchants to analyze and take action on.",
    items: [
      { title: "DataTable", content: 'Used to organize and display all information from a data set. Aimed to be as simple as possible for merchants.' },
      { title: "IndexTable", content: 'An index table displays a collection of objects of the same type, like orders or products. The main job of an index table is to help merchants get an at-a-glance of the objects to perform actions or navigate to a full-page representation of it.' },
    ]
  },
  {
    title: "Lists",
    icon: ListMajor,
    content: "Provide merchants with easy-to-use interfaces for selecting options, organizing information, and interacting with data.",
    items: [

      { title: "ActionList", content: 'Action lists render a list of actions or selectable options. This component is usually placed inside a popover container to create a dropdown menu or to let merchants select from a list of options.' },
      { title: "DescriptionList", content: 'Used to present pairs of related information, like terms and definitions, or names and values, in a list format.' },
      { title: "List", content: 'Lists display a set of related text-only content. Each list item begins with a bullet or a number.' },
      { title: "Listbox", content: 'A Listbox is a vertical list of interactive options, with room for icons, descriptions, and other elements.' },
      { title: "OptionList", content: 'The option list component lets you create a list of grouped items that merchants can pick from. This can include single selection or multiple selection of options. Option list usually appears in a popover, and sometimes in a modal or a sidebar. Option lists are styled differently than choice lists and should not be used within a form, but as a standalone menu.' },
      { title: "ResourceItem", content: 'Resource items represent specific objects within a collection, such as products or orders. They provide contextual information on the resource type and link to the object’s detail page.' },
      { title: "ResourceList", content: 'A resource list displays a collection of objects of the same type, like products or customers. The main job of a resource list is to help merchants find an object and navigate to a full-page representation of it.' },
    ]
  },
  {
    title: "Navigation",
    icon: NavigationMajor,
    content: "Access resources and move between sections, pages, or views in a structured and intuitive way.",
    items: [
      { title: "FooterHelp", content: 'Footer help is used to refer merchants to more information related to the product or feature they’re using.' },
      { title: "FullscreenBar", content: 'The Fullscreen bar is a header component that should be presented at the top of an app when it is in fullscreen mode. This is designed to ensure a uniform placement for a button to exit that mode. The Fullscreen bar can be customized by adding children.' },
      { title: "Link", content: 'Links take users to another place, and usually appear within or directly following a sentence.' },
      { title: "Navigation", content: 'The navigation component is used to display the primary navigation in the sidebar of the frame of an application. Navigation includes a list of links that merchants use to move between sections of the application.' },
      { title: "Pagination", content: 'Use pagination to let merchants move through an ordered collection of items that has been split into pages. On the web, pagination uses buttons to move back and forth between pages. On iOS and Android, pagination uses infinite scrolling.' },
      { title: "Tabs", content: 'Use to alternate among related views within the same context.' },
      { title: "TopBar", content: 'Appears at the top of the page and is used to brand and navigate major applications areas.' },
    ]
  },
  {
    title: "Overlays",
    icon: ConversationMinor,
    content: "Display contextual elements on top of the main admin interface that provide additional information or functionality.",
    items: [
      { title: "Modal", content: 'Used to interrupt merchants with urgent information, details, or actions.' },
      { title: "Popover", content: 'Small overlays that open on demand and close when the merchant interacts with any other part of Shopify. Used to surface secondary information or actions.' },
      { title: "Tooltip", content: 'Tooltips are floating labels that briefly explain the function of a user interface element. They can be triggered when merchants hover, focus, tap, or click.' },
    ]
  },
  {
    title: "Utilities",
    icon: AppExtensionMinor,
    content: "Utilities are core tools for managing the structure of the admin and global settings.",
    items: [
      { title: "AppProvider", content: 'App provider is a required component that enables sharing global settings throughout the hierarchy of your application.' },
      { title: "Collapsible", content: 'Hides content and allows merchants to expand it. Used to hide optional settings, information, and actions.' },
      { title: "Frame", content: 'Creates the structure of the Shopify admin. All of the main sections of the admin are nested in the frame.' },
      { title: "Scrollable", content: 'Used in components with too much content for the available vertical space. Embeds long-form content in components like modals and popovers.' },
    ]
  },
];

export const ComponentsRoutes = ((components) => {
  let routes = [];
  for (let group of components) {
    let gTtitle = kebabCase(group.title);

    routes.push({
      path: `/components/${gTtitle}`,
      component: ComponentList,
    })
    for (let item of group.items) {
      routes.push({
        path: `/components/${gTtitle}/${kebabCase(item.title)}`,
        component: ComponentItem
      });
    }
  }
  return routes;
})(components);
