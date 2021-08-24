import React from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@material-ui/icons/Delete";
import { Component } from "react";

class MiniPalette extends Component {
	constructor(props){
		super(props);
		this.handleDeletePalette = this.handleDeletePalette.bind(this);
	}
	handleDeletePalette(e){
		e.stopPropagation();
		this.props.deletePalette(this.props.id)
	}
	render() {
		const { classes, paletteName, emoji, colors, handleClick } = this.props;
		const miniColorBoxes = colors.map(color => (
			<div
				className={classes.miniColor}
				style={{ backgroundColor: color.color }}
				key={color.name}
			/>
		));
		return (
			<div className={classes.root} onClick={handleClick}>
				<DeleteIcon
					className={classes.deleteIcon}
					style={{ transition: "all 0.3s ease-in-out" }}
					onClick={this.handleDeletePalette}
				/>
				<div className={classes.colors}>{miniColorBoxes}</div>
				<h5 className={classes.title}>
					{paletteName} <span className={classes.emoji}>{emoji}</span>
				</h5>
			</div>
		);
	}
}

export default withStyles(styles)(MiniPalette);
