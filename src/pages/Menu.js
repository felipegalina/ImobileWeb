import React, { useState, useLayoutEffect } from 'react'

import {
    Button,
    Grid,
    Paper,
    TextField,
    Checkbox,
    MenuList,
    MenuItem,
}
    from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import Firebase from '../services/FirebaseConnect';
import ImoveisRegistro from './screen/ImoveisRegistro'
import ImoveisLista from './screen/ImoveisLista'
import LocalImovelRegistro from './screen/LocalImovelRegistro'
import LocalImovelLista from './screen/LocalImovelLista'




export default function Menu() {
    let history = useHistory();

    const [screen, setScreen] = useState(0)

    const logoff = () => {
        sessionStorage.removeItem("uuid")
        Firebase
            .auth()
            .signOut()
            .then(() => {
                history.push("/");
            }).catch(() => {
                history.push("/");
            })
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item sm={10} xs={12}>

                </Grid>
                <Grid item sm={2} xs={12}>
                    <Button
                        onClick={logoff}
                        variant="contained"
                        color="primary"
                        startIcon={<ExitToAppIcon />}>
                        Logoff
                    </Button>
                </Grid>
                <Grid item sm={2} xs={12}>
                    <Grid item sm={12} xs={12}>
                        <Paper>
                            <MenuList>
                                <MenuItem onClick={() => setScreen(1)}>IMOVEIS</MenuItem>
                                <MenuItem onClick={() => setScreen(3)}>LOCAL IMOVEIS</MenuItem>
                            </MenuList>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item sm={10} xs={12}>
                    <Paper>
                        {screen == 0 &&
                            
                            <>
                                Nenhuma opção selecionada
                            </>
                        }
                        {screen == 1 &&
                            <ImoveisLista setScreen={setScreen} />
                        }
                        {screen == 2 &&
                            <ImoveisRegistro setScreen={setScreen} />
                        }
                        {screen == 3 &&
                            <LocalImovelLista setScreen={setScreen} />
                        }
                        {screen == 4 &&
                            <LocalImovelRegistro setScreen={setScreen} />
                        }
                    
                    </Paper>
                </Grid>

            </Grid>
        </div>
    )
}
