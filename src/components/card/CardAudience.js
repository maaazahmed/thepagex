import React, { Component } from 'react';
import styled from 'styled-components';

import { getImageFullUrl } from '../../Utils/utils';

const Wrapper = styled.div`
	width: 10%;

	.card-audience-photo {
		max-width: 100%;
		height: auto;
	}
	h6 {
		width: 100%;
		text-align: center;
		font-weight: bold;
		font-size: 0.9rem;
		margin: 5px 0;
	}
`;

const StyledImg = styled.img`
	border-radius: 12px;
	margin-bottom: 5px;
`;

class CardAudience extends Component {
	render() {
		return (
			<Wrapper>
				<div>
					{/* <div
						className='image'
						style={{
							backgroundImage: `url(${getImageFullUrl(this.props.photo)})`,
						}}
					/> */}
					<StyledImg
						className='card-audience-photo'
						src={getImageFullUrl(this.props.photo)}
						alt='profile'
					/>
				</div>
				<h6>{this.props.user}</h6>
			</Wrapper>
		);
	}
}

export default CardAudience;
