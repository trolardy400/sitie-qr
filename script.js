let qrCode;

function generarQR() {
  const texto = document.getElementById("texto").value.trim();
  const imagenInput = document.getElementById("imagen");
  const descargarBtn = document.getElementById("descargar");
  const qrcodeContainer = document.getElementById("qrcode");

  qrcodeContainer.innerHTML = "";
  descargarBtn.style.display = "none";

  if (texto === "") {
    alert("Por favor, ingresa un texto o URL.");
    return;
  }

  const opciones = {
    width: 300,
    height: 300,
    type: "canvas",
    data: texto,
    image: undefined,
    dotsOptions: {
      color: "#064e3b",
      type: "rounded"
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20
    }
  };

  if (imagenInput.files && imagenInput.files[0]) {
    const lector = new FileReader();
    lector.onload = function (e) {
      opciones.image = e.target.result;
      crearQR(opciones);
    };
    lector.readAsDataURL(imagenInput.files[0]);
  } else {
    crearQR(opciones);
  }
}

function crearQR(opciones) {
  qrCode = new QRCodeStyling(opciones);
  qrCode.append(document.getElementById("qrcode"));
  document.getElementById("descargar").style.display = "inline-block";
}

document.getElementById("descargar").addEventListener("click", () => {
  if (qrCode) {
    qrCode.download({ name: "codigo-qr", extension: "png" });
  }
});
