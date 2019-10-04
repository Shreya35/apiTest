import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import PopUp from "./PopUp";
import { makeServiceCall } from "../common";
import "../App.css";

const useStyles = {
    root: {
        width: "100%",
        marginTop: "20",
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    }

};

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            isToggle: false,
            editData: null
        };
    }

    componentDidMount() {
        const fetchInfo = {
            method: "GET",
            url: "http://localhost:4100/test/findApi"
        };

        makeServiceCall(fetchInfo, data => {
            if (data.success.length > 0) {
                this.setState({ rows: data.success });
            }
        });
    }

    toggle = () => {
        this.setState({ isToggle: !this.state.isToggle });
    }

    cancel = () => {
        this.setState({ isToggle: false, editData: null });
    }

    deleteData = id => {
        const fetchInfo = {
            method: "DELETE",
            url: "http://localhost:4100/test/deleteApi",
            body: { id }
        };
        makeServiceCall(fetchInfo, data => {
            if (data.success) {
                const deleteId = this.state.rows.findIndex(row => {
                    return row.id === id;
                });
                const copy = [...this.state.rows];
                const newArr = copy.splice(deleteId, 1);
                this.setState({ rows: copy });
            }
        });
    }

    editData = edit => {
        this.setState({ editData: edit, isToggle: true });
    }

    updateTable = newItem => {
        const newRows = [...this.state.rows, newItem];
        this.setState({ rows: newRows, isToggle: false });
    }

    updateEditData = editAdd => {
        const indexToEdit = this.state.rows.findIndex((row, index) => {
            return row.id === editAdd.id;
        });
        const rowsDuplicate = [...this.state.rows];
        const newEditAfterData = rowsDuplicate.splice(indexToEdit, 1, editAdd);
        this.setState({ rows: rowsDuplicate, isToggle: false, editData: null });
    }


    render() {
        const { rows } = this.state;

        return (
            <>
                <div>
                    <Button variant="contained" color="primary" onClick={this.toggle}>
                        Add
                    </Button>
                </div>
                <div className="container">
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (

                                    <TableRow key={row.id}>
                                        <TableCell>
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.value}</TableCell>
                                        <TableCell>
                                            <div>
                                                <span onClick={e => { this.editData(row); }}>Edit</span>
                                                <span className="deleteStyl" onClick={e => { this.deleteData(row.id, e); }}>Delete</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
                {this.state.isToggle ? <PopUp updateEditData={this.updateEditData} updateTable={this.updateTable} editData={this.state.editData} cancel={this.cancel} /> : ""}

            </>
        );
    }
}
export default TableComponent;
