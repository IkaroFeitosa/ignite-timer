import { ButtonContainer, ButtonVariant } from "./Button.styles";
interface IButtonProp {
    variant?:ButtonVariant
    text:string
}
export function Button({variant = 'primary',text}:IButtonProp){

    return(
        <>
        <ButtonContainer variant={variant}>{text}</ButtonContainer>
        </>
    )
}