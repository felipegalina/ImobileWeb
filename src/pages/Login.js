import React, { useState, useLayoutEffect } from 'react';
import { FaHeart } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import {
    Button,
    Grid,
    Paper,
    TextField,
    Checkbox
}
    from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Firebase from '../services/FirebaseConnect'
import { useHistory } from "react-router-dom";
import GoogleMapReact from 'google-map-react';

function Login() {
    let history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")
    const [lembreme, setLembreme] = useState(false)
    const [lista, setLista] = useState([])
    const [listaImovel, setListaImovel] = useState([])

    const [ponto, setPonto] = useState({
        center: {
            lat: -28.258205,
            lng: -52.406838
        },
        zoom: 13
    })

    useLayoutEffect(() => {

        Firebase
            .database()
            .ref(`/imovel`)
            .on('value', snapchot => {
                // converter objetos em listas
                if (snapchot.val()) {
                    let dados = snapchot.val()
                    const keys = Object.keys(dados)
                    const lista = keys.map((key) => {
                        return { ...dados[key], id: key }
                    })
                    setLista(lista)
                } else {
                    setLista([])
                }
            })

        Firebase
            .database()
            .ref(`/imovel`)
            .on('value', snapchot => {
                // converter objetos em listas
                if (snapchot.val()) {
                    let dados = snapchot.val()
                    const keys = Object.keys(dados)
                    const lista = keys.map((key) => {
                        return { ...dados[key], id: key }
                    })
                    setListaImovel(lista)
                } else {
                    setListaImovel([])
                }
            })

        let emailStorage = localStorage.getItem("email")
        let passwordStorage = localStorage.getItem("password")
        if (emailStorage && passwordStorage) {
            setEmail(emailStorage)
            setPassword(passwordStorage)
            setLembreme(true)
        }

    }, [])


    const login = () => {

        if (lembreme == false) {
            localStorage.removeItem("email")
            localStorage.removeItem("password")
        }

        Firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((retorno) => {
                sessionStorage.setItem("uuid", retorno.user.uid)
                if (lembreme === true) {
                    localStorage.setItem("email", email)
                    localStorage.setItem("password", password)
                }
                setMsg("")
                setTimeout(() => {
                    history.push("/menu");
                }, 100);


            })
            .catch((erro) => {
                console.log(erro)
                setMsg("Usuário ou senha inválidos!")
            })
    }


    const Marker = ({ text }) =>
        <div style={{ width: 200}}>
            <RoomIcon color="error" fontSize="large" />
            <span style={{ backgroundColor: "red" }}>{text}</span>
        </div>;

    const MarkerImovel = ({ text }) =>
        <div style={{ width: 200}}>
            <RecordVoiceOverIcon color="primary" fontSize="large" />
            <span style={{ backgroundColor: "blue", color: "white" }}>{text}</span>
        </div>;

    return (
        <div>
            <Grid container spacing={5}>
                <Grid item sm={9} xs={12}>

                </Grid>
                <Grid item sm={4} xs={12}>
                    <Paper elevation={0}>
                        <TextField
                            label="E-mail"
                            variant="outlined"
                            size="small"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: "100%", marginBottom: 10 }} />
                        <TextField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Senha"
                            variant="outlined"
                            type="password"
                            size="small"
                            style={{ width: "100%", marginBottom: 10 }} />
                        <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
                            <Checkbox
                                checked={lembreme}
                                onChange={(e) => setLembreme(e.target.checked)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            /> Lembre-me
            </Grid>
                        <Grid item sm={12} xs={12} style={{ textAlign: "center", color: "red", marginBottom: 5, fontSize: 12 }}>
                            {msg}
                        </Grid>
                        <Button
                            onClick={login}
                            variant="outlined"
                            color="primary"
                            style={{ float: "right" }}>
                            Entrar
            </Button>
                    </Paper>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <div style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDvdkyqaq8Cu2fVp_9EQNNnhMoDmT-GXt4" }}
                            defaultCenter={ponto.center}
                            defaultZoom={ponto.zoom}
                        >
                            {lista.map((item, key) =>
                                <Marker
                                    key={key}
                                    lat={item.latitude}
                                    lng={item.longitude}
                                    text={item.imovel + " " + item.preco}
                                />
                            )}

                            {listaImovel.map((item, key) =>
                                <MarkerImovel
                                    key={key}
                                    lat={item.latitude}
                                    lng={item.longitude}
                                    text={item.local}
                                />
                            )}



                        </GoogleMapReact>
                    </div>
                        <footer className="footer">
                    <div className="footer__social"> 
                    </div>
                    <p className="footer__copyright">Desenvolvido por Felipe Veloso Galina E-mail: 1116670@imed.edu.br</p>
                </footer>   
                </Grid>
            </Grid>

                               
        </div>
    );
}



export default Login;