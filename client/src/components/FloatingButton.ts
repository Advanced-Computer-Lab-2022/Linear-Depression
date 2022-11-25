import styled from "styled-components";

const FloatingButton = styled.button`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #3f51b5;
    color: white;
    font-size: 30px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    &:hover {
        background-color: #303f9f;
    }
`;

export default FloatingButton;
