// HANUI React Component Library
// Korean Government Design System (KRDS) based components

// Import styles
import './styles.css';

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

export { Breadcrumb, BreadcrumbItem } from './components/Breadcrumb';
export type {
  BreadcrumbProps,
  BreadcrumbItemProps,
} from './components/Breadcrumb';

export { FileUpload } from './components/FileUpload';
export type { FileUploadProps, UploadedFile } from './components/FileUpload';

export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

// Utils
export { cn } from './lib/utils';
