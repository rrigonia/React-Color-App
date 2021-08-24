import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";
import {
	CssBaseline,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button
} from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import PaletteMetaForm from "./PaletteMetaForm";
import styles from "./styles/PaletteFormNavStyles"

class PaletteFormNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newPaletteName: "",
			formShowing: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.showForm = this.showForm.bind(this);
		this.hideForm = this.hideForm.bind(this);
	}
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	showForm() {
		this.setState({
			formShowing: true
		});
	}
	hideForm() {
		this.setState({
			formShowing: false
		});
	}
	render() {
		const { classes, open, palettes, handleSubmit } = this.props;
		const { formShowing } = this.state;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					color='default'
					position='fixed'
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar disableGutters={!open}>
						<IconButton
							color='inherit'
							aria-label='Open drawer'
							onClick={this.props.handleDrawerOpen}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<AddToPhotosIcon />
						</IconButton>
						<Typography variant='h6' color='inherit' noWrap>
							Create a Palette
						</Typography>
					</Toolbar>
					<div classNamme={classes.navBtns}>
						<Link to='/' className={classes.link}>
							<Button
								className={classes.button}
								variant='contained'
								color='secondary'
							>
								Go Back
							</Button>
						</Link>
						<Button
							className={classes.button}
							variant='contained'
							color='primary'
							onClick={this.showForm}
						>
							SavePalette
						</Button>
					</div>
				</AppBar>
				{formShowing && (
					<PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm} />
				)}
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
