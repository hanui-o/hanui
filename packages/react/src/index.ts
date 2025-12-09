// HANUI React Component Library
// Korean Government Design System (KRDS) based components

// CSS import disabled - styles are handled by consumer's Tailwind config
// import './styles.css';

export const version = '0.0.0';

// Components
export { Button, buttonVariants } from './components/button';
export type { ButtonProps } from './components/button';

export { Input, inputVariants } from './components/input';
export type { InputProps } from './components/input';

export { Textarea, textareaVariants } from './components/textarea';
export type { TextareaProps } from './components/textarea';

export {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupItem,
  ChipCheckbox,
  checkboxVariants,
  chipCheckboxVariants,
} from './components/checkbox';
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxGroupItemProps,
  ChipCheckboxProps,
} from './components/checkbox';

export {
  RadioGroup,
  RadioGroupItem,
  Radio,
  radioVariants,
} from './components/radio';
export type {
  RadioGroupProps,
  RadioGroupItemProps,
  RadioProps,
} from './components/radio';

export { Switch, switchVariants, thumbVariants } from './components/switch';
export type { SwitchProps } from './components/switch';

export {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants,
} from './components/alert';
export type { AlertProps } from './components/alert';

export {
  Toast,
  ToastProvider,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  Toaster,
  useToast,
  toast,
  toastVariants,
} from './components/toast';
export type { ToastProps, ToastProviderProps } from './components/toast';

export {
  Progress,
  CircularProgress,
  progressVariants,
  indicatorVariants,
} from './components/progress';
export type {
  ProgressProps,
  CircularProgressProps,
} from './components/progress';

export {
  Spinner,
  SpinnerOverlay,
  SpinnerInline,
  spinnerVariants,
} from './components/spinner';
export type {
  SpinnerProps,
  SpinnerOverlayProps,
  SpinnerInlineProps,
} from './components/spinner';

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  SimpleAlertDialog,
  alertDialogContentVariants,
  alertDialogActionVariants,
} from './components/alert-dialog';
export type {
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogActionProps,
  SimpleAlertDialogProps,
} from './components/alert-dialog';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  cardVariants,
} from './components/card';
export type { CardProps } from './components/card';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './components/table';

export { Modal, ModalTitle, ModalBody, ModalFooter } from './components/modal';
export type { ModalProps } from './components/modal';

export {
  SearchModal,
  SAMPLE_POPULAR_KEYWORDS,
  SAMPLE_RECENT_KEYWORDS,
  SAMPLE_SUGGESTIONS,
} from './components/search-modal';
export type {
  SearchModalProps,
  PopularKeyword,
  RecentKeyword,
  SearchSuggestion,
  RankingState,
} from './components/search-modal';

export { Pagination } from './components/pagination';
export type { PaginationProps } from './components/pagination';

export { Breadcrumb } from './components/breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './components/breadcrumb';

export { FileUpload } from './components/file-upload';
export type { FileUploadProps, UploadedFile } from './components/file-upload';

export { Select } from './components/select';
export type { SelectProps, SelectOption } from './components/select';

export { Container } from './components/container';
export type { ContainerProps } from './components/container';

export { Logo } from './components/logo';
export type { LogoProps } from './components/logo';

export { Stack, VStack, HStack, stackVariants } from './components/stack';
export type { StackProps } from './components/stack';

export { Section, sectionVariants } from './components/section';
export type { SectionProps } from './components/section';

// Typography Components
export { Display } from './components/display';
export type { DisplayProps } from './components/display';

export { Heading } from './components/heading';
export type { HeadingProps } from './components/heading';

export { Body } from './components/body';
export type { BodyProps } from './components/body';

export { Label } from './components/label';
export type { LabelProps } from './components/label';

export { Link, linkVariants } from './components/link';
export type { LinkProps } from './components/link';

export { Code } from './components/code';
export type { CodeProps } from './components/code';

export { List, ListItem } from './components/list';
export type { ListProps } from './components/list';

export { Box } from './components/box';
export type { BoxProps } from './components/box';

export { Tooltip } from './components/tooltip';
export type { TooltipProps } from './components/tooltip';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs';
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './components/tabs';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './components/accordion';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './components/accordion';

export { Masthead } from './components/masthead';
export type { MastheadProps } from './components/masthead';

export { NavigationMenu } from './components/menu-navigation';
export type {
  NavigationMenuProps,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuSection,
} from './components/menu-navigation';

export { MegaMenu } from './components/menu-mega';
export type {
  MegaMenuProps,
  MegaMenuColumn,
  MegaMenuLink,
} from './components/menu-mega';

export { PanelMenu } from './components/menu-panel';
export type {
  PanelMenuProps,
  PanelMenuItem,
  PanelMenu2DepthItem,
  PanelMenuLink,
  PanelMenuSubContent,
} from './components/menu-panel';

export { SkipLink } from './components/skip-link';
export type {
  SkipLinkProps,
  SkipLinkItem,
  SkipLinkVariant,
} from './components/skip-link';

// Header components (Tailwind CSS - default)
export { HeaderWithMegaMenu } from './components/header-with-megamenu';
export type {
  HeaderWithMegaMenuTailwindProps as HeaderWithMegaMenuProps,
  UtilityLink as HeaderUtilityLink,
} from './components/header-with-megamenu';

export { HeaderWithNavigation } from './components/header-with-navigation';
export type { HeaderWithNavigationTailwindProps as HeaderWithNavigationProps } from './components/header-with-navigation';

export { HeaderWithPanelMenu } from './components/header-with-panel-menu';
export type { HeaderWithPanelMenuProps } from './components/header-with-panel-menu';

// Footer components
export { Footer } from './components/footer';
export type { FooterProps } from './components/footer';

export { Identifier } from './components/identifier';
export type { IdentifierProps } from './components/identifier';

export {
  SideNavigation,
  SAMPLE_SIDE_NAVIGATION_MENU,
  SAMPLE_SIDE_NAVIGATION,
} from './components/side-navigation';
export type {
  SideNavigationProps,
  SideNavigationSection,
  SideNavigationMenuItem,
  // Legacy aliases
  SideNavSection,
  SideNavLink,
} from './components/side-navigation';

export { InPageNavigation } from './components/in-page-navigation';
export type {
  InPageNavigationProps,
  InPageNavLink,
} from './components/in-page-navigation';

export { TabBars } from './components/tab-bars';
export type { TabBarsProps, TabBarItem } from './components/tab-bars';

// Utils
export { cn } from './lib/utils';

export { Wrap } from './components/wrap';
export type { WrapProps } from './components/wrap';

export { Flex } from './components/flex';
export type { FlexProps } from './components/flex';

export { Grid, GridItem } from './components/grid';
export type { GridProps, GridItemProps } from './components/grid';

export { SimpleGrid } from './components/simple-grid';
export type { SimpleGridProps } from './components/simple-grid';

export { Center, Circle, Square } from './components/center';
export type {
  CenterProps,
  CircleProps,
  SquareProps,
} from './components/center';

export { AspectRatio } from './components/aspect-ratio';
export type { AspectRatioProps } from './components/aspect-ratio';

export { Image } from './components/image';
export type { ImageProps } from './components/image';

export {
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
  useFormField,
  useFormFieldOptional,
} from './components/form-field';
export type {
  FormFieldProps,
  FormLabelProps,
  FormErrorProps,
  FormHelperTextProps,
} from './components/form-field';

export {
  Badge,
  NumberBadge,
  DotBadge,
  BadgeGroup,
  badgeVariants,
  numberBadgeVariants,
  dotBadgeVariants,
} from './components/badge';
export type {
  BadgeProps,
  NumberBadgeProps,
  DotBadgeProps,
  BadgeGroupProps,
} from './components/badge';

export { Combobox, comboboxTriggerVariants } from './components/combobox';
export type { ComboboxProps, ComboboxOption } from './components/combobox';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuArrow,
} from './components/dropdown-menu';
export type {
  DropdownMenuItemProps,
  DropdownMenuContentProps,
} from './components/dropdown-menu';

export { Slider, sliderVariants } from './components/slider';
export type { SliderProps } from './components/slider';

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable,
  skeletonVariants,
} from './components/skeleton';
export type {
  SkeletonProps,
  SkeletonTextProps,
  SkeletonAvatarProps,
  SkeletonCardProps,
  SkeletonTableProps,
} from './components/skeleton';

export {
  DataTable,
  SortableHeader,
  getSelectionColumn,
} from './components/data-table';
export type {
  DataTableProps,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from './components/data-table';

export { Carousel } from './components/carousel';
export type { CarouselProps, CarouselSlide } from './components/carousel';

export { PreviewCarousel } from './components/preview-carousel';
export type {
  PreviewCarouselProps,
  PreviewCarouselBreakpoints,
} from './components/preview-carousel';

export { HeroCarousel } from './components/hero-carousel';
export type {
  HeroCarouselProps,
  HeroCarouselSlide,
} from './components/hero-carousel';

export { ContentCarousel } from './components/content-carousel';
export type {
  ContentCarouselProps,
  ContentCarouselSlide,
} from './components/content-carousel';

export {
  Tag,
  SelectableTag,
  RemovableTag,
  TagGroup,
  tagVariants,
} from './components/tag';
export type {
  TagProps,
  SelectableTagProps,
  RemovableTagProps,
  TagGroupProps,
} from './components/tag';

export {
  StepIndicator,
  SAMPLE_STEPS,
  stepIndicatorVariants,
  stepCircleVariants,
  stepLabelVariants,
} from './components/step-indicator';
export type { StepIndicatorProps, StepItem } from './components/step-indicator';

export {
  VisuallyHidden,
  srOnlyClassName,
  srOnlyFocusableClassName,
} from './components/visually-hidden';
export type { VisuallyHiddenProps } from './components/visually-hidden';

export {
  CriticalAlerts,
  CriticalAlertItem,
  CriticalAlertBanner,
  criticalBadgeVariants,
  bannerVariants,
} from './components/critical-alerts';
export type {
  CriticalAlertsProps,
  CriticalAlertItemProps,
  CriticalAlertBannerProps,
} from './components/critical-alerts';

export {
  Disclosure,
  disclosureVariants,
  disclosureTriggerVariants,
  disclosureContentVariants,
} from './components/disclosure';
export type { DisclosureProps } from './components/disclosure';

export {
  DateInput,
  DateInputMultiple,
  DateInputRange,
  dateFieldVariants,
} from './components/date-input';
export type {
  DateInputProps,
  DateInputMultipleProps,
  DateInputRangeProps,
} from './components/date-input';
