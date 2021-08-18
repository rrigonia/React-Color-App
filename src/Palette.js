import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/core";
import styles from "./styles/PaletteStyles";

class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = { level: 500, format: 'hex', open: false };
		this.changeLevel = this.changeLevel.bind(this);
		this.changeFormat = this.changeFormat.bind(this);
		this.closeSnackBar = this.closeSnackBar.bind(this);
	}
	changeLevel(level) {
		this.setState({ level });
	}
	changeFormat(e){
		this.setState({format: e.target.value, open: true})
		// alert(e.target.value)
	}
	closeSnackBar(){
		this.setState({open: false});
	}
	render() {
		const { colors, paletteName, emoji,id } = this.props.palette;
		const {classes} = this.props
		const { level, format, open } = this.state;
		const colorBoxes = colors[level].map(color => (
			<ColorBox key={color.id} background={color.[format]} name={color.name} palette={id} id={color.id} showingFullPalette={true} />
		));
		return (
			<div className={classes.Palette}>
				<Navbar 
					open={open} 
					format={format} 
					level={level} 
					changeLevel={this.changeLevel} 
					handleChange={this.changeFormat} 
					closeSnackBar={this.closeSnackBar}
					showSlider={true} 
				/>
				<div className={classes.Colors}>{colorBoxes}</div>
				<PaletteFooter paletteName={paletteName} emoji={emoji} />
			</div>
		);
	}
}

export default withStyles(styles)(Palette);
