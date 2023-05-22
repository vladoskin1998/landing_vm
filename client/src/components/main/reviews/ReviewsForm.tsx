import { useState, useEffect } from 'react';
import { ButtonClose } from '../../ui/ButtonClose';

const ReviewsForm = () => {
    const [open, setOpen] = useState(false);
    const [classN, setClassN] = useState('reviews__modal-exit')

    useEffect(() => {
        if (!open) {
            setClassN('reviews__modal-exit')
        }
        else {
            setClassN("reviews__modal-enter")
        }
    }, [open]);
    return (
        <>
            <button className='reviews__button' onClick={() => setOpen(true)}>Leave a review</button>
            {open && (
                <div className={`reviews__modal ${classN}`}>
                    <div className="reviews__modal-content">
                        <ButtonClose onClick={() => setOpen(false)} />

                        <div className="reviews__modal-content_body">
                            <input type="text" placeholder='Your name' className='reviews__modal-content_input' />
                            <input type="text" placeholder='Your review' className='reviews__modal-content_input' />
                            <button className='reviews__button reviews__modal-content-ok'>Ok</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewsForm;
