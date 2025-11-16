export type TToastProps = {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose?: () => void;
  isVisible?: boolean;
}