import React, { Component } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withRouter } from "react-router";
import chroma from "chroma-js";

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
		const { name, background, showLink } = this.props;
		const { copied } = this.state;
		const isDarkColor = chroma(background).luminance() <= 0.1;
		const isLightColor = chroma(background).luminance() >= 0.6;

		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div className="ColorBox" style={{ background }}>
					<div
						style={{ background }}
						className={`copy-overlay ${copied && "show"}`}
					/>
					<div className={`copy-msg ${copied && "show"}`}>
						<h1 className={isLightColor ? "dark-text" : undefined}>Copied!</h1>
						<p className={isLightColor ? "dark-text" : undefined}>
							{background}
						</p>
					</div>
					<div className="copy-container">
						<div className="box-content">
							<span className={isDarkColor ? "light-text" : undefined}>
								{name}
							</span>
						</div>
						<button className={`copy-button ${isLightColor ? "dark-text" : undefined}`}>Copy</button>
					</div>
					{showLink && (
						<span
							onClick={this.goToMore}
							className={`see-more ${isLightColor ? "dark-text" : undefined}`}
						>
							More
						</span>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default withRouter(ColorBox);
