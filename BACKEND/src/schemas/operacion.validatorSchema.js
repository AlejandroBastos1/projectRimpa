import { z } from "zod";

export const OperacionValidatorSchema = z.object({
    infoAvion: z.string({
        required_error: "Campo de matricula requerido",
    }),

    infoPiloto: z.string({
        required_error: "Campo de piloto requerido"
    }),

    infoCopiloto: z.string({
        required_error: "Campo de copiloto requerido"
    }),

    tripulacion: z.string({
        required_error: "Campo de tripulacion requerido"
    }),

    ciudadSalida: z.string({
        required_error: "Campo de ciudad de salida requerido"
    }),
    ciudadAterrizaje: z.string({
        required_error: "Campo de ciudad de aterrizaje requerido"
    }),

    fechaSalida: z.string({
        required_error: "campo de fecha de salida requerido"
    }),

    horaSalida: z.string({
        required_error: "campo de fecha de salida requerido"
    }),
    
})
