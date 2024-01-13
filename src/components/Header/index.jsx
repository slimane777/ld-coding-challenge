import * as Styled from './styles'
import { TbHeartPlus, TbSearch } from "react-icons/tb";
import PropTypes from 'prop-types'

export const Header = ({
    handleSearch, 
    handleThreshold, 
    searchTerm, 
    threshold,
    minPower,
    maxPower
}) => {
    return (
        <Styled.Container>
            <Styled.Wrapper>
                <Styled.Input>
                    <TbSearch size={18} />
                    <input placeholder='Search...' onChange={handleSearch} value={searchTerm} />
                </Styled.Input>
                <Styled.Input>
                    <TbHeartPlus size={18} />
                    <input placeholder='Power threshold' onChange={handleThreshold} type="number" value={threshold} />
                </Styled.Input>
            </Styled.Wrapper>

            <span>Min Power: {minPower}</span>
            <span>Max Power: {maxPower}</span>
        </Styled.Container>
    )
}

Header.propTypes = {
    threshold: PropTypes.number,
    handleSearch: PropTypes.func, 
    handleThreshold: PropTypes.func, 
    searchTerm: PropTypes.string, 
    minPower: PropTypes.number,
    maxPower: PropTypes.number,
};