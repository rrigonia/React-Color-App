import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { Component } from "react";

class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: "form",
			newPaletteName: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.showEmojiPicker = this.showEmojiPicker.bind(this);
		this.savePalette = this.savePalette.bind(this);
	}

	componentDidMount() {
		ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	showEmojiPicker() {
		this.setState({
			stage: "emoji"
		});
	}
	savePalette(emoji) {
		const newPalette = {
			paletteName: this.state.newPaletteName,
			emoji: emoji.native
		};
		this.props.handleSubmit(newPalette);
	}

	render() {
		const { newPaletteName, stage } = this.state;
		const { hideForm } = this.props;
		return (
			<div>
				<Dialog open={stage === "emoji"} onClose={hideForm}>
					<DialogTitle id='form-dialog-title'>
						Choose a Palette Emoji
					</DialogTitle>
					<Picker onSelect={this.savePalette} title='Pick a palette emoji' />
				</Dialog>
				<Dialog
					onClose={hideForm}
					open={stage === "form"}
					aria-labelledby='form-dialog-title'
				>
					<DialogTitle id='form-dialog-title'>
						Choose a Palette Name
					</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>
								Please enter a name for your new beautiful palette. Make sure
								it's unique !
							</DialogContentText>

							<TextValidator
								value={newPaletteName}
								label='Palette Name'
								onChange={this.handleChange}
								fullWidth
								margin='normal'
								name='newPaletteName'
								validators={[ "required", "isPaletteNameUnique" ]}
								errorMessages={[ "Enter a Palette Name", "Name already used" ]}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={hideForm} color='primary'>
								Cancel
							</Button>
							<Button type='submit' variant='contained' color='primary'>
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}

export default PaletteMetaForm;
