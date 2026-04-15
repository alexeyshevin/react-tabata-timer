import styled from "styled-components";

export const IntervalBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const IntervalList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 0;
    margin: 0;
    list-style: none;
`;

export const IntervalListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 6px 8px;
    border-radius: 6px;
    background: #f3f4f6
`;