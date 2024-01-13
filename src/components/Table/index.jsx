import { useMemo } from 'react';
import * as Styled from './styles';
import PropTypes from 'prop-types'

export const Table = ({data}) => {

    const columns = useMemo(() => [...new Set(data.flatMap(obj => Object.keys(obj)))], [data]);

    console.log({columns});

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
                {data?.map((item) => (
                  <tr key={item.id}>
                    {
                        columns.map((cell, index) => (
                            <td key={index+cell}>
                                {cell === 'type' ? item[cell].join(', ') : item[cell]}
                            </td>
                        ))
                    }
                  </tr>
                ))}
              </Styled.TBody>
            </Styled.Table>
        </Styled.Container>
    )
}

Table.propTypes = {
    data: PropTypes.array,
};