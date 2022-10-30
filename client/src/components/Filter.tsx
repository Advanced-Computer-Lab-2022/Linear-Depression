import Accordion from "./Accordion";
import styled from "styled-components";

const FilterContainer = styled.div`
    margin-right: 20px;
`;

const Filter: React.FC<{
    titles: string[];
    items: string[];
    children: { checkbox: React.FC<{ title: string; items: string[] }>; rating: React.FC };
}> = ({ titles, items, children }) => {
    return (
        <FilterContainer>
            {titles.map((title) => {
                return (
                    <Accordion
                        key={title}
                        title={title}
                        items={title === "Price" ? ["Free", "Paid"] : items}
                        child={title === "Rating" ? children.rating : children.checkbox}
                    />
                );
            })}
        </FilterContainer>
    );
};

export default Filter;
