import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from "@chakra-ui/react";
import "./Accordion.css";

const SimpleAccordion: React.FC<{ title: string; items: string[]; child: React.FC<{ items: string[] }> }> = ({
    title,
    items,
    child
}) => {
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <AccordionButton className="accordionButton">
                    <Box flex="1" textAlign="left">
                        {title}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>{child({ items })}</AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};

export default SimpleAccordion;
