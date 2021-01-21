import React from 'react'

export const Loader = ({size}) => (
	<div className="spinner-border text-primary" style={{'height':size, 'width':size}} role="status">
	  <span className="sr-only">Loading...</span>
	</div>
)