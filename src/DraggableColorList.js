import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import {SortableContainer} from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({colors, removeColor}) => {
    return (
        <div style={{height: "100%"}}>
            {colors.map((color, i) => (
						<DraggableColorBox
							color={color.color}
							name={color.name}
							handleClick={() => removeColor(color.name)}
							key={color.name}
                            index={i}
						/>
					))}
        </div>
    )
});

export default DraggableColorList;