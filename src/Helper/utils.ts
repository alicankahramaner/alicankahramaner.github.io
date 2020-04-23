export const isNullOrUndefined = (obj: any) => obj === null || obj === undefined;

export const RandomNumberGenerator = (lenght: number = 5) => {
    let number = '';

    for (var i = 0; i < lenght; i++) {
        number += Math.floor(Math.random() * 10);
    }

    return number;
}