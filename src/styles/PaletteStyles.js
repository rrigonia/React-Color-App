const styles =  {
	Palette: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
	},
	Colors: {
		height: "90%"
	},
	goBack: {
		width            : "20%",
		height           :  "50%",
		margin           : "0 auto",
		display          : "inline-block",
		cursor           : "pointer",
		position         : "relative",
		marginBottom     : "-4px",
		opacity: 1,
		backgroundColor: "black",
		"& button":{
			display: "inline-block",
			width: "100px",
			height: "30px",
			position: "absolute",
			top: "50%",
			left: "50%",
			marginTop: "-15px",
			marginLeft: "-50px",
			backgroundColor: "rgba(255, 255, 255, 0.3)",
			color: "white",
			textAlign: "center",
			outline: "none",
			fontSize: "1rem",
			textTransform: "uppercase",
			lineHeight: "30px",
			border: "none",
			cursor: "pointer",
		}
	}
};

export default styles ;
