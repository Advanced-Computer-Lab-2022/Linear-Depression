import styled from "styled-components";

import bld from "../assets/bld.png";
import google from "../assets/google.png";
import robusta from "../assets/robusta.png";
import shahry from "../assets/shahry.png";
import valeo from "../assets/valeo.png";
import Copyright from "./Copyright";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #1c1d1f;
    height: 300px;
    width: auto;
    margin-top: 100px;
    color: #fff;
    padding-bottom: 20px;
`;

const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
`;

const CustomParagraph = styled.p`
    color: #fff;
    margin-right: 1rem;
    margin-left: 1rem;
    margin-top: 15px;
    text-decoration: none;
`;

const CompaniesContainer = styled.div`
    display: flex;
    margin-left: auto;
`;

const CompanyLogo = styled.img`
    height: 30px;
    margin: 0 1rem;
`;

const HorizontalDivider = styled.div`
    width: 100%;
    height: 1px;
    background-color: gray;
`;

const FooterItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto auto;
`;

const FooterItem = styled.a`
    color: #fff;
    margin-right: 1rem;
    margin-left: 1rem;
    text-decoration: none;
    &:hover {
        color: #a435f0;
    }
`;

const Footer = () => {
    return (
        <Container>
            <HorizontalContainer>
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
            </HorizontalContainer>
            <HorizontalDivider />
            <FooterItemsContainer>
                <FooterItem href="/about-us">About Us</FooterItem>
                <FooterItem href="https://www.lipsum.com/privacy.pdf" color="textPrimary">
                    Privacy Policy
                </FooterItem>
            </FooterItemsContainer>
            <CustomParagraph
                style={{
                    margin: "20px auto"
                }}
            >
                Made with ❤️ by Linear Depression Company
            </CustomParagraph>
            <Copyright />
        </Container>
    );
};

export default Footer;
