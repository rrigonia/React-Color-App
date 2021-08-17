import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withRouter } from "react-router";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/core";

import "./ColorBox.css";

const styles = {
	colorBox   : {
		width            : "20%",
		height           : props => (props.showingFullPalette ? "25%" : "50%"),
		margin           : "0 auto",
		display          : "inline-block",
		cursor           : "pointer",
		position         : "relative",
		marginBottom     : "-4px",
		"&:hover button" : {
			opacity    : 1,
			transition : "0.5s"
		}
	},
	copyText   : {
		color : props =>
			chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,0.5)" : "white"
	},
	colorName  : {
		color : props =>
			chroma(props.background).luminance() <= 0.1 ? "white" : "black"
	},
	seeMore    : {
		color           : props =>
			chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,0.5)" : "white",
		position        : "absolute",
		border          : "none",
		bottom          : "0%",
		right           : "0%",
		backgroundColor : "rgba(255, 255, 255, 0.3)",
		width           : "60px",
		height          : "30px",
		textAlign       : "center",
		lineHeight      : "30px",
		textTransform   : "uppercase"
	},
	copyButton : {
		color           : props =>
			chroma(props.background).luminance() >= 0.6 ? "rgba(0,0,0,0.5)" : "white",
		display         : "inline-block",
		width           : "100px",
		height          : "30px",
		position        : "absolute",
		top             : "50%",
		left            : "50%",
		marginTop       : "-15px",
		marginLeft      : "-50px",
		backgroundColor : "rgba(255, 255, 255, 0.3)",
		textAlign       : "center",
		outline         : "none",
		fontSize        : "1rem",
		textTransform   : "uppercase",
		lineHeight      : "30px",
		border          : "none",
		cursor          : "pointer",
		opacity         : 0
	}
};

class ColorBox extends Component {
	constructor(props) {
		super(props);
		this.state = { copied: false };
		this.changeCopyState = this.changeCopyState.bind(this);
		this.goToMore = this.goToMore.bind(this);
	}
	changeCopyState() {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 1500);
		});
	}
	goToMore(e) {
		e.stopPropagation();
		this.props.history.push(`/palettes/${this.props.palette}/${this.props.id}`);
	}
	render() {
		const { name, background, showingFullPalette, classes } = this.props;
		const { copied } = this.state;

		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div className={classes.colorBox} style={{ background }}>
					<div
						style={{ background }}
						className={`copy-overlay ${copied && "show"}`}
					/>
					<div className={`copy-msg ${copied && "show"}`}>
						<h1>Copied!</h1>
						<p className={classes.copyText}>{background}</p>
					</div>
					<div className="copy-container">
						<div className="box-content">
							<span className={classes.colorName}>{name}</span>
						</div>
						<button className={classes.copyButton}>Copy</button>
					</div>
					{showingFullPalette && (
						<span onClick={this.goToMore} className={classes.seeMore}>
							More
						</span>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default withRouter(withStyles(styles)(ColorBox));
