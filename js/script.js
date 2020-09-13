const $principal = document.getElementById("principal");
const $mes = document.getElementById("mes");
let diasSenalados = [];
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

let fecha = new Date();

const posicionar = (diasemana, $fracmento) => {
  console.log(diasemana);

  for (let i = 0; i < diasemana; i++) {
    $li = document.createElement("li");
    $li.classList.value = "diacreado";
    $fracmento.appendChild($li);
  }
};
const mes = (fecha) => {
  let mes = fecha.getMonth();

  let ano = fecha.getFullYear();

  $mes.textContent = `${meses[mes]}  ${ano}`;

  let date = new Date(ano + "-" + (mes + 1) + "-" + 1);
  let $fracmento = document.createDocumentFragment();

  let inicio = 1;
  posicionar(date.getUTCDay(), $fracmento);
  while (true) {
    $li = document.createElement("li");
    $li.classList.value = "dia";

    $li.textContent = inicio;
    inicio++;
    $fracmento.appendChild($li);
    date.setDate(date.getDate() + 1);

    if (date.getMonth() === mes + 1) break;
  }

  $principal.appendChild($fracmento);
};
const cambiarMes = (numero) => {
  let mesAnos = $mes.textContent.split(["  "], 2);

  mesAnos[0] = meses.indexOf(mesAnos[0]);

  mesAnos[1] = Number(mesAnos[1]);
  if (numero === 1) {
    if (mesAnos[0] === 11) {
      mesAnos[1] = mesAnos[1] + 1;
      mesAnos[0] = 0;
    } else {
      mesAnos[0] = mesAnos[0] + 1;
    }
  } else {
    if (mesAnos[0] === 1) {
      mesAnos[1] = mesAnos[1] - 1;

      mesAnos[0] = 11;
    } else {
      mesAnos[0] = mesAnos[0] - 1;
    }
  }
  String(mesAnos[1]);

  $mes.textContent = `${meses[mesAnos[0]]}  ${mesAnos[1]}`;
  return `${mesAnos[1]}-${mesAnos[0] + 1}-1`;
};

const pasarmes = (datos) => {
  let $fracmento = document.createDocumentFragment();
  datos = String(datos);

  let date = new Date(datos);
  let inicio = 1;
  console.log(date);

  console.log(date.getUTCDay());

  posicionar(date.getUTCDay(), $fracmento);
  let mes = date.getMonth() + 1;

  while (true) {
    $li = document.createElement("li");
    $li.classList.value = "dia";

    $li.textContent = inicio;
    inicio++;
    $fracmento.appendChild($li);

    date.setDate(date.getDate() + 1);

    if (date.getMonth() === mes) break;
  }
  $principal.textContent = "";
  $principal.appendChild($fracmento);
};

mes(fecha);

document.addEventListener("click", (e) => {
  if (e.target.id === "izquierda") {
    pasarmes(cambiarMes(-1));
  }
  if (e.target.id === "derecha") {
    pasarmes(cambiarMes(1));
  }
  if (
    e.target.classList.value === "dia" ||
    e.target.classList.value === "dia circulo"
  ) {
    e.target.classList.toggle("circulo");
    if (e.target.classList.value === "dia circulo") {
      diasSenalados.push(e.target.textContent);
    } else {
      let nuemeroElemento = diasSenalados.indexOf(e.target.textContent);

      diasSenalados.splice(nuemeroElemento, 1);
    }
  }
});
