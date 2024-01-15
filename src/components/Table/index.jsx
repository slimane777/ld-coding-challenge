import { useMemo } from 'react';
import * as Styled from './styles';
import PropTypes from 'prop-types'
import { TbAlertTriangle, TbMoodEmpty } from "react-icons/tb";
import { Loading } from '../Loading';

export const Table = ({data, error, loading}) => {

    /**
     * return table columns from passed data
     */
    const columns = useMemo(() => [...new Set(data.flatMap(obj => Object.keys(obj)))], [data]);

    if(error){
        return (
            <Styled.Container>
                <Styled.Error>
                    <TbAlertTriangle size={24} />
                    <span>{error}</span>
                </Styled.Error>
            </Styled.Container>
        )
    }

    return (
        <Styled.Container>
            <Styled.Table>
              <Styled.THead>
                <tr>
                {
                    columns?.map(column => <th key={column}>{column}</th>)
                }
                </tr>
              </Styled.THead>
              <Styled.TBody>
                {loading && <Loading />}
                {data.length > 0 ?
                    data?.map((item) => (
                        <tr key={item.id}>
                            {
                                columns.map((cell, index) => (
                                    <td key={index+cell}>
                                        {cell === 'type' ? item[cell].join(', ') : item[cell]}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                :
                    <Styled.Error>
                        <TbMoodEmpty size={24} />
                        <span>No data was found!</span>
                    </Styled.Error>
                }
              </Styled.TBody>
            </Styled.Table>
        </Styled.Container>
    )
}

Table.propTypes = {
    data: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool
};