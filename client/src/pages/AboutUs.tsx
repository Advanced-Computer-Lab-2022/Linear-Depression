import { CssVarsProvider } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import styled from "styled-components";

import { Navbar } from "@internals/components";

const SocialMediaContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`;

const ProfileContainer = styled.div`
    margin-left: 30px;
`;

const Title = styled(Typography)`
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    text-align: center;
    font-size: 30px;
`;

const ProfileCards = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px auto;
    width: 700px;
`;

const CircularCard: React.FC<{
    name: string;
    imageURL: string;
    country: string;
    linkedInURL: string;
    githubURL: string;
    alternate: boolean;
}> = ({ name, imageURL, country, linkedInURL, githubURL, alternate }) => {
    return (
        <CssVarsProvider>
            <Card
                variant="outlined"
                row
                sx={{
                    width: 500,
                    gap: 2,
                    borderRadius: 50000,
                    margin: "10px 0",
                    marginLeft: alternate ? "auto" : "0px",
                    "&:hover": { boxShadow: "md", borderColor: "neutral.outlinedHoverBorder" }
                }}
            >
                <Avatar
                    sx={{
                        width: 150,
                        height: 150
                    }}
                    src={imageURL}
                />
                <ProfileContainer>
                    <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
                        {name}
                    </Typography>
                    <Typography fontSize="sm" aria-describedby="card-description" mb={1}>
                        <Link overlay underline="none" href="#interactive-card" sx={{ color: "text.tertiary" }}>
                            {country}
                        </Link>
                    </Typography>
                    <Chip variant="outlined" color="primary" size="md" sx={{ pointerEvents: "none" }}>
                        Software Engineer
                    </Chip>
                    <SocialMediaContainer>
                        <Link href={linkedInURL}>
                            <AiFillLinkedin
                                style={{
                                    fontSize: "30px",
                                    marginRight: "20px"
                                }}
                            />
                        </Link>
                        <Link href={githubURL}>
                            <AiFillGithub
                                style={{
                                    fontSize: "30px",
                                    marginRight: "20px"
                                }}
                            />
                        </Link>
                    </SocialMediaContainer>
                </ProfileContainer>
            </Card>
        </CssVarsProvider>
    );
};

const AboutUs: React.FC = () => {
    const authors = [
        {
            name: "Abdulaziz Hassan",
            imageURL: "https://avatars.githubusercontent.com/u/82768721?v=4",
            country: "Saudi Arabia",
            linkedInURL: "http://www.linkedin.com/in/abdulaziz-alamri-",
            githubURL: "https://github.com/Abdulaziz-Hassan"
        },
        {
            name: "Ahmed Nasser",
            imageURL: "https://avatars.githubusercontent.com/u/37817681?v=4",
            country: "Egypt",
            linkedInURL: "https://www.linkedin.com/in/ahmednasser217/",
            githubURL: "https://github.com/AhmedNasserG"
        },
        {
            name: "Mohammad Omar",
            imageURL: "https://avatars.githubusercontent.com/u/72332009?v=4",
            country: "Egypt",
            linkedInURL: "https://www.linkedin.com/in/mohammad-omar-taha/",
            githubURL: "https://github.com/MohammadOTaha"
        },
        {
            name: "Ibrahim Abou Elenein",
            imageURL: "https://avatars.githubusercontent.com/u/35760882?v=4",
            country: "Egypt",
            linkedInURL: "https://www.linkedin.com/in/aboueleyes/",
            githubURL: "https://github.com/aboueleyes"
        },
        {
            name: "Elshimaa Betah",
            imageURL: "https://avatars.githubusercontent.com/u/79271594?v=4",
            country: "Egypt",
            linkedInURL: "https://www.linkedin.com/in/shimaa-ahmed2864/",
            githubURL: "https://github.com/ShimaaBetah"
        }
    ];
    return (
        <>
            <Navbar />
            <Title level="h1" fontSize="xl" id="card-description" mb={0.5}>
                Meet the team behind this piece of art
            </Title>
            <ProfileCards>
                {authors.map((author, index) => (
                    <CircularCard
                        name={author.name}
                        imageURL={author.imageURL}
                        country={author.country}
                        linkedInURL={author.linkedInURL}
                        githubURL={author.githubURL}
                        alternate={index % 2 === 1}
                    />
                ))}
            </ProfileCards>
        </>
    );
};

export default AboutUs;
