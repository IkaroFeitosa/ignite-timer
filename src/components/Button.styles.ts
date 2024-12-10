
import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const ButtonsVariants = {
    primary: "purple",
    secondary: "oragen",
    danger: "red",
    success: "green",
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
width: 100px;
height: 40px;
background-color: ${props => props.theme["green-300"]};
color: ${props => props.theme.white};
`