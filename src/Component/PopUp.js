import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeServiceCall } from "../common";
import "../App.css";

class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.editData ? props.editData.id : "",
            value: props.editData ? props.editData.value : ""
        };
    }

    cancelPopUp = () => {
        this.props.cancel();
    }

    handleChaange = event => {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
    }

    saveData = () => {
        const fetchInfo = {
            method: "POST",
            url: "http://localhost:4100/test/createApi",
            body: this.state
        };

        if (this.state.id.length > 0 && this.state.value.length > 0) {
            makeServiceCall(fetchInfo, data => {
                if (data.success) {
                    this.props.updateTable(data.success);
                }
            });
        }
    }

    saveEditChanges = () => {
        const fetchInfo = {
            method: "PUT",
            url: "http://localhost:4100/test/updateApi",
            body: this.state
        };
        makeServiceCall(fetchInfo, data => {
            this.props.updateEditData(data.success);
        });
    }

    render() {
        return (

            <div className="popUpController">
                <div className="popUpFormController">
                    <div>
                        <div>
                            <TextField
                                required
                                id="standard-required"
                                label="ID"
                                name="id"
                                onChange={this.handleChaange}
                                value={this.state.id}
                                disabled={!!this.props.editData}
                            />
                        </div>

                        <div>
                            <TextField
                                required
                                id="standard-required"
                                label="Value"
                                value={this.state.value}
                                name="value"
                                onChange={this.handleChaange}
                            />
                        </div>

                        <div className="btnStyle">

                            {this.props.editData ? (
                                <Button onClick={this.saveEditChanges} variant="contained" color="primary">
                                    Save Changes
                                </Button>
                            ) : (
                                    <Button variant="contained" color="primary" onClick={this.saveData}>
                                        Save
                                    </Button>
                                )}
                            <Button id="btnStyle1" variant="contained" color="primary" onClick={this.cancelPopUp}>
                                Cancel
                            </Button>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}
export default PopUp;
