import '../../../style/main/reviews.scss'
import ReviewsForm from './ReviewsForm'
import ButtonMore from './ButtonMore'
import { useContext, useState } from 'react'
import { DataContext } from '../../../context/DataContext'
import { AuthContext } from '../../../context/AuthContext'
import { useTranslation } from 'react-i18next'


const Reviews = () => {

	const { listComment, deleteComment } = useContext(DataContext)
	const { isAuth } = useContext(AuthContext)
	const { t } = useTranslation();

	const [count, setCount] = useState(10)

	const handlerDeleteComment = (id: string) => {
		deleteComment(id)
	}

	const viewMore = () => {
		if (count < listComment.length) {
			setCount(s => s + 10)
		}
	}

	return (
		<div className='reviews' id='Reviews'>
			<h4 className='route--name'>{t('reviews.title')}</h4>
			<h2>{t('reviews.main')}</h2>
			<div className='reviews__list'>
				{
					listComment.slice(0, count).map((it, index) => <div className='reviews__list-item' key={index}>
						<div className='reviews__list-item_gate'>
							<span>“</span> <div />
						</div>
						<p>{it.comment}</p>
						<h6>- {it.name}</h6>
						{
							isAuth && <button className='properties__add--but'
								onClick={() => handlerDeleteComment(it._id)}
							>
								Delete comment
							</button>
						}
					</div>)
				}
				{
					count < listComment.length
						? <ButtonMore onClick={viewMore} />
						: <></>
				}

			</div>
			<h4 className='reviews__title'>{t('reviews.foot')}</h4>
			<ReviewsForm />
		</div>
	)
}

export default Reviews