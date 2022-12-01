import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const ITEM_HEIGHT = 48;

const OptionsButton: React.FC<{
    options: { label: string; onClick: () => void }[];
    color?: string;
}> = ({ options, color }) => {
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
                style={{ marginLeft: "10px", color: color }}
            >
                <MoreVertIcon />
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
                {options.map(({ label, onClick }) => (
                    <MenuItem
                        key={label}
                        onClick={() => {
                            onClick();
                            handleClose();
                        }}
                    >
                        {label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default OptionsButton;
