let laptops = [];
let idLaptop = 1;

// Save ke local storage
function saveLaptop(laptopData) {
    localStorage.setItem('Laptops Data', JSON.stringify(laptopData));
}

// Load dari local storage
const loadLaptops = localStorage.getItem('Laptops Data');
if (loadLaptops) {
    laptops = JSON.parse(loadLaptops);

    // Id Auto increment
    if (laptops.length > 0) {
        idLaptop = laptops[laptops.length - 1].laptopId + 1;
    }
    changeDisplay();
}

// Tombol submit ditekan
document.getElementById('myLaptop').addEventListener('submit', function (event) {
    event.preventDefault();

    const laptop = {
        laptopId: idLaptop++,
        namaLaptop: document.getElementById('namaLaptop').value,
        tanggalBeli: document.getElementById('tanggalBeli').value,
        tanggalJual: document.getElementById('tanggalJual').value,
        deskripsi: document.getElementById('deskripsi').value,
        kondisi: {
            monitorBagus: document.getElementById('monitorBagus').checked,
            keyboardBagus: document.getElementById('keyboardBagus').checked,
            casingBagus: document.getElementById('casingBagus').checked
        }
    };

    laptops.push(laptop);
    console.log(laptops);
    saveLaptop(laptops);
    changeDisplay();
});

// mengubah tampilan setelah submit
function changeDisplay() {
    let berhasilKirim =
        `
            <div class="container mt-5">
                <h1 class="text-center mb-5">My Laptop</h1>
                <div class="row mb-3">
        ` +
        loopCard();
    + `
                </div>
            </div>
        `;

    document.getElementById('hasil').innerHTML = berhasilKirim;
}

// looping card laptop
function loopCard() {
    let hasil = '';
    for (let i = 0; i < laptops.length; i++) {
        hasil +=
            `
            <div class="col d-flex justify-content-center mb-4">
                <div class="card shadow-lg" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${laptops[i].namaLaptop}</h5>
                        <p class="card-text">Tanggal Beli: ${laptops[i].tanggalBeli}</p>
                        <p class="card-text">Tanggal Jual: ${laptops[i].tanggalJual}</p>
                        <p class="card-text">${laptops[i].deskripsi}.</p>
                        <div class="d-flex align-items-center gap-4 justify-content-center mb-3">
                            ${(laptops[i].kondisi.monitorBagus ? '<i class="bi bi-display fs-2"></i>' : '')}
                            ${(laptops[i].kondisi.keyboardBagus ? '<i class="bi bi-keyboard fs-4"></i>' : '')}
                            ${(laptops[i].kondisi.casingBagus ? '<i class="bi bi-laptop fs-2"></i>' : '')}
                        </div >
                        <div class="row">
                            <div class="col">
                                <a href="components/detail-laptop.html?id=${laptops[i].laptopId}"><button type="button" class="btn btn-dark w-100">Selengkapnya</button></a>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        `;
    }
    return hasil;
}
