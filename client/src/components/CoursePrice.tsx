import React from "react";
import styled from "styled-components";

import { Promotion } from "@internals/types";

const CoursePriceSection = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    flex: 1;
`;

const Price = styled.p<{ isDiscounted?: boolean }>`
    font-weight: 800;
    text-decoration: ${(props) => (props.isDiscounted ? "line-through" : "none")};
`;

const CoursePrice: React.FC<{ currency: string; price: number; promotion?: Promotion }> = ({
    currency,
    price,
    promotion
}) => {
    let discount = promotion ? promotion.discountPercent : 0;
    let discountedPrice = price;
    discount = price === 0 || !discount ? 0 : discount;
    if (discount) {
        discountedPrice = price - (price * discount) / 100;
    }
    const priceString = price === 0 ? "Free" : `${currency} ${price.toFixed(2)}`;
    const discountedPriceString = discountedPrice === 0 ? "Free" : `${currency} ${discountedPrice.toFixed(2)}`;
    return (
        <CoursePriceSection>
            <Price isDiscounted={discount ? true : false}>{priceString}</Price>
            {discount > 0 && <Price isDiscounted={false}>{discountedPriceString}</Price>}
        </CoursePriceSection>
    );
};

export default CoursePrice;
