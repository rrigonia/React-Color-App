import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/core";
import styles from "./styles/PaletteListStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export class PaletteList extends Component {
	goToPalette(id) {
		this.props.history.push(`/palettes/${id}`);
	}
	render() {
		const { palettes, classes, deletePalette } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React Colors</h1>
						<Link to='/palettes/new'> Create Palette</Link>
					</nav>
					<TransitionGroup className={classes.palettes}>
						{palettes.map(p => (
							<CSSTransition key={p.id} classNames='fade' timeout={500}>
								<MiniPalette
									deletePalette={deletePalette}
									key={p.id}
									{...p}
									handleClick={() => this.goToPalette(p.id)}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
