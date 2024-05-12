import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
  }),
  
  libretaMilitar: z.string({
    required_error: "La libreta Militar es requerida"
  })
  .min(10, {
    message: "Error al encontrar la libreta militar"
  }),

  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "Email invalido",
    }),

  contraseña: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, {
      message: "La contraseña debe tener 8 caracteres",
    }),
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "EL EMAIL ES OBLIGATORIO"
    }).email({
        message: 'EMAIL INVALIDO'
    }),

    contraseña: z.string({
        required_error: "LA CONTRASEÑA ES OBLIGATORIA"
    })
    .min(8,{
        message: 'LA CONTRASEÑA CONTIENE 8 O MAS CARACTERES'
    }),
});
