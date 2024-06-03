import React from 'react'

export const Card = ({ title, description, date, tag }) => {
  return (
    <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <span>{tag}</span>
        <span>{date}</span>
    </div>
  )
}
