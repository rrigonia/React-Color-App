import React, { Component } from "react";
import {Link} from "react-router-dom";
import { IconButton, Snackbar, MenuItem, Select, withStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "rc-slider";

import styles from "./styles/NavbarStyles";
import "rc-slider/assets/index.css";

class Navbar extends Component {
	render() {
		const {
			level,
			changeLevel,
			format,
			handleChange,
			closeSnackBar,
			open,
			showSlider,
			classes
		} = this.props;

		return (
			<header className={classes.Navbar}>
				<div className={classes.logo}>
					<Link to="/">reactcolorpicker</Link>
				</div>
				{showSlider && (
					<div>
					<span>Level: {level} </span>
					<div className={classes.slider}>
						<Slider
							defaultValue={level}
							min={100}
							max={900}
							step={100}
							onAfterChange={changeLevel}
						/>
					</div>
				</div>
				)}
				<div className={classes.selectContainer}>
					<Select value={format} onChange={handleChange}>
						<MenuItem value="hex">HEX - #ffffff</MenuItem>
						<MenuItem value="rgb">RGB - rgb 255,255,255 </MenuItem>
						<MenuItem value="rgba">RGBA - rgb 255,255,255,1.0 </MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					open={open}
					autoHideDuration={3000}
					message={
						<span className="message-id">
							Format Changed To {format.toUpperCase()}
						</span>
					}
					ContentProps={{
						"aria-describedby" : "message-id"
					}}
                    onClose={closeSnackBar}
					action={[
						<IconButton
							onClick={closeSnackBar}
							color="inherit"
							key="close"
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</header>
		);
	}
}

export default withStyles(styles)(Navbar);
