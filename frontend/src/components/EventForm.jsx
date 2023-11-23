import { MoveLeft as Back, X } from 'lucide-react';
import { Input } from '../UI/Input';
import { TextArea } from '../UI/TextArea';
import { useForm } from 'react-hook-form';

export function EventForm({ method, title, nav_label }) {
	// Put data value to new Date()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			date: getFormatedDate(),
			description: '',
			image: 'https://picsum.photos/200',
		},
	});

	console.log(errors);

	function getFormatedDate() {
		const dataAtual = new Date();

		const ano = dataAtual.getFullYear();
		const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
		const dia = dataAtual.getDate().toString().padStart(2, '0');

		return `${ano}-${mes}-${dia}`;
	}

	function onCreateEvent(data) {
		// Enviar para o back os dados
		console.log(data);
	}

	function onEditEvent(data) {
		// Enviar para o back somente os dados completos
		// Validar se todos os itens estão vazios
		console.log(data);
	}

	let form = null;
	// POST FORM - todos os inputs são obrigatórios e tem patterns
	if (method == 'POST') {
		form = (
			<form
				action={method}
				onSubmit={handleSubmit(onCreateEvent)}
			>
				<fieldset className='mt-6 flex flex-col gap-4'>
					<div>
						<Input
							id='title'
							type='text'
							label='Titulo:'
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
							id='url'
							type='text'
							label='Image (URL):'
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

					<button className='btn relative mt-20 flex w-full justify-center gap-2 bg-orange-500 p-4 py-4 text-white'>
						Confirmar
					</button>
				</fieldset>
			</form>
		);
	}
	// PATCH FORM - Todos os inputs são opcionais, mas tem patterns
	else {
		form = (
			<form
				action={method}
				onSubmit={handleSubmit(onEditEvent)}
			>
				<fieldset className='mt-6 flex flex-col gap-4'>
					<div>
						<Input
							id='title'
							type='text'
							label='Titulo:'
							{...register('title')}
						/>
						<span className='text-orange-600'>{errors.title?.message}</span>
					</div>

					<div>
						<Input
							id='date'
							type='date'
							label='Data:'
							{...register('date')}
						/>
						<span className='text-orange-600'>{errors.date?.message}</span>
					</div>
					<div>
						<TextArea
							id='description'
							label='Descrição:'
							{...register('description')}
						/>
						<span className='text-orange-500'>
							{errors.description?.message}
						</span>
					</div>
					<div>
						<Input
							id='url'
							type='text'
							label='Image (URL):'
							{...register('image', {
								pattern: {
									value: /^http/i,
									message: 'Insira uma URL válida',
								},
							})}
						/>
						<span className='text-orange-500'>{errors.image?.message}</span>
					</div>

					<button className='btn relative mt-20 flex w-full justify-center gap-2 bg-orange-500 p-4 py-4 text-white'>
						Confirmar
					</button>
				</fieldset>
			</form>
		);
	}

	return (
		<>
			<header className='container max-w-4xl p-4'>
				<nav>
					{method == 'POST' && (
						<button
							className='btn relative flex w-44 justify-center gap-2 bg-orange-500 p-4 py-2 text-white'
							onClick={(e) => {
								e.preventDefault();
								history.back(-1);
							}}
						>
							<Back size={26} />
							{nav_label}
						</button>
					)}
					{method == 'PATCH' && (
						<button
							className='btn relative flex w-44 justify-center gap-2 bg-orange-500 p-4 py-2 text-white'
							onClick={(e) => {
								e.preventDefault();
								history.back(-1);
							}}
						>
							<X size={26} />
							{nav_label}
						</button>
					)}
				</nav>
			</header>
			<main className='container mt-8 max-w-4xl p-4'>
				<h1 className='text-center text-2xl'>{title}</h1>

				{form}
			</main>
		</>
	);
}
