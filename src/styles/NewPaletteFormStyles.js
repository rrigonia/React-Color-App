import {DRAWER_WIDTH} from "../constants";
import sizes from "./sizes";
const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
	root: {
		display: "flex",
		// minHeight: "100vh"
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		display: "flex",
		alignItems: "center",
		[sizes.down("sm")]: {
			width: "100%"
		}
		
	},
	drawerHeader: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
		justifyContent: "flex-end"
	},
	content: {
		flexGrow: 1,
		height: "calc(100vh - 64px)",
		padding: 0,
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},
	container: {
		width: "90%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		[sizes.down("sm")]: {
			width: "80%",
			maxHeight: "100vh"
		}

	},
	buttons: {
		width: "100%"
	},
	button: {
		width: "50%"
	},
});

export default styles;