import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
	Drawer,
	CssBaseline,
	AppBar,
	Toolbar,
	Typography,
	Divider,
	IconButton,
	Button
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import DraggableColorBox from "./DraggableColorBox";

const drawerWidth = 400;

const styles = theme => ({
	root         : {
		display : "flex"
	},
	appBar       : {
		transition : theme.transitions.create([ "margin", "width" ], {
			easing   : theme.transitions.easing.sharp,
			duration : theme.transitions.duration.leavingScreen
		})
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
	drawer       : {
		width      : drawerWidth,
		flexShrink : 0
	},
	drawerPaper  : {
		width : drawerWidth
	},
	drawerHeader : {
		display        : "flex",
		alignItems     : "center",
		padding        : "0 8px",
		...theme.mixins.toolbar,
		justifyContent : "flex-end"
	},
	content      : {
		flexGrow   : 1,
		height     : "calc(100vh - 64px)",
		padding    : theme.spacing(3),
		transition : theme.transitions.create("margin", {
			easing   : theme.transitions.easing.sharp,
			duration : theme.transitions.duration.leavingScreen
		}),
		marginLeft : -drawerWidth
	},
	contentShift : {
		transition : theme.transitions.create("margin", {
			easing   : theme.transitions.easing.easeOut,
			duration : theme.transitions.duration.enteringScreen
		}),
		marginLeft : 0
	}
});

class NewPaletteForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open         : true,
			currentColor : "#000000",
			colors       : [],
			newName      : ""
		};
		this.updateCurrentColor = this.updateCurrentColor.bind(this);
		this.addNewColor = this.addNewColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		ValidatorForm.addValidationRule("isColorNameUnique", value =>
			this.state.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule("isColorUnique", value =>
			this.state.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	updateCurrentColor(newColor, event) {
		this.setState({ currentColor: newColor.hex });
	}
	addNewColor(evt) {
		const newColor = {
			color : this.state.currentColor,
			name  : this.state.newName
		};
		this.setState(st => ({
			colors : [ ...st.colors, newColor ]
		}));
	}
	handleChange(evt) {
		this.setState({
			newName : evt.target.value
		});
	}
	handleSubmit(evt) {
		let newName= "New Test Palette"
		const newPalette = {
			paletteName: newName,
			id: newName.toLowerCase().replace(/ /g, "-"),
    		emoji: "🎨",
			colors: this.state.colors
		};
		this.props.savePalette(newPalette);
		this.props.history.push("/")
	}

	render() {
		const { classes } = this.props;
		const { open, newName } = this.state;

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
							onClick={this.handleDrawerOpen}
							className={classNames(classes.menuButton, open && classes.hide)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Persistent drawer
						</Typography>
						<Button
							variant="contained"
							color="primary"
							onClick={this.handleSubmit}
						>
							Save Palette
						</Button>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper : classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<Typography variant="h4">Design Your Palette</Typography>
					<div>
						<Button variant="contained" color="secondary">
							Clear Palette
						</Button>
						<Button variant="contained" color="primary">
							Random Color
						</Button>
					</div>
					<ChromePicker
						color={this.state.currentColor}
						onChangeComplete={this.updateCurrentColor}
					/>
					<ValidatorForm onSubmit={this.addNewColor}>
						<TextValidator
							value={newName}
							onChange={this.handleChange}
							validators={[ "required", "isColorNameUnique", "isColorUnique" ]}
							errorMessages={[
								"Enter a Color name",
								"Color name must be Unique",
								"Color already used"
							]}
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							style={{ backgroundColor: this.state.currentColor }}
						>
							Add Color
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />

					{this.state.colors.map(color => (
						<DraggableColorBox color={color.color} name={color.name} />
					))}
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
