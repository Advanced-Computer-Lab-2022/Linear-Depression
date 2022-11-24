import React from "react";
import styled from "styled-components";

import CourseActions from "./courseHeader/CourseActions";
import CourseInfo from "./courseHeader/CourseInfo";
import { Promotion } from "@internals/types";

const Header = styled.div`
    height: 370px;
    background-color: #1e1f1f;
    justify-content: center;
    padding: 32px 0;
    color: white;
    display: flex;
`;

const CourseHeader: React.FC<{
    title: string;
    description: string;
    instructor: string;
    rating: number;
    price: number;
    currency: string;
    promotion: Promotion;
}> = ({ title, description, rating, instructor, price, promotion, currency }) => {
    return (
        <Header>
            {/* <div className="min-screen">
                    <CourseVideo imgSrc={courseInfo.img} />
                </div> */}
            <CourseInfo title={title} description={description} rating={rating} instructor={instructor} />
            <CourseActions price={price} currency={currency} promotion={promotion} />
            {/* <div className="course-meta">
                <div>
                    <img src="/icons/caution.png" className="meta-icon"></img>
                    <span className="meta-info">Last updated 9/2015</span>
                </div>
                <div>
                    <img src="/icons/language.png" className="meta-icon"></img>
                    <span className="meta-info">English</span>
                </div>
                <div>
                    <img src="/icons/close-caption.png" className="meta-icon"></img>
                    <span className="meta-info">English</span>
                </div>
            </div> */}
            {/* <div className="min-screen">
                    <div className="course-header-content-course-price ">{courseInfo.price}</div>
                    <button className="course-header-content-course-add-to-cart">Add to cart</button>
                    <div className="course-header-content-subtitle">30-Day Money-Back Guarantee</div>
                    <div className="course-header-content-subtitle">Full Lifetime Access</div>
                    <div className="course-actions">
                        <div>Share</div>
                        <div>Gift this course</div>
                        <div>Apply Coupon</div>
                    </div>
                </div> */}
        </Header>
    );
};

export default CourseHeader;
