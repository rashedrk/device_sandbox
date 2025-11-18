import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { type AxiosRequestConfig, type AxiosError } from "axios";

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: "" }
    ): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig["method"];
            data?: AxiosRequestConfig["data"];
            params?: AxiosRequestConfig["params"];
            headers?: AxiosRequestConfig["headers"];
            contentType?: string;
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers, contentType }) => {
            try {
                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    timeout: 60000,
                    headers: {
                        "Content-Type": contentType || "application/json",
                        "Accept": "application/json",
                        ...headers,
                    },
                });
                return result;
            } catch (axiosError) {
                const err = axiosError as AxiosError;
                const status = err.response?.status;
                
                if (status === 403) {
                    console.error('Access forbidden');
                } else if (status && status >= 500) {
                    console.error('Server error:', err.response?.data || err.message);
                }
                
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };