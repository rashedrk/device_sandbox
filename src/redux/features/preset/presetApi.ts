
import { baseApi } from '../../api/baseApi';

export const deviceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllPresets: build.query({
            query: () => {
                return {
                    url: '/presets',
                    method: 'GET',
                };
            },
        }),
        
    }),
});

export const { useGetAllPresetsQuery } = deviceApi;