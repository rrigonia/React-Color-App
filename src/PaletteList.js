import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/core";
import styles from "./styles/PaletteListStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { blue, red } from "@material-ui/core/colors";

export class PaletteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDeleteDialog: false,
			deleteingId: ""
		};
		this.openDialog = this.openDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	openDialog(id) {
		this.setState({ openDeleteDialog: true, deleteingId: id });
	}

	closeDialog() {
		this.setState({ openDeleteDialog: false, deleteingId: "" });
	}

	goToPalette(id) {
		this.props.history.push(`/palettes/${id}`);
	}
	handleDelete() {
		this.props.deletePalette(this.state.deleteingId);
		this.closeDialog();
	}

	render() {
		const { palettes, classes, deletePalette } = this.props;
		const { openDeleteDialog } = this.state;

		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>React Colors</h1>
						<Link to='/palettes/new'> Create Palette</Link>
					</nav>
					<TransitionGroup className={classes.palettes}>
						{palettes.map(p => (
							<CSSTransition key={p.id} classNames='fade' timeout={500}>
								<MiniPalette
									// deletePalette={deletePalette}
									key={p.id}
									{...p}
									handleClick={() => this.goToPalette(p.id)}
									openDialog={this.openDialog}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<Dialog
					open={openDeleteDialog}
					aria-labelledby='delete-dialog-title'
					onClose={this.closeDialog}
				>
					<DialogTitle id='delete-dialog-title'>
						Delete this Palette
					</DialogTitle>
					<List>
						<ListItem onClick={this.handleDelete} button>
							<ListItemAvatar>
								<Avatar
									style={{ backgroundColor: blue[100], color: blue[600] }}
								>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary='Delete' />
						</ListItem>
						<ListItem onClick={this.closeDialog} button>
							<ListItemAvatar>
								<Avatar style={{ backgroundColor: red[100], color: red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary='Cancel' />
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
