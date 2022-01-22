import React from 'react';

const AddFavourites = () => {
	return (
		<div className="favorite">
			<svg
				width='1.2em'
				height='1.2em'
				viewBox='0 0 16 16'
				class='bi bi-heart-fill'
				fill='white'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fill-rule='evenodd'
					d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
				/>
			</svg>
		</div>
	);
};

export default AddFavourites;