function parseMonth(monthNumber) {
    const month = {
        "1": "Januari",
        "2": "Februari",
        "3": "Maret",
        "4": "April",
        "5": "Mei",
        "6": "Juni",
        "7": "Juli",
        "8": "Agustus",
        "9": "September",
        "10": "Oktober",
        "11": "November",
        "12": "Desember"
    };
    return month[monthNumber];
}

export function parseDate(strDate) {
    const year = strDate.split("-")[0];
    const month = parseMonth(strDate.split("-")[1].replace(/^0+/, ''));
    const day = strDate.split("-")[2].replace(/^0+/, '');
    return `${day} ${month} ${year}`;
}
