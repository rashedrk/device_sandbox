
import { baseApi } from '../../api/baseApi';
import type { TCreatePresetPayload, TPreset, TUpdatePresetPayload } from '../../../types';

export const presetApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPresets: build.query({
            query: () => {
                return {
                    url: '/presets',
                    method: 'GET',
                };
            },
            providesTags: ['Preset'],
        }),

        createPreset: build.mutation<TPreset, TCreatePresetPayload>({
            query: (data) => {
                return {
                    url: '/presets',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['Preset'],
        }),

        updatePreset: build.mutation<TPreset, TUpdatePresetPayload>({
            query: ({ id, data }) => {
                return {
                    url: `/presets/${id}`,
                    method: 'PUT',
                    body: data,
                };
            },
            invalidatesTags: ['Preset'],
        }),

        deletePreset: build.mutation<void, string>({
            query: (id) => {
                return {
                    url: `/presets/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Preset'],
        }),
    }),
});

export const {
    useGetAllPresetsQuery,
    useCreatePresetMutation,
    useUpdatePresetMutation,
    useDeletePresetMutation,
} = presetApi;