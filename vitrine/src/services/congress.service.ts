import {api} from "./api";
import {AxiosError} from "axios";
import {Status} from "../types/congress.types";
import type {Congress, CreateCongress} from "../types/congress.types";

// Backend's CongressRequest/CongressResponse (Features/Congresses/Shared) name these
// `date`/`location`/`status`, not `data`/`local`/`tipo`, and `status` uses the enum
// values Em_andamento/Finalizado/A_ser_publicado. Map at the wire boundary so the rest
// of the app can keep using the frontend's own field names and lower-case values.
export interface CongressWire {
    id: string;
    title: string;
    description: string;
    date: string;
    url: string;
    location: string;
    status: "Em_andamento" | "Finalizado" | "A_ser_publicado";
}

type CongressWirePayload = Omit<CongressWire, "id">;

const STATUS_TO_WIRE: Record<Status, CongressWire["status"]> = {
    [Status.Andamento]: "Em_andamento",
    [Status.Finalizado]: "Finalizado",
    [Status.Aserpublicado]: "A_ser_publicado",
};

const STATUS_FROM_WIRE: Record<CongressWire["status"], Status> = {
    Em_andamento: Status.Andamento,
    Finalizado: Status.Finalizado,
    A_ser_publicado: Status.Aserpublicado,
};

export function congressFromWire(wire: CongressWire): Congress {
    const {date, location, status, ...rest} = wire;
    return {...rest, data: date, local: location, tipo: STATUS_FROM_WIRE[status]};
}

function toWire<T extends Partial<Congress>>(payload: T): Partial<CongressWirePayload> {
    const {data, local, tipo, ...rest} = payload;
    return {
        ...rest,
        ...(data !== undefined ? {date: data} : {}),
        ...(local !== undefined ? {location: local} : {}),
        ...(tipo !== undefined ? {status: STATUS_TO_WIRE[tipo]} : {}),
    };
}

export async function listCongresses(): Promise<Congress[]> {
    const response = await api.get<CongressWire[]>("/congresses");
    return response.data.map(congressFromWire);
}

export async function createCongress(payload: CreateCongress): Promise<Congress> {
    const response = await api.post<CongressWire>("/congresses", toWire(payload));
    return congressFromWire(response.data);
}

export async function updateCongress(id: string, payload: Partial<Congress>): Promise<Congress> {
    const response = await api.put<CongressWire>(`/congresses/${id}`, toWire(payload));
    return congressFromWire(response.data);
}

export async function deleteCongress(id: string) {
    await api.delete(`/congresses/${id}`);
}

export async function getIdCongress(id: string): Promise<Congress | null> {
    try {
        const response = await api.get<CongressWire>(`/congresses/${id}`);
        return congressFromWire(response.data);
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}
