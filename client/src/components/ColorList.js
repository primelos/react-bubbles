import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAith";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: { hex: "" }
  })
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    // const pallet = colors.match.params.id

    axiosWithAuth()
      .put(`colors/${colorToEdit.id}`, colorToEdit)//updateColors)
      .then(resolve => {
        colors.history.push('/protected')
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(res => {

    })
    .catch(err => console.log(err.res))
  };

  const addColor = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/colors', newColor)
      .then(res => {
        updateColors(res.data)
        setNewColor({
          color: '',
          code: { hex: '' }})
      })
      .catch(err => console.log(err))
  }
  return (
    <div className="colors-wrap">
      <p>colors</p>

      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="" />
      {/* stretch - build another form here to add a color */}
      
      <form onSubmit={addColor} >
        <input 
          type='text'
          name='color'
          placeholder='enter color'
          value={newColor.color}
          onChange={ e => setNewColor({...newColor, color: e.target.value})}
        />
        <input 
          type='text'
          name='code'
          placeholder='enter code'
          value={newColor.code.hex}
          onChange={ e => setNewColor({ ...newColor, code: { hex: e.target.value }})}
          
        />
        <button>enter</button>
      </form>
    </div>
  );
};

export default ColorList;
