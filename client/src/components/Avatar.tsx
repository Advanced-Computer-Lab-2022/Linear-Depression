import styled from "styled-components";

const AvatarContainer = styled.div<{ inverted: boolean }>`
    height: 48px;
    width: 48px;
    border-radius: 50%;
    background-color: ${({ inverted }) => (inverted ? "white" : "#1e1f1f")};
    color: ${({ inverted }) => (inverted ? "#1e1f1f" : "white")};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
    flex: 1;
`;

const getInitials = (name: string) => {
    const names = name.split(" ");
    return names[0].charAt(0) + names[1].charAt(0);
};

const Avatar: React.FC<{
    name: string;
    inverted?: boolean;
}> = ({ name, inverted }) => {
    return <AvatarContainer inverted={inverted}>{getInitials(name)}</AvatarContainer>;
};

export default Avatar;
