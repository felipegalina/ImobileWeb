import React, { useState, useLayoutEffect } from 'react'
import {
    Button,
    Grid,
    Paper,
}
    from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Firebase from '../../services/FirebaseConnect'

export default function LocalImovelLista(props) {

    const [lista, setLista] = useState([])

    useLayoutEffect(() => {

        Firebase
            .database()
            .ref(`/localimovel`)
            .on('value', snapchot => {
                // converter objetos em listas
                if (snapchot.val()) {
                    let dados = snapchot.val()
                    const keys = Object.keys(dados)
                    const lista = keys.map((key) => {
                        return { ...dados[key], id: key }
                    })
                    setLista(lista)
                } else{
                    setLista([])
                }
            })

    }, [])


    const excluir = (item) => {
        Firebase
            .database()
            .ref(`/localimovel/${item.id}`)
            .remove()

    }

    return (
        <Grid container spacing={1} >
            <Grid item sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Local Imóvel</TableCell>
                                <TableCell align="right">Opções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lista.map((item, key) => {
                                return <TableRow key={key}>
                                    <TableCell component="th" scope="row">
                                        {item.local}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            onClick={() => excluir(item)}
                                            color="primary"
                                            startIcon={<DeleteIcon />}>
                                            Excluir
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item sm={12} xs={12}>
                <Button
                    variant="contained"
                    onClick={() => props.setScreen(4)}
                    color="primary"
                    startIcon={<AddCircleIcon />}>
                    Novo Registro
                    </Button>

            </Grid>


        </Grid>
    )
}
