import { useState, useEffect, useContext } from 'react';
import { ButtonClose } from '../../ui/ButtonClose';
import { DataContext } from '../../../context/DataContext';
import { useTranslation } from 'react-i18next';

const ReviewsForm = () => {

    const [open, setOpen] = useState(false);
    const [classN, setClassN] = useState('reviews__modal-exit')
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')

    const [alertName, setAlertName] = useState(false)
    const [alertComment, setAlertComment] = useState(false)

    const { t } = useTranslation();
    const { addComment } = useContext(DataContext)

    useEffect(() => {
        if (!open) {
            setClassN('reviews__modal-exit')
        }
        else {
            setClassN("reviews__modal-enter")
        }
    }, [open]);

    const handlerAddComment = async () => {
        if (!name || !comment) {
            return
        }
        await addComment({ name, comment })
        setOpen(false)
        setComment('')
    }

    const handlerChangeName = (s: string) => {
        setAlertName(!s.length)
        setName(s)
    }

    const handlerChangeComment = (s: string) => {
        setAlertComment(!s.length)
        setComment(s)
    }

    return (
        <>
            <button className='reviews__button' onClick={() => setOpen(true)}>
                {t('reviews.leavereview')}
            </button>
            {open && (
                <div className={`reviews__modal ${classN}`}>
                    <div className="reviews__modal-content">
                        <ButtonClose onClick={() => setOpen(false)} />
                        <div className="reviews__modal-content_body">
                            <div className="reviews__modal-content_input-wrap">
                                <input type="text"
                                    placeholder={t('reviews.name') as string}
                                    className='reviews__modal-content_input'
                                    value={name}
                                    onChange={(e) => handlerChangeName(e.target.value)}
                                />
                                <h4 className="reviews__modal-content_input--alert">{alertName ? t('reviews.alert-name') : ""}</h4>
                            </div>
                            <div className="reviews__modal-content_input-wrap">
                                <textarea rows={4}
                                maxLength={200}
                                    placeholder={t('reviews.comment') as string}
                                    className='reviews__modal-content_input reviews__modal-content_textarea'
                                    value={comment}
                                    onChange={(e) => handlerChangeComment(e.target.value)}
                                />
                                <h4 className="reviews__modal-content_textarea--alert">{alertComment ? t('reviews.alert-comment') : ""}</h4>
                            </div>
                            <button className='reviews__button reviews__modal-content-ok'
                                onClick={handlerAddComment}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewsForm;
