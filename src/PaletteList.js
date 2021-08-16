import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/core";

const styles = {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignitems: "flex-start",

    },
    nav: {
        display: "flex",
        width: "100%",
        jusitfyContent: "space-between",
        color: "white"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"
    }
}

export class PaletteList extends Component {
	render() {
		const { palettes, classes } = this.props;
		const miniPalettes = palettes.map(p => <MiniPalette key={p.id} {...p} />);

		return (
			<div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
				        <h1>Color Palettes</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {miniPalettes}
                    </div>
                </div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList); 