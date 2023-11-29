import { Input } from '../UI/Input';
import { TextArea } from '../UI/TextArea';
import { useForm } from 'react-hook-form';
import { useNavigation, useSubmit } from 'react-router-dom';

export function Form({ method, event }) {
	const submit = useSubmit();
	const { state } = useNavigation();
	const { title, description, date, image } = event || {};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: title || '',
			date: date || '',
			description: description || '',
			image: image || 'https://picsum.photos/350/280',
		},
	});

	return (
		<>
			<form
				onSubmit={(event) => {
					event.preventDefault();

					const target = event.currentTarget;
					const submitter = event.nativeEvent.submitter.innerHTML;

					if (submitter == 'Confirmar') {
						handleSubmit(() => {
							submit(target, {
								method,
							});
						})();
					} else {
						handleSubmit(() => {
							submit(target, {
								method: 'DELETE',
							});
						})();
					}
				}}
			>
				<fieldset className='mt-6 flex flex-col gap-4'>
					<div>
						<Input
							id='title'
							type='text'
							label='Titulo:'
							name='title'
							{...register('title', { required: 'Insira um titulo válido' })}
						/>
						<span className='text-base text-orange-600'>
							{errors.title?.message}
						</span>
					</div>

					<div>
						<Input
							id='date'
							type='date'
							label='Data:'
							name='date'
							{...register('date', { required: 'Insira uma data' })}
						/>
						<span className='text-base text-orange-600'>
							{errors.date?.message}
						</span>
					</div>
					<div>
						<TextArea
							id='description'
							label='Descrição:'
							name='description'
							{...register('description', {
								required: 'Insira uma descrição para o evento',
							})}
						/>
						<span className='text-orange-500'>
							{errors.description?.message}
						</span>
					</div>
					<div>
						<Input
							id='image'
							type='text'
							label='Image (URL):'
							name='image'
							{...register('image', {
								required: 'Insira uma imagem',
								pattern: {
									value: /^http/i,
									message: 'Insira uma URL válida',
								},
							})}
						/>
						<span className='text-orange-500'>{errors.image?.message}</span>
					</div>

					<div className='flex gap-12'>
						{method.toUpperCase() == 'PATCH' && (
							<button
								className='btn relative mt-20 flex w-full flex-1 justify-center gap-2 bg-black p-4 py-4 text-white focus-visible:outline-[3px] focus-visible:outline-orange-500'
								disabled={state === 'submitting'}
								type='submit'
							>
								Excluir
							</button>
						)}
						<button
							className='btn relative mt-20 flex w-full flex-1 justify-center gap-2 bg-orange-500 p-4 py-4 text-white'
							disabled={state === 'submitting'}
							type='submit'
						>
							Confirmar
						</button>
					</div>
				</fieldset>
			</form>
		</>
	);
}
