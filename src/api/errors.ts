import axios from 'axios';

export type ApiErrorKind =
    | 'not_found'
    | 'unauthorized'
    | 'rate_limit'
    | 'server'
    | 'timeout'
    | 'network'
    | 'unknown';

export class ApiError extends Error {
    readonly kind: ApiErrorKind;
    readonly status?: number;

    constructor(
        kind: ApiErrorKind,
        message: string,
        status?: number,
        options?: ErrorOptions,
    ) {
        super(message, options);
        this.name = 'ApiError';
        this.kind = kind;
        this.status = status;
    }
}

export function toApiError(error: unknown): ApiError {
    if (!axios.isAxiosError(error)) {
        return new ApiError('unknown', 'Ocurrió un error inesperado', undefined, {
            cause: error,
        });
    }

    const options = { cause: error };

    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
        return new ApiError('timeout', 'El servidor tardó demasiado en responder', undefined, options);
    }

    if (!error.response) {
        return new ApiError('network', 'No hay conexión con el servidor', undefined, options);
    }

    const { status } = error.response;

    if (status === 404) return new ApiError('not_found', 'No se encontró la ciudad', status, options);
    if (status === 401) return new ApiError('unauthorized', 'API key inválida o ausente', status, options);
    if (status === 429) return new ApiError('rate_limit', 'Demasiadas peticiones, intenta más tarde', status, options);
    if (status >= 500) return new ApiError('server', 'Error en el servidor', status, options);

    return new ApiError('unknown', 'Ocurrió un error inesperado', status, options);
}