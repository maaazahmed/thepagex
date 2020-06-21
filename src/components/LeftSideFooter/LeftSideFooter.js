import React from 'react';
import styled from 'styled-components';

const LeftSideFooter = () => {
	const StyledLoginFooter = styled.div`
		background-color: inherit;
		max-width: inherit;
		box-sizing: border-box;
		margin-top:4rem;
	`;

	const StyledUl = styled.ul`
		display: flex;
		line-height: 30px;
		margin-bottom: 0px;
		text-align: left;
		padding-left: 0;
	`;

	const StyledLi = styled.li`
		display: inline-flex;
		list-style: none;
		padding-right: 15px;
	`;

	const StyledAnchr = styled.a`
		color: gray;
	`;

	const StyledAnchrSpan = styled.span`
		color: gray;
		text-decoration:none;
	`;

	return (
		<StyledLoginFooter>
			<StyledUl>
				<StyledLi>
					<StyledAnchr
						href='https://sites.google.com/view/pagex-privacy-policy/home'
						rel='noopener noreferrer'
						target='_blank'
					>
						Privacy
					</StyledAnchr>
				</StyledLi>
				<StyledLi>
					<StyledAnchr
						href='https://sites.google.com/view/terms-of-use-page-x/home'
						rel='noopener noreferrer'
						target='_blank'
					>
						Terms
					</StyledAnchr>
				</StyledLi>
			</StyledUl>

			<StyledUl>
				<StyledLi>
					<StyledAnchrSpan href='#' rel='noopener noreferrer'>
						© 2020 PageX, Inc
					</StyledAnchrSpan>
				</StyledLi>
			</StyledUl>
		</StyledLoginFooter>
	);
};

export default LeftSideFooter;
