import { CSSProperties, useState } from 'react';
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

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={setArticleState} />
			<Article />
		</main>
	);
};
