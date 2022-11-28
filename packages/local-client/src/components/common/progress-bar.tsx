import React from "react";
import './progress-bar.css';

export const ProgressBar: React.FC = () => {
  return (
		  <div className="progress-wrapper">
			  <div className='progress-cover'>
				  <progress className="progress is-small is-primary" max="100">
					  Loading
				  </progress>
			  </div>
		  </div>
  )
};
