import { TypeButton } from "./TypeButton";

export interface ButtonsForDisplayDto {
    idButton: number;
    label: string;
    description: string;
    content: string;
    type: number;
    typeButton: TypeButton;
  }