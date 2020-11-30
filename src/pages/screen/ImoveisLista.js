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

export default function ImoveisLista(props) {

    const [lista, setLista] = useState([])

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
                } else{
                    setLista([])
                }
            })

    }, [])


    const excluir = (item) => {
        Firebase
            .database()
            .ref(`/imovel/${item.id}`)
            .remove()

    }

    return (
        <Grid container spacing={1} >
            <Grid item sm={12} xs={12}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Imóvel</TableCell>
                                <TableCell align="right">Local</TableCell>
                                <TableCell align="right">Preço</TableCell>
                                <TableCell align="right">Opções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lista.map((item, key) => {
                                return <TableRow key={key}>
                                    <TableCell component="th" scope="row">
                                        {item.imovel}
                                    </TableCell>
                                    <TableCell align="right">{item.local}</TableCell>
                                    <TableCell align="right">{item.preco}</TableCell>
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
                    onClick={() => props.setScreen(2)}
                    color="primary"
                    startIcon={<AddCircleIcon />}>
                    Novo Registro
                    </Button>

            </Grid>


        </Grid>
    )
}
