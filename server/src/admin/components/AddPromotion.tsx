import React from "react";
import { Box, H3 } from "@adminjs/design-system";
import { ActionProps } from "adminjs";

const AddPromotion = (props: ActionProps) => {
    const { records } = props;
    console.log("records", records);

    return (
        <Box flex>
            <Box variant="white" width={1 / 2} boxShadow="card" mr="xxl" flexShrink={0}>
                <H3>Example of a simple page</H3>
                <p>Where you can put almost everything</p>
                <p>like this:</p>
                <p>
                    <img src="https://i.redd.it/rd39yuiy9ns21.jpg" alt="stupid cat" width={300} />
                </p>
            </Box>
            <Box>
                <p>Or (more likely), operate on a returned record:</p>
                <Box overflowX="auto"></Box>
            </Box>
        </Box>
    );
};

export default AddPromotion;
