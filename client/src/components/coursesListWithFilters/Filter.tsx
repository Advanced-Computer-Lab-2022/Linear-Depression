import SimpleAccordion from "../SimpleAccordion";
import styled from "styled-components";
import PriceFilter from "./filter/PriceFilter";
import StarRating from "./filter/RatingFilter";
import CheckBoxLists from "./filter/SubjectsFilter";

const FilterContainer = styled.div`
    margin-right: 20px;
`;

const Filter: React.FC = () => {
    const filters = [
        { Section: "Subject", Component: <CheckBoxLists /> },
        { Section: "Price", Component: <PriceFilter /> },
        { Section: "Rating", Component: <StarRating /> }
    ];

    return (
        <FilterContainer>
            {filters.map((filter) => (
                <SimpleAccordion title={filter.Section}>{filter.Component}</SimpleAccordion>
            ))}
        </FilterContainer>
    );
};

export default Filter;
