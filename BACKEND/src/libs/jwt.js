import jwt from 'jsonwebtoken'

export function createAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            "keysecret1",
            { expiresIn: "1d" },
            (err, token) => {
              if (err) reject(err)
              resolve(token);
            }
        );
    })
}
