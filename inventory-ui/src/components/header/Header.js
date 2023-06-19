import {AppBar, Avatar, Button, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import MenuItem from "./MenuItem";
import AddBoxIcon from '@mui/icons-material/AddBox';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BusinessIcon from '@mui/icons-material/Business';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import LanguageSwitcher from "../switcher/LanguageSwitcher";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../store/slices/userSlice";

const Header = () => {
    const {t} = useTranslation('header');
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const onLogout = () => {
        dispatch(removeUser());
        navigation('/');
    }
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
                    {t('home')}
                </Typography>
                <nav>
                    {user?.roles.includes('ADMIN') && <Tooltip title={t('createInventory')}>
                        <IconButton>
                            <MenuItem path="/inventories/create" value={<AddBoxIcon/>}/>
                        </IconButton>
                    </Tooltip>}
                    {user?.roles.includes('ADMIN') && <Tooltip title={t('createEmployee')}>
                        <IconButton>
                            <MenuItem path="/employees/create" value={<PersonAddIcon/>}/>
                        </IconButton>
                    </Tooltip>}
                    {user?.roles.includes('USER') && <Tooltip title={t('employees')}>
                        <IconButton>
                            <MenuItem path="/employees" value={<GroupIcon/>}/>
                        </IconButton>
                    </Tooltip>}
                    {user?.roles.includes('ADMIN') && <Tooltip title={t('createOfficer')}>
                        <IconButton>
                            <MenuItem path="/officers/create" value={<PersonAddAltIcon/>}/>
                        </IconButton>
                    </Tooltip>}
                    {user?.roles.includes('USER') &&<Tooltip title={t('officers')}>
                        <IconButton>
                            <MenuItem path="/officers" value={<PeopleOutlineIcon/>}/>
                        </IconButton>
                    </Tooltip>}
                    {user?.roles.includes('USER') &&<Tooltip title={t('cities')}>
                        <IconButton>
                            <MenuItem path="/cities" value={<BusinessIcon/>}/>
                        </IconButton>
                    </Tooltip>}
                    {user?.roles.includes('ADMIN') && <Tooltip title={t('createRoom')}>
                        <IconButton>
                            <MenuItem path="/rooms/create" value={<DomainAddIcon/>}/>
                        </IconButton>
                    </Tooltip>}
                </nav>
                {
                    user ? <Button
                            variant="outlined"
                            sx={{my: 1, mx: 1.5}}
                            onClick={onLogout}>
                            {t('logout')}
                        </Button> :
                        <Button
                            variant="outlined"
                            sx={{my: 1, mx: 1.5}}
                            component={NavLink}
                            to="/login">
                            {t('login')}
                        </Button>
                }

                <LanguageSwitcher/>
            </Toolbar>
        </AppBar>
    );
}
export default Header;