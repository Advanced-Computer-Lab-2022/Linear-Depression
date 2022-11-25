import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import styled from "styled-components";

const AccordionButtonContainer = styled(AccordionButton)`
    border: none;
    height: 50px;
    margin: 0;
    width: 100%;
    background: none;
`;

const Item = styled.div`
    text-align: left;
    flex: 1;
    font-weight: 700;
`;

const SimpleAccordion: React.FC<{
    title: string;
    children: React.ReactNode;
}> = ({ title, children }) => {
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <AccordionButtonContainer>
                    <Item>{title}</Item>
                    <AccordionIcon />
                </AccordionButtonContainer>
                <AccordionPanel pb={4}>{children}</AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default SimpleAccordion;
