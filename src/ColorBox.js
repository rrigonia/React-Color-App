import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core";
import styles from "./styles/ColorBoxStyles"

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
						className={`${classes.copyOverlay} ${copied &&
							classes.showOverlay}`}
					/>
					<div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
						<h1>Copied!</h1>
						<p className={classes.copyText}>{background}</p>
					</div>
					<div>
						<div className={classes.boxContent}>
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
