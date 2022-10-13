const dayOfWeek = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

const month = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export function spanishDate(dateToProcess) {
  if (dateToProcess === undefined) {
    return "";
  }
  const date = new Date(dateToProcess);
  return `${dayOfWeek[date.getDay()].charAt(0).toUpperCase()}${dayOfWeek[
    date.getDay()
  ].substring(1)}, ${date.getDate()} de ${month[date.getMonth()]
    } del ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}, GMT${date.getTimezoneOffset() >= 0 ? "" : "+"
    }${Math.round((date.getTimezoneOffset() * -1) / 60)}:${(date.getTimezoneOffset() * -1) % 60
    }${(date.getTimezoneOffset() * -1) % 60 === 0 ? "0" : ""}`;
}
