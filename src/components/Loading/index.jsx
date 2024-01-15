import * as Styled from './styles'
import { TbLoader2 } from "react-icons/tb";

export const Loading = () => {
    return (
        <Styled.Container>
            <Styled.Spinner>
                <TbLoader2 size={24} color='#333333' />
            </Styled.Spinner>
        </Styled.Container>
    )
}