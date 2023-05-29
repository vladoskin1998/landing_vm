import React from 'react';
export const FilesList = ({files, handleFileDelete}: {files: File[]; handleFileDelete: (i: number) => void}) => {
	const deleteFile = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
		e.stopPropagation();
		handleFileDelete(i);
	};

	return <ul className='add__ul'>
		{Array.from(files).map((file, index) => (
			<li key={file.name}>
				<div>
					<span>{
						`${file.name}/${file.size}`.length > 25
							? `${file.name}`.split('').slice(0, 25).join('') + '...'
							: `${file.name}`}</span>
				</div>
				<button className='add__del' onClick={e => {
					deleteFile(e, index);
				}}>Delete</button>
			</li>
		))}
	</ul>;
};
