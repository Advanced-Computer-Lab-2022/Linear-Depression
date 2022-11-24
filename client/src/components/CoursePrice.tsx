import React from "react";
import styled from "styled-components";

import { Promotion } from "@internals/types";

const VerticalContainter = styled.div`
    width: 100%;
    flex: 1;
`;

const HorizontalContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Price = styled.p`
    font-weight: 800;
    margin-right: 8px;
`;

const CrossedPrice = styled.p<{ small?: boolean }>`
    font-weight: ${(props) => (props.small ? "400" : "800")};
    font-size: ${(props) => (props.small ? "14px" : "16px")};
    text-decoration: line-through;
`;

const CoursePrice: React.FC<{ currency: string; price: number; promotion?: Promotion; horizontalView?: boolean }> = ({
    currency,
    price,
    promotion,
    horizontalView
}) => {
    // for testing purposes
    promotion = {
        name: "50% off",
        discountPercent: 50,
        startDate: new Date(),
        endDate: new Date()
    };

    let discount = promotion ? promotion.discountPercent : 0;
    let discountedPrice = price;
    discount = price === 0 || !discount ? 0 : discount;
    if (discount) {
        discountedPrice = price - (price * discount) / 100;
    }
    const priceString = price === 0 ? "Free" : `${currency} ${price.toFixed(2)}`;
    const discountedPriceString = discountedPrice === 0 ? "Free" : `${currency} ${discountedPrice.toFixed(2)}`;

    if (horizontalView) {
        return (
            <HorizontalContainer>
                {discount ? <Price>{discountedPriceString}</Price> : null}
                {discount ? <CrossedPrice small={true}>{priceString}</CrossedPrice> : <Price>{priceString}</Price>}
            </HorizontalContainer>
        );
    } else {
        return (
            <VerticalContainter>
                {discount ? <CrossedPrice>{priceString}</CrossedPrice> : <Price>{priceString}</Price>}
                {discount ? <Price>{discountedPriceString}</Price> : null}
            </VerticalContainter>
        );
    }
};

export default CoursePrice;
