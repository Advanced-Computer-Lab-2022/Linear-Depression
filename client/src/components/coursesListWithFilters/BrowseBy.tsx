import { Typography, Sheet, Tabs, TabList, Tab, CssVarsProvider, extendTheme } from "@mui/joy";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const theme = extendTheme({
    fontFamily: {
        body: "Inter, sans-serif",
        display: "Inter, sans-serif"
    }
});

enum BrowseByOptions {
    POPULARITY = "popularity",
    NEW = "new"
}

const BrowseBy: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedOption, setSelectedOption] = useState(searchParams.get("sort") as BrowseByOptions);

    const handleBrowseByChange = (newValue: BrowseByOptions) => {
        setSelectedOption(newValue);

        searchParams.set("sort", newValue.toLowerCase());
        setSearchParams(searchParams);
    };

    return (
        <CssVarsProvider theme={theme}>
            <Sheet sx={{ mx: 5, mt: 2, mb: 1, display: "flex", gap: 1 }}>
                <Typography level="h6" sx={{ alignSelf: "center" }} fontWeight="bold">
                    Browse by
                </Typography>

                <Tabs
                    defaultValue={selectedOption}
                    value={selectedOption}
                    onChange={(_e, newValue) => handleBrowseByChange(newValue as BrowseByOptions)}
                >
                    <TabList variant="soft">
                        {Object.values(BrowseByOptions).map((option) => (
                            <Tab key={option} value={option}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </Tab>
                        ))}
                    </TabList>
                </Tabs>
            </Sheet>
        </CssVarsProvider>
    );
};

export default BrowseBy;
