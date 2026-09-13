import {api} from "./api";
import {AxiosError} from "axios";
import type {Congress, CreateCongress} from "../types/congress.types";

// TODO(#33): there is no Congress feature in backend/VitrineAPI/VitrineAPI/Features yet
// (only Projects, Teachers, WorksDone and Upload exist). Every call below hits an
// endpoint that doesn't exist on the real API - pending backend gap, not a fix.


export async function listCongresses(): Promise<Congress[]> {
    const response = await api.get<Congress[]>("/congress");
    return response.data;
}

export async function createCongress(payload: CreateCongress): Promise<Congress> {

    const response = await api.post<Congress>("/congress", payload)
    return response.data;
}

export async function updateCongress(id: string, payload: Partial<Congress>): Promise<Congress> {
    const response = await api.put<Congress>(`/congress/${id}`, payload)
    return response.data;
}

export async function deleteCongress(id: string) {
    await api.delete<Congress>(`/congress/${id}`);
}

export async function getIdCongress(id: string): Promise<Congress | null> {
    try {
        const response = await api.get<Congress>(`/congress/${id}`)
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}




