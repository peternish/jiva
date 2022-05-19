import KTP from './nimMap'

const { provinsi, kabkot, kecamatan } = KTP

export function getProvinceId(nik) {
    return nik.substring(0, 2)
}

export function getProvince(nik) {
    return provinsi[getProvinceId(nik)]
}

export function getKabKotId(nik) {
    return nik.substring(0, 4)
}

export function getKabKot(nik) {
    return kabkot[getKabKotId(nik)]
}

export function getKecamatanId(nik) {
    return nik.substring(0, 6)
}

export function getKecamatan(nik) {
    return kecamatan[getKecamatanId(nik)].split(' -- ')[0]
}

export function getDOB(nik) {
    const year = Number(nik.substring(10, 12))
    const month = Number(nik.substring(8, 10))
    const date = Number(nik.substring(6, 8))
    const finalYear = year <= 22 ? 2000 + year : year

    return new Date(finalYear, month - 1, date)
}

export function checkValidity(nik) {
    if (nik == undefined) {
        return false
    }

    const isValidLength = () => nik.length === 16
    const isValidProvinsi = () => !!getProvince(nik)
    const isValidKabupatenKota = () => !!getKabKot(nik)
    const isValidKecamatan = () => !!getKecamatan(nik)

    return isValidLength()
        && isValidProvinsi()
        && isValidKabupatenKota()
        && isValidKecamatan()
}
