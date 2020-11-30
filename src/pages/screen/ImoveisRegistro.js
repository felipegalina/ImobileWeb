import React, { useState } from 'react'
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
import Firebase from '../../services/FirebaseConnect'
import { v4 as uuidv4 } from 'uuid';
import Geocode from "react-geocode";

export default function ImoveisRegistro(props) {

    const [imovel, setImovel] = useState("")
    const [local, setLocal] = useState("")
    const [preco, setPreco] = useState("")

    const limpar = () => {
        setImovel("")
        setLocal("")
        setPreco("")
    }

    const salvarRegistro = () => {

        Geocode.setApiKey("AIzaSyDvdkyqaq8Cu2fVp_9EQNNnhMoDmT-GXt4");

        Geocode.fromAddress(local).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                let objeto = {
                    imovel: imovel,
                    local: local,
                    preco: preco,
                    latitude: lat,
                    longitude: lng
                }
                let code = uuidv4()

                Firebase
                    .database()
                    .ref(`imovel/${code}`)
                    .set(objeto)
                    .then(() => {
                        limpar()
                    })
                    .catch((erro) => {
                        console.log(erro)
                    })

            },
            error => {
                console.error(error);
            }
        );

    }

    return (
        <Grid container spacing={1} >
            <Grid item sm={10} xs={12}>
                <TextField
                    label="Imóvel"
                    variant="outlined"
                    value={imovel}
                    onChange={(e) => setImovel(e.target.value)}
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                    label="Local"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <TextField
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    label="Preço"
                    variant="outlined"
                    size="small"
                    type="email"
                    style={{ width: "100%", marginBottom: 10 }} />
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={salvarRegistro}
                    style={{ float: "right" }}>
                    Cadastrar Dados
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => props.setScreen(1)}
                    style={{ float: "right" }}>
                    Cancelar
                </Button>
            </Grid>
        </Grid >

    )
}
