// HANUI React Component Library
// Korean Government Design System (KRDS) based components

// Import styles
// NOTE: CSS import is commented out to prevent Tailwind v4/v3 conflicts in docs app
// Users should import styles manually: import '@hanui/react/styles.css'
// import './styles.css';

export const version = '0.0.0';

// Components
export { Button, buttonVariants } from './components/button';
export type { ButtonProps } from './components/button';

export { Input, inputVariants } from './components/input';
export type { InputProps } from './components/input';

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

export {
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from './components/modal';
export type { ModalProps } from './components/modal';

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

export { NavText } from './components/nav-text';
export type { NavTextProps } from './components/nav-text';

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

export { MainMenu } from './components/main-menu';
export type {
  MainMenuProps,
  MainMenuItem,
  MainMenuLink,
  MainMenuSection,
} from './components/main-menu';

export { SkipLink } from './components/skip-link';
export type {
  SkipLinkProps,
  SkipLinkItem,
  SkipLinkVariant,
} from './components/skip-link';

export { Header } from './components/Header/header';
export type { HeaderProps } from './components/Header/header';

export { Footer } from './components/Footer/footer';
export type { FooterProps } from './components/Footer/footer';

export { SideNavigation } from './components/SideNavigation/side-navigation';
export type {
  SideNavigationProps,
  SideNavSection,
  SideNavLink,
} from './components/SideNavigation/side-navigation';

export { InPageNavigation } from './components/InPageNavigation/in-page-navigation';
export type {
  InPageNavigationProps,
  InPageNavLink,
} from './components/InPageNavigation/in-page-navigation';

export { TabBars } from './components/TabBars';
export type { TabBarsProps, TabBarItem } from './components/TabBars';

// Utils
export { cn } from './lib/utils';
