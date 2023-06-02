import React, { useState, useContext, useRef } from 'react';
import { AdditionalFields } from './AdditionalFields';
import { $api } from '../../../api/api';
import { firstUpperLetter } from '../../../utils/methods'
import { FilesList } from './FileList';
import { PostsTypeTag, AdditionalFieldType } from '../../../types/types';
import { AuthContext } from '../../../context/AuthContext';
import { AppContext } from '../../../context/AppContext';
import { RequiredFieldList } from './RequiredFieldList';
import { FormatImages } from '../../../utils/constants';


export const ModalAdd = ({ postTag }: { postTag: PostsTypeTag }) => {

	const { setLoader } = useContext(AppContext)
	const { setIsAuth } = useContext(AuthContext);

	const [open, setOpen] = useState(false)

	const [files, setFiles] = useState<File[]>([]);

	const [bgFiles, setBgFiles] = useState<File[]>([]);

	const [additionalFields, setAdditionalFields] = useState<AdditionalFieldType[]>([]);

	const [description, setDescription] = useState('')
	const [reqFields, setReqFields] = useState<Record<string, string>>({
		area: '',
		district: '',
		city: '',
		price: '',
	})

	const close = () => setOpen(false)

	const handleUpload = async () => {
		const formData = new FormData();

		formData.append('tag', postTag);
		
		formData.append('description', description);

		formData.append('additionalFields', JSON.stringify(additionalFields));

		for (const field in reqFields) {
			formData.append(field, reqFields[field]);
		}

		formData.append('bgFolderImages', bgFiles[0]);

		for (let i = 0; i < files.length; i++) {
			formData.append('images', files[i]);
		}

		if (
			!bgFiles.length
			|| !files.length
			|| !reqFields?.area.length
			|| !reqFields?.district.length
			|| !reqFields?.city.length
			|| !reqFields?.price.length
		) {
			alert("Fill in required fields")
			return 0
		}

		try {
			setLoader(true)
			await $api.post('posts/add-posts', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			setLoader(false)
			alert('Success upload, update site');
			close();
			window.location.reload();
		} catch (error: any) {
			if (error?.response?.status === 401) {
				setIsAuth('');
			}
			setLoader(false)
			alert(error?.response?.data?.message || 'Error occurred');
		}
	};

	const modalRef = useRef<HTMLDivElement>(null);


	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFiles(e.target.files as unknown as File[]);
	};

	const handleFileDelete = (i: number) => {
		setFiles(
			Array.from(files).filter((el, index) => index !== i),
		);
	};

	const handleBgFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBgFiles(e.target.files as unknown as File[]);
	};

	const handleBgFileDelete = (i: number) => {
		setBgFiles(
			Array.from(bgFiles).filter((el, index) => index !== i),
		);
	};

	return (
		<>
			<button className='properties__add--but' onClick={() => setOpen(true)}>
				+ Add {firstUpperLetter(postTag)} Post
			</button>
			{
				open &&
				<div className='login add' ref={modalRef}>
					<h3 className='login__text'>Add Object</h3>

					<RequiredFieldList reqFields={reqFields}
						setReqFields={(s) => setReqFields(s)}
					/>

					<AdditionalFields additionalFields={additionalFields} setAdditionalFields={setAdditionalFields} />

					<div className='login_item'>
						<h4 className="login__text">Description</h4>
						<textarea
							placeholder='Description'
							className="login__input login__input-desc"
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
					</div>


					<div className='login_item'>
						<h4 className='login__text'>Background foulder image</h4>
						<label htmlFor='file-bgupload' className='login__nav--add add__label'>
							Upload file
						</label>
						<input type='file' accept={FormatImages} id='file-bgupload' onChange={e => {
							handleBgFileUpload(e);
						}} />
						<h4 className='login__text'>{FormatImages}
							{Boolean(bgFiles.length) || <span className='login__text login__text-req '> Required field</span>}
						</h4>
						{
							Boolean(bgFiles.length) && (
								<FilesList files={bgFiles} handleFileDelete={handleBgFileDelete} />
							)
						}
					</div>

					<div className='login_item'>
						<h4 className='login__text'>Media files</h4>
						<label htmlFor='file-upload' className='login__nav--add add__label'>
							Upload file
						</label>
						<input type='file' multiple accept={FormatImages} id='file-upload' onChange={e => {
							handleFileUpload(e);
						}} />
						<h4 className='login__text'>{FormatImages}
							{Boolean(files.length) || <span className='login__text login__text-req'> Required field</span>}
						</h4>
						{
							Boolean(files.length) && (
								<FilesList files={files} handleFileDelete={handleFileDelete} />
							)
						}
					</div>
					<div className='login__nav'>
						<button className='login__nav--delete' onClick={close}>
							Cancel
						</button>
						<button className='login__nav--add' onClick={handleUpload}>Upload To Server</button>
					</div>
				</div>
			}
		</>
	);
};

export default ModalAdd