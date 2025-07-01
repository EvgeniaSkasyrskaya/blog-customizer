import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type FormSubmitFunction = { onSubmit: (params: ArticleStateType) => void };

export const ArticleParamsForm = (props: FormSubmitFunction) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [params, setParams] = useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const clearParams = () => {
		setParams(defaultArticleState);
		props.onSubmit(defaultArticleState);
		setIsMenuOpen(false);
	};

	const applyParams = (e: React.FormEvent) => {
		e.preventDefault();
		props.onSubmit(params);
		setIsMenuOpen(false);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => {
			setIsMenuOpen(!isMenuOpen);
		},
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={applyParams}
					style={{ gap: 50 }}>
					<Text size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						selected={params.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) =>
							setParams({ ...params, fontFamilyOption: selected })
						}
						title={'шрифт'}
					/>
					<RadioGroup
						name={'fontSize'}
						selected={params.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected) =>
							setParams({ ...params, fontSizeOption: selected })
						}
						title={'размер шрифта'}
					/>
					<Select
						selected={params.fontColor}
						options={fontColors}
						onChange={(selected) =>
							setParams({ ...params, fontColor: selected })
						}
						title={'цвет шрифта'}
					/>
					<Separator />
					<Select
						selected={params.backgroundColor}
						options={backgroundColors}
						onChange={(selected) =>
							setParams({ ...params, backgroundColor: selected })
						}
						title={'цвет фона'}
					/>
					<Select
						selected={params.contentWidth}
						options={contentWidthArr}
						onChange={(selected) =>
							setParams({ ...params, contentWidth: selected })
						}
						title={'ширина'}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={clearParams}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
