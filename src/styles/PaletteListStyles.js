import sizes from "./sizes";
import bg from "./bg.svg";

const styles = {
	"@global": {
		".fade-exit": {
			opacity: 1
		},
		".fade-exit-active": {
			opacity: 0,
			transition: "opacity 500ms ease-out"
		},
	},
	root: {
		height: "100vh",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center",
		/* background by SVGBackgrounds.com */
		backgroundColor: "#5D4EFF",
		backgroundImage: `url(${bg})`,
		overflow: "auto"
	},
	container: {
		width: "50%",
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		alignItems: "flex-start",
		marginBottom: "1rem",
		[sizes.down("xl")]: {
			width: "80%"
		},
		[sizes.down("xs")]: {
			width: "70%"
		}
	},
	nav: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		color: "white",
		"& h1": {
			fontSize: "2rem",
			fontWeight: "bold",
			padding: "1rem 0"
		},
		"& a": {
			color: "white"
		}
		// color: "white"
	},
	palettes: {
		boxSizing: "border-box",
		width: "100%",
		display: "grid",
		gridTemplateColumns: "repeat(3, 30%)",
		gridGap: "2.5rem",
		[sizes.down("md")]: {
			gridTemplateColumns: "repeat(2, 50%)"
		},
		[sizes.down("xs")]: {
			gridTemplateColumns: "repeat(1, 100%)",
			gridGap: "1.4rem"
		}
	}
};

export default styles;
