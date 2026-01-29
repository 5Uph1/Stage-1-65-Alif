const laptops = [];

// Tombol submit ditekan
document.getElementById('myLaptop').addEventListener('submit', function (event) {
    event.preventDefault();

    const laptop = {
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
                            <i class="bi bi-display fs-2"></i> 
                            <i class="bi bi-keyboard fs-4"></i>
                            <i class="bi bi-laptop fs-2"></i>
                        </div >
                        <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-dark w-100">Edit</button>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-dark w-100">Delete</button>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        `;
    }
    return hasil;
}
