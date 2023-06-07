import {AppBar, Button, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import MenuItem from "./MenuItem";
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Header = () => {

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{borderBottom: (theme) => `1px solid ${theme.palette.divider}`}}>
            <Toolbar sx={{flexWrap: 'wrap'}}>
                <Typography variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1, textDecoration: 'unset'}}
                            to="/"
                            component={NavLink}
                >
                    Inventory
                </Typography>
                <nav>
                    <Tooltip title="Create inventory">
                        <IconButton>
                            <MenuItem path="/inventories/create" value={<AddBoxIcon/>}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Create employee">
                        <IconButton>
                            <MenuItem path="/employees/create" value={<PersonAddIcon/>}/>
                        </IconButton>
                    </Tooltip>
                </nav>
                <Button href="#" variant="outlined" sx={{my: 1, mx: 1.5}}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}
export default Header;