import React from "react"
import Downshift from 'downshift'


function Selector({options, onChange}){
    return(
        <Downshift
            onChange={onChange}
            itemToString={item => (item.description ? item.description.en : '')}
        >
            {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            getRootProps,
            }) => (
            <div>
                <label {...getLabelProps()}>Select a vote by typing some text into the box below:</label>
                <div
                style={{display: 'inline-block'}}
                {...getRootProps({}, {suppressRefError: true})}
                >
                <input {...getInputProps()} />
                </div>
                <ul{...getMenuProps}>
                {isOpen
                    ? options
                        .filter(item => !inputValue || item.description.en.includes(inputValue))
                        .map((item, index) => (
                        <li
                            {...getItemProps({
                            key: index,
                            index,
                            item,
                            style: {
                                backgroundColor:
                                highlightedIndex === index ? 'lightgray' : 'white',
                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                            },
                            })}
                        >
                            {item.description.en}
                        </li>
                        ))
                    : null}
                </ul>
            </div>
            )}
        </Downshift>
    )
}


export default Selector;
