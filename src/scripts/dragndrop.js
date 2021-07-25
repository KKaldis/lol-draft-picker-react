import React from 'react'


const DragAble = (props) => {

  const dragStart = e => {


    e.dataTransfer.setData('card_id', e.target.id);
    /*  setTimeout(() => {
        e.target.style.display = "none"
      }, 0);*/
  }

  const dragOver = e => {
    e.stopPropagation();
  }

  return (

    <div
      id={props.id}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}>

      {props.children}
    </div>
  )
}

const DropAble = (props) => {
  const drop = e => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData('card_id');

    const card = document.getElementById(card_id);
    card.style.display = "block";
    e.target.appendChild(card);
  }

  const dragOver = e => {
    e.preventDefault();
  }

  return (

    <div
      id={props.id}
      className={props.className}
      onDrop={drop}
      onDragOver={dragOver}>

      {props.children}
    </div>
  )
}

export { DropAble, DragAble }
