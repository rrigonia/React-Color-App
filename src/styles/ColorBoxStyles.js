import chroma from "chroma-js";
import sizes from "./sizes";

const styles = {
	colorBox: {
		width: "20%",
		height: props => (props.showingFullPalette ? "25%" : "50%"),
		margin: "0 auto",
		display: "inline-block",
		cursor: "pointer",
		position: "relative",
		marginBottom: "-2px",
		"&:hover button": {
			opacity: 1,
			transition: "0.5s"
		},
		[sizes.down("lg")]: {
			width: "25%",
			height: props => (props.showingFullPalette ? "20%" : "33.3333%")
		},
		[sizes.down("md")]: {
			width: "50%",
			height: props => (props.showingFullPalette ? "10%" : "20%")
		},
		[sizes.down("xs")]: {
			width: "100%",
			height: props => (props.showingFullPalette ? "5%" : "10%")
		}
	},
	copyText: {
		color: props =>
			chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,0.5)" : "white"
	},
	colorName: {
		color: props =>
			chroma(props.background).luminance() <= 0.1 ? "white" : "black"
	},
	seeMore: {
		color: props =>
			chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,0.5)" : "white",
		position: "absolute",
		border: "none",
		bottom: "0%",
		right: "0%",
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		width: "60px",
		height: "30px",
		textAlign: "center",
		lineHeight: "30px",
		textTransform: "uppercase"
	},
	copyButton: {
		color: props =>
			chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,0.5)" : "white",
		display: "inline-block",
		width: "100px",
		height: "30px",
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: "-15px",
		marginLeft: "-50px",
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		textAlign: "center",
		outline: "none",
		fontSize: "1rem",
		textTransform: "uppercase",
		lineHeight: "30px",
		border: "none",
		cursor: "pointer",
		opacity: 0
	},
	boxContent: {
		position: "absolute",
		bottom: "0%",
		left: "0",
		width: "100%",
		padding: "10px",
		color: "black",
		letterSpacing: "1px",
		textTransform: "uppercase",
		fontSize: "12px"
	},
	copyOverlay: {
		opacity: "0",
		zIndex: "0",
		width: "100%",
		height: "100%",
		transition: "transform .6s ease-in-out",
		transform: "scale(0.1)"
	},
	showOverlay: {
		opacity: "1",
		transform: "scale(50)",
		zIndex: "10",
		position: "absolute"
	},
	copyMessage: {
		position: "fixed",
		top: "0",
		left: "0",
		bottom: "0",
		right: "0",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "4rem",
		color: "white",
		opacity: "0",
		transform: "scale(0.1)",
		"& h1": {
			textAlign: "center",
			fontWeight: "400",
			textShadow: "1px 2px black",
			backgroundColor: "rgba(255, 255, 255, 0.2)",
			width: "100%",
			marginBottom: "0",
			padding: "1rem",
			textTransform: "uppercase",
			[sizes.down("xs")]: {
				fontSize: "5rem"
			}
		},
		"& p": {
			fontSize: "2rem",
			fontWeight: "100"
		}
	},
	showMessage: {
		opacity: "1",
		transform: "scale(1)",
		zIndex: "11",
		transition: "all 0.4s ease-in-out",
		transitionDelay: "0.3s"
	}
};

export default styles;
