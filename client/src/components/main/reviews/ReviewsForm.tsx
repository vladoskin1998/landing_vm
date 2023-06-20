import { useState, useEffect, useContext } from 'react';
import { ButtonClose } from '../../ui/ButtonClose';
import { DataContext } from '../../../context/DataContext';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';

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
        return () => {
            setAlertName(false)
            setAlertComment(false)
            setComment('')
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
        setAlertName(!s.replace(/[\n\s]/g, "").length)
        setName(s)
    }

    const handlerChangeComment = (s: string) => {
        console.log(s.replace(/\n/g, "").length);
        
        setAlertComment(!s.replace(/[\n\s]/g, "").length)
        setComment(s)
    }


    console.log("comment--->", comment);
    

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
                                <TextareaAutosize className='reviews__modal-content_input reviews__modal-content_textarea'
                                    placeholder={t('reviews.comment') as string}
                                    maxLength={300}
                                    value={comment}
                                    onChange={(e) => handlerChangeComment(e.target.value)}
                                    maxRows={6}
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
