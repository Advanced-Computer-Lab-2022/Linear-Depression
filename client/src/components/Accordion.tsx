import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from "@chakra-ui/react";
import CheckboxLists from "./CheckBoxLists";
import "./Accordion.css";

SimpleAccordion.defaultProps = {
    title: "azooooz",
    items: ["Item 1", "Item 2", "Item 3"],
};

export default function SimpleAccordion({title}: {title?: string}) {
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <AccordionButton className="accordionButton">
                    <Box flex="1" textAlign="left">
                        {title}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <CheckboxLists  />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
