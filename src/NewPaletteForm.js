import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import {
	Drawer,
	Typography,
	Divider,
	IconButton,
	Button
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";

const drawerWidth = 400;

const styles = theme => ({
	root         : {
		display : "flex"
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
	static defaultProps = {
		maxColors : 20
	};
	constructor(props) {
		super(props);
		this.state = {
			open         : true,
			currentColor : "#000000",
			colors       : this.props.palettes[0].colors,
		};
		this.addNewColor = this.addNewColor.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeColor = this.removeColor.bind(this);
		this.clearColors = this.clearColors.bind(this);
		this.addRandomColor = this.addRandomColor.bind(this);
	}

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors : arrayMove(colors, oldIndex, newIndex)
		}));
	};

	removeColor(colorName) {
		this.setState({
			colors : this.state.colors.filter(c => c.name !== colorName)
		});
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	addNewColor(newColor) {
		this.setState(st => ({
			colors : [ ...st.colors, newColor ]
		}));
	}
	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value
		});
	}
	handleSubmit(newPaletteName) {
		const newPalette = {
			paletteName : newPaletteName,
			id          : newPaletteName.toLowerCase().replace(/ /g, "-"),
			emoji       : "🎨",
			colors      : this.state.colors
		};
		this.props.savePalette(newPalette);
		this.props.history.push("/");
	}
	clearColors() {
		this.setState({ colors: [] });
	}
	addRandomColor() {
		const allColors = this.props.palettes.map(p => p.colors).flat();
		let rand = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[rand];
		this.setState({ colors: [ ...this.state.colors, randomColor ] });
		console.log(allColors);
	}

	render() {
		const { classes, maxColors, palettes } = this.props;
		const { open, colors } = this.state;
		const paletteIsFull = colors.length >= maxColors;

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					palettes={palettes}
					handleSubmit={this.handleSubmit}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
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
						<Button
							variant="contained"
							color="secondary"
							onClick={this.clearColors}
						>
							Clear Palette
						</Button>
						<Button
							onClick={this.addRandomColor}
							variant="contained"
							color="primary"
							disabled={paletteIsFull}
						>
							Random Color
						</Button>
					</div>
					<ColorPickerForm
						paletteIsFull={paletteIsFull}
						addNewColor={this.addNewColor}
						colors = {colors}
					/>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						axis="xy"
						onSortEnd={this.onSortEnd}
						colors={colors}
						removeColor={this.removeColor}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
