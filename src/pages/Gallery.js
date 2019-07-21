import React, { PureComponent, Fragment } from 'react';
import Helmet from 'react-helmet';
import { css } from 'glamor';

import Animated from 'components/molecules/Animated';
import TextLink from 'components/atoms/TextLink';
import ShortMarquee from 'components/molecules/Marquee/ShortMarquee';
import GalleryTemplate from 'components/molecules/Gallery/GalleryTemplate';
import Newsletter from 'components/organisms/Newsletter';
import Footer from 'components/organisms/Footer';
import PathToPicture from 'util/PathToPicture';

import { lead, textContainer, removePaddingBottom } from 'styles';

class GalleryPage extends PureComponent {
	componentWillMount() {
		const solomonsSealGroup = [
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-5'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-3'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-1'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-2'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-4'),
			},
		];

		const plantPortraits = [
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-8'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-6'),
			},
		];

		const summerGarden = [
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-9'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-10'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-11'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-12'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-13'),
			},
		];

		const fallGarden = [
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-17'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-18'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-19'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-20'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-21'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-22'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-23'),
			},
		];

		const xmas = [
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-30'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-29'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-31'),
			},
			{
				url: PathToPicture('gallery', 'community-gardens-gallery-32'),
			},
		];

		this.setState({
			solomonsSealGroup,
			plantPortraits,
			summerGarden,
			fallGarden,
			xmas,
		});
	}

	render() {
		const {
			solomonsSealGroup,
			plantPortraits,
			summerGarden,
			fallGarden,
			xmas,
		} = this.state;

		return (
			<div {...css({ background: '#efefef' })}>
				<Helmet
					title="Community Gardens Gallery"
					description="Images from Community Gardens."
				/>
				<ShortMarquee title="Gallery" subtitle="Images from the gardens" />
				<div {...textContainer} {...removePaddingBottom}>
					<Animated {...lead}>
						Because each garden is created with code, every single time a garden
						is viewed it is unique. You will never see the exact same garden
						twice.
					</Animated>
					<Animated>These are a few images captured from the gardens.</Animated>
				</div>
				<GalleryTemplate
					title="Solomon's Seal"
					body="Solomon's Seal was the first plant created for Community Gardens."
					pictures={solomonsSealGroup}
				/>
				<GalleryTemplate
					title="Plant Portraits"
					body="Plants that were exceptionally expressive are captured as they were created."
					pictures={plantPortraits}
				/>
				<GalleryTemplate
					title="Summer Gardens"
					body={
						<Fragment>
							In summer, plants have all the resources they need to thrive. The{' '}
							<TextLink to="/gardens/summer-garden" label="Summer Garden" />{' '}
							represents students who have a high level of resources. Our goal
							is that <i>all</i> student's basic needs are met.
						</Fragment>
					}
					pictures={summerGarden}
				/>
				<GalleryTemplate
					title="Winter Gardens"
					body={
						<Fragment>
							In winter, resources are scarce. Plants in the{' '}
							<TextLink to="/gardens/winter-garden" label="Winter Garden" />{' '}
							represent students who face resource scarcity.
						</Fragment>
					}
					pictures={fallGarden}
				/>
				<GalleryTemplate
					title="Xmas 2018"
					body={
						<Fragment>
							A <TextLink to="/gardens/holiday-card" label="secret garden" /> of
							holiday wreaths.
						</Fragment>
					}
					last
					pictures={xmas}
				/>
				<Newsletter />
				<Footer />
			</div>
		);
	}
}

export default GalleryPage;
