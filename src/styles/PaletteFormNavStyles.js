import { DRAWER_WIDTH } from "../constants";
import sizes from "./sizes"
const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
	root: {
		display: "flex"
	},
	appBar: {
		transition: theme.transitions.create([ "margin", "width" ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		flexDirection: "row",
		justifyContent: "space-between",
		height: "64px",
		alignItems: "center",
		[sizes.down("xs")]: {
			height: "55px"
		}
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create([ "margin", "width" ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	hide: {
		display: "none"
	},
	navBtns: {
		marginRight: "1rem",
		[sizes.down("xs")]: {
			marginRight: "0.5rem"
		}
	},
	button: {
		margin: "0 0.5rem",
		[sizes.down("xs")]: {
			margin: "0 0.2rem",
			fontSize: "0.8rem",
			padding: "0.3rem"
		}
	},
	link: {
		textDecoration: "none"
	}
});

export default styles