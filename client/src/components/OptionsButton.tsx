// import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import styled from "styled-components";

const ITEM_HEIGHT = 48;

const IconContainer = styled.div`
    margin-right: 10px;
`;

const OptionsButton: React.FC<{
    options: { label: string; onClick: () => void; icon?: JSX.Element }[];
    color?: string;
    icon: JSX.Element;
}> = ({ options, color, icon }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                style={{ color: color }}
            >
                {icon}
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button"
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch"
                    }
                }}
            >
                {options.map(({ label, onClick, icon }) => (
                    <MenuItem
                        key={label}
                        onClick={() => {
                            onClick();
                            handleClose();
                        }}
                    >
                        {icon && <IconContainer>{icon}</IconContainer>}
                        {label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default OptionsButton;
