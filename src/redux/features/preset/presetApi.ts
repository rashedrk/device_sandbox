
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
                    data: data,
                };
            },
            invalidatesTags: ['Preset'],
        }),

        updatePreset: build.mutation<TPreset, TUpdatePresetPayload>({
            query: ({ id, data }) => {
                return {
                    url: `/presets/${id}`,
                    method: 'PATCH',
                    data: data,
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
} = presetApi;