'use client';

import { useActionState } from 'react';
import { client } from '@/app/utils/client';
import type { CreateTodoRequest } from './types/api';

export default function Home() {
    const formAction = async (
        _prevError: string | null,
        formData: FormData,
    ) => {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        const requestData: CreateTodoRequest = { title, description };
        const res = await client.api.todos.$post({
            json: requestData,
        });

        if (!res.ok) {
            const error = await res.text();
            return error;
        }

        const response = await res.json();
        if (!response.success) {
            return response.error || 'Failed to create todo';
        }

        return null;
    };
    const [error, submitAction, isPending] = useActionState(formAction, null);

    return (
        <div className='mt-10'>
            <h1 className='text-center font-bold text-3xl'>Todo</h1>
            <form
                action={submitAction}
                className='mx-auto mt-10 flex max-w-[600px] flex-col gap-2'
            >
                <label htmlFor='title' className='font-medium text-sm'>
                    Title
                </label>
                <input
                    type='text'
                    name='title'
                    className='rounded-md border-2 border-gray-300 p-2'
                />
                <label htmlFor='description' className='font-medium text-sm'>
                    Description
                </label>
                <input
                    type='text'
                    name='description'
                    className='rounded-md border-2 border-gray-300 p-2'
                />
                <button
                    disabled={isPending}
                    type='submit'
                    className='rounded-md bg-blue-500 p-2 text-white'
                >
                    Submit
                </button>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </div>
    );
}
