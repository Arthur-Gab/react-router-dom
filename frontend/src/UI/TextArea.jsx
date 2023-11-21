import { forwardRef } from 'react';

export const TextArea = forwardRef(function TextArea(props, ref) {
	const { id, label, ...otherProps } = props;
	return (
		<div className="flex flex-col gap-1">
			<label
				htmlFor={id}
				className="text-lg"
			>
				{label}
			</label>
			<textarea
				ref={ref}
				id={id}
				className="w-full outline focus-within:outline-orange-500 border-2 p-1 rounded focus-within:outline h-28"
				placeholder="Escreva a descrição do evento aqui..."
				{...otherProps}
			></textarea>
		</div>
	);
});
