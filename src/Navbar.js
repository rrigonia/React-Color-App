import React, { Component } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "rc-slider";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import { IconButton } from "@material-ui/core";
import {Link} from "react-router-dom"

class Navbar extends Component {
	render() {
		const {
			level,
			changeLevel,
			format,
			handleChange,
			closeSnackBar,
			open,
			showSlider
		} = this.props;

		return (
			<header className="Navbar">
				<div className="logo">
					<Link to="/">reactcolorpicker</Link>
				</div>
				{showSlider && (
					<div className="slider-container">
					<span className="slider-level">Level: {level} </span>
					<div className="slider">
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
				<div className="select-container">
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
						"aria-describedy" : "message-id"
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

export default Navbar;
