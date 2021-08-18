import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/core";
import styles from "./styles/PaletteListStyles";


export class PaletteList extends Component {
    
    goToPalette(id){
        this.props.history.push(`/palettes/${id}`)
    }
	render() {
		const { palettes, classes } = this.props;
		const miniPalettes = palettes.map(p => <MiniPalette key={p.id} {...p} handleClick={() => this.goToPalette(p.id)} />);

		return (
			<div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
				        <h1>React Colors</h1>
                        <Link to="/palettes/new"> Create Palette</Link>
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