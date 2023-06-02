import { useState, useEffect, useContext } from 'react';
import { ButtonClose } from '../../ui/ButtonClose';
import { $api } from '../../../api/api';
import { DataContext } from '../../../context/DataContext';
import { useTranslation } from 'react-i18next';

const ReviewsForm = () => {
    const [open, setOpen] = useState(false);
    const [classN, setClassN] = useState('reviews__modal-exit')
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
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
        await addComment({ name, comment })
        setOpen(false)
        setComment('')
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
                            <input type="text"
                                placeholder={t('reviews.name') as string}
                                className='reviews__modal-content_input'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input type="text"
                                placeholder={t('reviews.comment') as string}
                                className='reviews__modal-content_input'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
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
