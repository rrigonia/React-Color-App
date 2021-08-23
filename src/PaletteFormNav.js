import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
	CssBaseline,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 400;


const styles = theme => ({
	root: {
		display: "flex",
	},
	appBar       : {
		transition : theme.transitions.create([ "margin", "width" ], {
			easing   : theme.transitions.easing.sharp,
			duration : theme.transitions.duration.leavingScreen
		}),
		flexDirection: "row",
		justifyContent: "space-between",
		hight: "64px"
	},
	appBarShift  : {
		width      : `calc(100% - ${drawerWidth}px)`,
		marginLeft : drawerWidth,
		transition : theme.transitions.create([ "margin", "width" ], {
			easing   : theme.transitions.easing.easeOut,
			duration : theme.transitions.duration.enteringScreen
		})
	},
	menuButton   : {
		marginLeft  : 12,
		marginRight : 20
	},
	hide         : {
		display : "none"
	},
	navBtns: {

	}
})

class PaletteFormNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newPaletteName : ""
		};
        this.handleChange = this.handleChange.bind(this);
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
	render() {
		const { classes, open } = this.props;
        const { newPaletteName} = this.state
		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					color="default"
					position="fixed"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open
					})}
				>
					<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.props.handleDrawerOpen}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Create a Palette
						</Typography>
					</Toolbar>
						<div classNamme={classes.navBtns}>
							<ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
								<TextValidator
									value={newPaletteName}
									label="Palette Name"
									onChange={this.handleChange}
									name="newPaletteName"
									validators={[ "required", "isPaletteNameUnique" ]}
									errorMessages={[ "Enter a Palette Name", "Name already used" ]}
								/>
								<Button type="submit" variant="contained" color="primary">
									Save Palette
								</Button>
							</ValidatorForm>
								<Link to="/">
									<Button variant="contained" color="secondary">
										Go Back
									</Button>
								</Link>
						</div>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
