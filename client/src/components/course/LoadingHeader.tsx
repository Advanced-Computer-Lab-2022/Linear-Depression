import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styled from "styled-components";

const Header = styled.div`
    height: 370px;
    background-color: #1e1f1f;
    padding: 32px 96px;
    color: white;
    display: flex;
`;

const LoadingHeader: React.FC = () => {
    return (
        <SkeletonTheme baseColor="white" highlightColor="#444">
            <Header>
                <div style={{ width: "100%", height: "100%", paddingLeft: "20px", flex: 4 }}>
                    <Skeleton width={300} height={30} />
                    <Skeleton width={500} height={40} />
                    <br />
                    <Skeleton width={200} height={20} />
                    <Skeleton width={200} height={20} />
                </div>
                <div>
                    <Skeleton width={260} height={160} />
                    <Skeleton width={200} height={40} />
                </div>
            </Header>
        </SkeletonTheme>
    );
};

export default LoadingHeader;
