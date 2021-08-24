import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import { ChromePicker } from "react-color";
import styles from "./styles/ColorPickerForm"

class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
        this.state = {
            currentColor: "teal",
            newColorName : ""
        }
        this.updateCurrentColor= this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}
    componentDidMount() {
		ValidatorForm.addValidationRule("isColorNameUnique", value =>
			this.props.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule("isColorUnique", value =>
			this.props.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}
    updateCurrentColor(newColor, event) {
		this.setState({ currentColor: newColor.hex });
	}
    handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
    handleSubmit(evt){
        const newColor ={
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor);
        this.setState({newColorName: ""})
    }
	render() {
        const {paletteIsFull, classes} = this.props;
        const {newColorName, currentColor} = this.state;
		return (
			<div className={classes.root} >
				<ChromePicker
					className={classes.picker}
					color={currentColor}
					onChangeComplete={this.updateCurrentColor}
				/>
				<ValidatorForm onSubmit={this.handleSubmit}>
					<TextValidator
						variant="filled"
						className={classes.colorNameInput}
						value={newColorName}
						margin="normal"
						label="Color name"
						name="newColorName"
						onChange={this.handleChange}
						validators={[ "required", "isColorNameUnique", "isColorUnique" ]}
						errorMessages={[
							"Enter a Color name",
							"Color name must be Unique",
							"Color already used"
						]}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={classes.addColor}
						style={{
							backgroundColor : paletteIsFull ? "grey" : currentColor
						}}
						disabled={paletteIsFull}
					>
						{paletteIsFull ? "Palette Full" : "Add Color"}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles)(ColorPickerForm);
