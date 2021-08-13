import React from "react";
import { withStyles } from "@material-ui/core";

const styles = {
	main      : {
		backgroundColor : "purple",
		border          : "3px solid teal",
		"& h1"          : {
			color    : "white",
			fontSize : "1.3rem"
		}
	},
	secondary : {
		backgroundColor : "pink"
	}
};

function MiniPalette(props) {
	const { classes } = props;
	// console.log(classes)
	return (
		<div className={classes.main}>
			<h1>Mini Palette</h1>
			<section className={classes.secondary}> Im a sjdlkhashdasd</section>
		</div>
	);
}

export default withStyles(styles)(MiniPalette);
