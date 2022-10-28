import React from "react";
import styled from "styled-components";
import { Box, H1, H4, H5, Illustration, IllustrationProps, Text } from "@adminjs/design-system";

const pageHeaderHeight = 284;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

const subHeaderHeight = 220;

// @ts-ignore
function BoldText({ children }) {
    return <span style={{ fontWeight: "bold" }}>{children}</span>;
}

export const DashboardHeader: React.FC = () => {
    return (
        <Box position="relative" overflow="hidden" data-css="default-dashboard">
            <Box position="absolute" top={50} left={-10} opacity={[0.2, 0.4, 1]} animate>
                <Illustration variant="Rocket" />
            </Box>
            <Box position="absolute" top={-70} right={-15} opacity={[0.2, 0.4, 1]} animate>
                <Illustration variant="Moon" />
            </Box>
            <Box
                bg="grey100"
                height={pageHeaderHeight}
                py={pageHeaderPaddingY + 35}
                px={["default", "lg", pageHeaderPaddingX]}
            >
                <Text textAlign="center" color="white" style={{ fontSize: "2.5rem" }}>
                    <H1>
                        <BoldText>Dashboard</BoldText>
                    </H1>
                </Text>
            </Box>
        </Box>
    );
};

type BoxType = {
    variant: string;
    title: string;
    href: string;
};

const resourcesBoxes = (): Array<BoxType> => [
    {
        variant: "Astronaut",
        title: "Instructor",
        href: "/admin/resources/Instructor"
    },
    {
        variant: "Astronaut",
        title: "Corporate Trainee",
        href: "/admin/resources/CorporateTrainee"
    },
    {
        variant: "Astronaut",
        title: "Admin",
        href: "/admin/resources/Admin"
    }
];

const Card = styled(Box)`
    display: ${({ flex }): string => (flex ? "flex" : "block")};
    color: ${({ theme }): string => theme.colors.grey100};
    text-decoration: none;
    border: 1px solid transparent;

    &:hover {
        border: 1px solid ${({ theme }): string => theme.colors.primary100};
        box-shadow: ${({ theme }): string => theme.shadows.cardHover};
    }
`;

Card.defaultProps = {
    variant: "white",
    boxShadow: "card"
};

export const Dashboard: React.FC = () => {
    return (
        <Box>
            <DashboardHeader />
            <Box height={subHeaderHeight - 50} py={pageHeaderPaddingY - 50} px={["default", "lg", pageHeaderPaddingX]}>
                <Text textAlign="center" color="bg100">
                    <H4>Site Users</H4>
                </Text>
            </Box>

            <Box
                mt={["xl", "xl", "-100px"]}
                mb="xl"
                mx={[0, 0, 0, "auto"]}
                px={["default", "lg", "xxl", "0"]}
                position="relative"
                flex
                flexDirection="row"
                flexWrap="wrap"
                width={[1, 1, 1, 1024]}
            >
                {resourcesBoxes().map((box, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Box key={index} width={[1, 1 / 2, 1 / 2, 1 / 3]} p="lg">
                        <Card as="a" href={box.href} target="_blank">
                            <Text textAlign="center">
                                <Illustration
                                    variant={box.variant as IllustrationProps["variant"]}
                                    width={100}
                                    height={70}
                                />
                                <H5 mt="lg">{box.title}</H5>
                            </Text>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Dashboard;
