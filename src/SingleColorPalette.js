import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

class SingleColorPalette extends Component {
	constructor(props) {
		super(props);
		this._shades = this.gatherShades(this.props.palette, this.props.colorId);
		this.state = { format: "hex", open: false };
		this.changeFormat = this.changeFormat.bind(this);
		this.closeSnackBar = this.closeSnackBar.bind(this);
	}
	gatherShades(palette, colorToFilterBy) {
		let shades = [];
		let allColors = palette.colors;
		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter(color => color.id === colorToFilterBy)
			);
		}
		return shades.slice(1);
	}
	changeFormat(e) {
		this.setState({ format: e.target.value, open: true });
	}
	closeSnackBar() {
		this.setState({ open: false });
	}
	render() {
		const { open, format } = this.state;
		const { palette, history, classes } = this.props;
		const colorBoxes = this._shades.map(color => (
			<ColorBox 
				key={color.name} 
				name={color.name} 
				background={color.[format]} 
				showingFullPalette={false} />
		));

		return (
			<div className={classes.Palette}>
				<Navbar
					open={open}
					format={format}
					handleChange={this.changeFormat}
					closeSnackBar={this.closeSnackBar}
					showSlider={false}
				/>
				<div className={classes.Colors}>
					{colorBoxes}
					<div className={classes.goBack}>
						<button onClick={history.goBack}>GO BACK</button>
					</div>
				</div>
				<PaletteFooter
					paletteName={palette.paletteName}
					emoji={palette.emoji}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(SingleColorPalette);
