import * as Styled from './styles'
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import PropTypes from 'prop-types'

export const Pagination = ({
    pageSize, 
    handlePageSizeChange, 
    handlePageChange, 
    currentPage,
    totalPages,
    total,
}) => {

    const handleNext = () => {
        handlePageChange(currentPage+1)
    }

    const handlePrevious = () => {
        handlePageChange(currentPage - 1)
    }

    return (
        <Styled.Container>
            <Styled.Span>Rows per page: </Styled.Span>
            <Styled.Select value={pageSize} onChange={handlePageSizeChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </Styled.Select>

            <Styled.Span>
                {`${currentPage*pageSize - pageSize+1} - ${currentPage*pageSize}`} of {total}
            </Styled.Span>

            <Styled.Wrapper>
                <Styled.Button 
                    onClick={handlePrevious}
                    disabled={currentPage <= 1}
                >
                    <TbChevronLeft size={18} />
                </Styled.Button>
                <Styled.Button 
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    <TbChevronRight size={18} />
                </Styled.Button>
            </Styled.Wrapper>
        </Styled.Container>
    )
}

Pagination.propTypes = {
    pageSize: PropTypes.number, 
    handlePageSizeChange: PropTypes.func, 
    handlePageChange: PropTypes.func, 
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    total: PropTypes.number,
};