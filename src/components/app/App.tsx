import { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import styles from './App.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const handleFormSubmit = (params: ArticleStateType) =>
		setArticleState(params);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={handleFormSubmit} />
			<Article />
		</main>
	);
};
