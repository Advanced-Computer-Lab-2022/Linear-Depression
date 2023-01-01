import { Link } from "@mui/material";
import Divider from "@mui/material/Divider";
import React from "react";
import styled from "styled-components";

import bld from "../assets/bld.png";
import google from "../assets/google.png";
import robusta from "../assets/robusta.png";
import shahry from "../assets/shahry.png";
import valeo from "../assets/valeo.png";
import { Copyright } from "@internals/components";

const FooterContainer = styled.footer`
    background-color: #1c1d1f;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 160px;
`;

const CustomCopyRight = styled(Copyright)`
    color: #fff;
    a {
        color: #a435f0;
    }
`;

const FooterItem = styled(Link)`
    color: #fff;
    margin-right: 1rem;
    margin-left: 1rem;
    text-decoration: none;
    &:hover {
        color: #a435f0;
    }
`;

const Container = styled.div`
    display: flex;
    background-color: #1c1d1f;
    align-items: center;
    height: 60px;
`;

const CustomDivider = styled(Divider)`
    height: 0.1px;
    background-color: #3a4f7a;
`;

const CompaniesContainer = styled.div`
    display: flex;
    margin-left: auto;
`;

const CustomParagraph = styled.p`
    color: #fff;
    margin-right: 1rem;
    margin-left: 1rem;
    margin-top: 15px;
    text-decoration: none;
`;

const CompanyLogo = styled.img`
    height: 30px;
    margin: 0 1rem;
`;

const FooterItemsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CopyRightsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Footer: React.FC = () => {
    return (
        <div
            style={{
                bottom: "0",
                width: "100%"
            }}
        >
            <Container>
                <CustomParagraph>
                    Top companies choose Linear Depression Company to build in-demand career skills
                </CustomParagraph>
                <CompaniesContainer>
                    <CompanyLogo
                        style={{
                            paddingTop: "5px"
                        }}
                        src={valeo}
                    />
                    <CompanyLogo
                        style={{
                            height: "22px"
                        }}
                        src={robusta}
                    />
                    <CompanyLogo src={bld} />
                    <CompanyLogo src={shahry} />
                    <CompanyLogo src={google} />
                </CompaniesContainer>
            </Container>
            <CustomDivider variant="middle" />
            <FooterContainer>
                <br />
                <FooterItemsContainer>
                    <FooterItem href="/about-us" underline="none">
                        About Us
                    </FooterItem>
                    <FooterItem href="https://www.lipsum.com/privacy.pdf" variant="body1" color="textPrimary">
                        Privacy Policy
                    </FooterItem>
                </FooterItemsContainer>
                <br />
                <CopyRightsContainer>
                    <CustomParagraph>Made with ❤️ by Linear Depression Company</CustomParagraph>
                </CopyRightsContainer>
                <CustomCopyRight />
            </FooterContainer>
        </div>
    );
};

export default Footer;
