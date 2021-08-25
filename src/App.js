import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import Page from "./Page";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelpers";

class App extends Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
		this.state = {
			palettes: savedPalettes || seedColors
		};
		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}

	findPalette(id) {
		return this.state.palettes.find(palette => palette.id === id);
	}
	savePalette(newPalette) {
		this.setState(
			{
				palettes: [ ...this.state.palettes, newPalette ]
			},
			this.syncLocalStorage
		);
	}
	syncLocalStorage() {
		window.localStorage.setItem(
			"palettes",
			JSON.stringify(this.state.palettes)
		);
	}
	deletePalette(id) {
		this.setState(
			st => ({ palettes: st.palettes.filter(p => p.id !== id) }),
			this.syncLocalStorage
		);
	}
	render() {
		const { palettes } = this.state;
		return (
			<Route
				render={({ location }) => (
					<TransitionGroup>
						<CSSTransition key={location.key} classNames='page' timeout={500}>
							<Switch location={location}>
								<Route
									exact
									path='/'
									render={routerProps => (
										<Page>
											<PaletteList
												palettes={palettes}
												{...routerProps}
												deletePalette={this.deletePalette}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/palettes/new'
									render={routerProps => (
										<Page>
											<NewPaletteForm
												{...routerProps}
												palettes={palettes}
												savePalette={this.savePalette}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/palettes/:id'
									render={routerProps => (
										<Page>
											<Palette
												palette={generatePalette(
													this.findPalette(routerProps.match.params.id)
												)}
												{...routerProps}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path='/palettes/:paletteId/:colorId'
									render={routerProps => (
										<Page>
											<SingleColorPalette
												{...routerProps}
												palette={generatePalette(
													this.findPalette(routerProps.match.params.paletteId)
												)}
												colorId={routerProps.match.params.colorId}
											/>
										</Page>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>
		);
	}
}

export default App;
