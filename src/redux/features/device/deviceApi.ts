
import { baseApi } from '../../api/baseApi';



export const deviceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllDevices: build.query({
            query: () => {
                return {
                    url: '/devices',
                    method: 'GET',
                };
            },
        }),
        
    }),
});

export const { useGetAllDevicesQuery } = deviceApi;