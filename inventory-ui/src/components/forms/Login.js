import {Form, Formik} from "formik";
import * as Yup from 'yup'
import {
    Alert,
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    createTheme,
    CssBaseline,
    ThemeProvider,
    Typography
} from "@mui/material";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormTextInput from "./FormTextInput";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {login} from "../api/userApi";
import {useState} from "react";


const defaultTheme = createTheme();
const Login = () => {

    const [showError, setShowError] = useState(false);

    const onLogin = (values, helpers) => {
        login(values)
            .then(({data}) => console.log('data from login', data))
            .catch((error) => {
                console.log(error);
                setShowError(true);
            })
            .finally(() => helpers.setSubmitting(false));
    }
    const {t} = useTranslation('login');
    const loginValidationSchema = Yup.object().shape({
        username: Yup.string().required(t('validationUsernameIsRequired')),
        password: Yup.string().required(t('validationPasswordIsRequired'))
    });

    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            onSubmit={onLogin}
            validationSchema={loginValidationSchema}>
            {props => (
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {t('signIn')}
                            </Typography>
                            <Box noValidate sx={{mt: 1}}>
                                {showError && <Alert severity="error">{t('loginFailed')}</Alert>}
                                <Form>
                                    <FormTextInput
                                        margin="normal"

                                        error={props.touched.username && !!props.errors.username}
                                        name="username"
                                        label={t('labelUsername')}/>

                                    <FormTextInput
                                        margin="normal"

                                        error={props.touched.password && !!props.errors.password}
                                        name="password"
                                        type="password"
                                        label={t('labelPassword')}/>

                                    {
                                        props.isSubmitting ? <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <CircularProgress margin="normal"/>
                                            </Box> :
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{mt: 3, mb: 2}}
                                            >{t('signIn')}
                                            </Button>
                                    }


                                </Form>

                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            )
            }
        </Formik>
    );
}

export default Login;