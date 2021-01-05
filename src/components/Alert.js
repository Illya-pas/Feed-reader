import React from 'react'

export const Alert = ({alertText}) => (
	<div className="alert alert-warning" role="alert">
	  {alertText}
	</div>
)