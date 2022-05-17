import KTP from './nimMap'

const { provinsi, kabkot, kecamatan } = KTP

export function getProvinceId(nik) {
    if (nik == undefined) {
        return false
    }
    return nik.substring(0, 2)
}

export function getProvince(nik) {
    if (nik == undefined) {
        return false
    }
    return provinsi[getProvinceId(nik)]
}

export function getKabKotId(nik) {
    if (nik == undefined) {
        return false
    }
    return nik.substring(0, 4)
}

export function getKabKot(nik) {
    if (nik == undefined) {
        return false
    }
    return kabkot[getKabKotId(nik)]
}

export function getKecamatanId(nik) {
    if (nik == undefined) {
        return false
    }
    return nik.substring(0, 6)
}

export function getKecamatan(nik) {
    return kecamatan[getKecamatanId(nik)].split(' -- ')[0]
}

export function getDOB(nik) {
    const year = Number(nik.substring(10, 12))
    const month = Number(nik.substring(8, 10))
    const date = Number(nik.substring(6, 8))

    return new Date(year, month - 1, date)
}

export function isValid(nik) {
    if (nik == undefined) {
        return false
    }

    const isValidLength = () => nik.length === 16
    const isValidProvinsi = () => !!getProvince()
    const isValidKabupatenKota = () => !!getKabKot()
    const isValidKecamatan = () => !!getKecamatan()

    return isValidLength()
        && isValidProvinsi()
        && isValidKabupatenKota()
        && isValidKecamatan()
}
