import {AppBar, Button, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import MenuItem from "./MenuItem";
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

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
                    <Tooltip title="Employees">
                        <IconButton>
                            <MenuItem path="/employees" value={<GroupIcon/>}/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Create officer">
                        <IconButton>
                            <MenuItem path="/officers/create" value={<PersonAddAltIcon/>}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Officers">
                        <IconButton>
                            <MenuItem path="/officers" value={<PeopleOutlineIcon/>}/>
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