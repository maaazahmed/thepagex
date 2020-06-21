import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTrendingAction, getUserArtformsAction } from '../../store/actions';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';

import LeftSideFooter from '../../components/LeftSideFooter/LeftSideFooter';

const Sidebar = ({ trending, artforms, getTrending, getUserArtforms }) => {
	//use this to check whether display sub art forms items or not.
	const [subArtFormItemsVisible, setSubArtFormItemsVisible] = useState(false);
	useEffect(() => {
		let interval = null;

		getTrending();
		getUserArtforms();

		interval = setInterval(() => {
			getTrending();
		}, 30000);

		return function cleanup() {
			clearInterval(interval);
		};
	}, [getTrending, getUserArtforms]);

	const artFormsClickHandler = () => {
		//When art forms items clicked, toggle the state and display/hide the art form items
		setSubArtFormItemsVisible((prevState) => !prevState);
	};

	// update below to chance displayed trending items
	const trendingItemsLimitationCount = 5;

	return (
		<div className={styles.sidebar}>
			<div className={styles.section}>
				<h5 className={styles.sectionTitle}>
					<Link className='sidebar-main-btn' to='/'>
						Home
					</Link>
				</h5>
				<h5 className={styles.sectionTitle}>
					<Link
						className='sidebar-main-btn'
						to='/'
						onClick={artFormsClickHandler}
					>
						Art forms
					</Link>
				</h5>
				{subArtFormItemsVisible && (
					<ul>
						{artforms.map((item) => (
							<li key={item.id}>
								<Link to={`/artform/${item.id}`}>{item.title}</Link>
							</li>
						))}
					</ul>
				)}
			</div>
			<div className={styles.section}>
				<h5 className={styles.sectionTitle}>Trending</h5>
				<ul>
					{/* applying limitation to trending items */}
					{trending.slice(0, trendingItemsLimitationCount).map((item) => (
						<li key={item}>
							<Link to={`/trending/${item}`}>{item}</Link>
						</li>
					))}
				</ul>
			</div>
			{/* <div className={styles.section}>
                <h5 className={styles.sectionTitle}>Following</h5>
                <ul>
                    <li>subject one</li>
                    <li>subject two</li>
                </ul>
            </div> */}
			<LeftSideFooter />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		trending: state.sidebar.trending,
		artforms: state.sidebar.artforms,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getTrending: () => {
			dispatch(getTrendingAction());
		},
		getUserArtforms: () => {
			dispatch(getUserArtformsAction());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
