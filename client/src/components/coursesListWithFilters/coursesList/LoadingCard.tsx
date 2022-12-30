import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

const HorizontalLayout = styled.div`
    display: flex;
    padding-right: 70px;
`;

const CardContainer = styled.div`
    height: 170px;
    margin-bottom: 20px;
    padding: 10px;
`;

const CourseDetails = styled.div`
    width: 100%;
    height: 100%;
    padding-left: 20px;
    flex: 4;
`;

const LoadingCard: React.FC = () => {
    return (
        <CardContainer>
            <HorizontalLayout>
                <Skeleton width={260} height={160} />
                <CourseDetails>
                    <Skeleton width={300} height={20} />
                    <Skeleton width={500} height={40} />
                    <br />
                    <Skeleton width={200} height={20} />
                    <Skeleton width={200} height={20} />
                </CourseDetails>
                <Skeleton width={100} height={20} />
            </HorizontalLayout>
            <hr />
        </CardContainer>
    );
};

export default LoadingCard;
