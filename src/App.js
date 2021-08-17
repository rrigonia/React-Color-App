import Palette from "./Palette";
import seedColors from "./seedColors";
import { generatePalette } from "./ColorHelpers";
import { Switch, Route, NavLink } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";

function findPalette(id) {
	return seedColors.find(palette => palette.id === id);
}
function findColor(pId, cId) {
	const palette = seedColors.find(palette => palette.id === pId);
	return palette.colors.find(color => color.name.toLowerCase() === cId);
}

function App() {
	return (
		<div>
			<Switch>
				<Route
					exact
					path="/"
					render={routerProps => (
						<PaletteList palettes={seedColors} {...routerProps} />
					)}
				/>
				<Route
					exact
					path="/palettes/:id"
					render={routerProps => (
						<Palette
							palette={generatePalette(
								findPalette(routerProps.match.params.id)
							)}
							{...routerProps}
						/>
					)}
				/>
				<Route
					exact
					path="/palettes/:paletteId/:colorId"
					render={routerProps => (
						<SingleColorPalette
							{...routerProps}
							palette={generatePalette(findPalette(routerProps.match.params.paletteId))}
							// color={findColor(routerProps.match.params.paletteId,routerProps.match.params.colorId)}
						/>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
