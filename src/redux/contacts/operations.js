import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

export const fetchContacts = createAsyncThunk(
	'contacts/fetchAll',
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(`/contacts`);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const addContact = createAsyncThunk(
	'contacts/addContact',
	async (contact, thunkAPI) => {
		try {
			const response = await axios.post(`/contacts`, contact);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const deleteContact = createAsyncThunk(
	'contacts/deleteContact',
    async (contactId, thunkAPI) => {
		try {
			const response = await axios.delete(`/contacts/${contactId}`);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
export const updateContact = createAsyncThunk(
	'contacts/update',
	async (newContactData, thunkAPI) => {
		const updatedContact = {
			name: newContactData.name,
			number: newContactData.number,
		};

		try {
			const response = await axios.patch(
				`/contacts/${newContactData.id}`,
				updatedContact
			);

			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);