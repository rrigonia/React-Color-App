import sizes from "./sizes"
const styles = {
	root       : {
		width        : "20%",
		height       : "25%",
		margin       : "0 auto",
		// padding: "0 -10px",
		display      : "inline-block",
		cursor       : "pointer",
		position     : "relative",
		marginBottom : "-5px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)"
        },
		[sizes.down("lg")]: {
			width: "25%",
			height: "20%"
		},
		[sizes.down("md")]: {
			width: "50%",
			height: "10%"
		},
		[sizes.down("sm")]: {
			width: "100%",
			height: "5%"
		}
	},
	boxContent : {
		position      : "absolute",
		bottom        : "0%",
		left          : "0",
		width         : "100%",
		padding       : "10px",
		color         : "rgba(0,0,0,0.5)",
		letterSpacing : "1px",
		textTransform : "uppercase",
		fontSize      : "12px",
        display: "flex",
        justifyContent: "space-between",
		alignItems: "flex-end",
		[sizes.down("sm")]: {
			padding       : "0 10px",
		},
	},
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    },
	"& span": {

	}
};

export default styles;