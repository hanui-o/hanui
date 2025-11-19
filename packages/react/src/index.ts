// HANUI React Component Library
// Korean Government Design System (KRDS) based components

// Import styles
// NOTE: CSS import is commented out to prevent Tailwind v4/v3 conflicts in docs app
// Users should import styles manually: import '@hanui/react/styles.css'
// import './styles.css';

export const version = '0.0.0';

// Components
export { Button, buttonVariants } from './components/Button';
export type { ButtonProps } from './components/Button';

export { Input, inputVariants } from './components/Input';
export type { InputProps } from './components/Input';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  cardVariants,
} from './components/Card';
export type { CardProps } from './components/Card';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './components/Table';

export {
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from './components/Modal';
export type { ModalProps } from './components/Modal';

export { Pagination } from './components/Pagination';
export type { PaginationProps } from './components/Pagination';

export { Breadcrumb } from './components/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb';

export { FileUpload } from './components/FileUpload';
export type { FileUploadProps, UploadedFile } from './components/FileUpload';

export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

export { Container } from './components/Container';
export type { ContainerProps } from './components/Container';

export { Stack, VStack, HStack, stackVariants } from './components/Stack';
export type { StackProps } from './components/Stack';

export { Section, sectionVariants } from './components/Section';
export type { SectionProps } from './components/Section';

export { Wrap, wrapVariants } from './components/Wrap';
export type { WrapProps } from './components/Wrap';

export { SimpleGrid, simpleGridVariants } from './components/SimpleGrid';
export type { SimpleGridProps } from './components/SimpleGrid';

// Typography Components
export { Display } from './components/Display';
export type { DisplayProps } from './components/Display';

export { Heading } from './components/Heading';
export type { HeadingProps } from './components/Heading';

export { Body } from './components/Body';
export type { BodyProps } from './components/Body';

export { Label } from './components/Label';
export type { LabelProps } from './components/Label';

export { NavText } from './components/NavText';
export type { NavTextProps } from './components/NavText';

export { Link, linkVariants } from './components/Link';
export type { LinkProps } from './components/Link';

export { Box } from './components/Box';
export type { BoxProps } from './components/Box';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps } from './components/Tooltip';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './components/Tabs';

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './components/Accordion';
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './components/Accordion';

export { Masthead } from './components/Masthead';
export type { MastheadProps } from './components/Masthead';

export { MainMenu } from './components/main-menu';
export type {
  MainMenuProps,
  MainMenuItem,
  MainMenuLink,
  MainMenuSection,
} from './components/main-menu';

export { Identifier } from './components/Identifier';
export type {
  IdentifierProps,
  IdentifierVariant,
} from './components/Identifier';

export { SkipLink } from './components/SkipLink';
export type {
  SkipLinkProps,
  SkipLinkItem,
  SkipLinkVariant,
} from './components/SkipLink';

export { Header } from './components/Header';
export type { HeaderProps } from './components/Header';

export { Footer } from './components/Footer';
export type { FooterProps } from './components/Footer';

export { SideNavigation } from './components/side-navigation';
export type {
  SideNavigationProps,
  SideNavSection,
  SideNavLink,
} from './components/side-navigation';

export { InPageNavigation } from './components/in-page-navigation';
export type {
  InPageNavigationProps,
  InPageNavLink,
} from './components/in-page-navigation';

export { TabBars } from './components/TabBars';
export type { TabBarsProps, TabBarItem } from './components/TabBars';

export { StructuredList } from './components/StructuredList';
export type {
  StructuredListProps,
  StructuredListItem,
  StructuredListDate,
} from './components/StructuredList';

export { List, ListItem } from './components/List';
export type { ListProps, ListItemProps } from './components/List';

export { Code } from './components/Code';
export type { CodeProps } from './components/Code';

// Utils
export { cn } from './lib/utils';
