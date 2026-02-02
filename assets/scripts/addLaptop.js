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
    changeDisplay(loopCard, 'semua');
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
    changeDisplay(loopCard);
});

// filter kondisi laptop
document.getElementById('filterKondisi').addEventListener('change', function (event) {
    event.preventDefault();
    const kondisi = this.value;
    console.log(kondisi);
    changeDisplay(loopCard, kondisi);
});

// mengubah tampilan setelah submit
function changeDisplay(card, kondisi) {
    document.getElementById('hasil').innerHTML = card(kondisi);
    document.getElementById('sectionHasil').classList.remove('d-none');
}

// looping card laptop
function loopCard(kondisi) {
    let laptopFiltered = laptops.filter(function (laptop) {
        if (kondisi === 'monitor') {
            return laptop.kondisi.monitorBagus;
        } else if (kondisi === 'keyboard') {
            return laptop.kondisi.keyboardBagus;
        } else if (kondisi === 'casing') {
            return laptop.kondisi.casingBagus;
        } else {
            return true;
        }
    });

    const tampilLaptop = laptopFiltered.map(function (laptop) {
        let hasil = '';
        hasil +=
            `
            <div class="col d-flex justify-content-center mb-4">
                <div class="card shadow-lg" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${laptop.namaLaptop}</h5>
                        <p class="card-text">Tanggal Beli: ${laptop.tanggalBeli}</p>
                        <p class="card-text">Tanggal Jual: ${laptop.tanggalJual}</p>
                        <p class="card-text">${laptop.deskripsi}.</p>
                        <div class="d-flex align-items-center gap-4 justify-content-center mb-3">
                            ${(laptop.kondisi.monitorBagus ? '<i class="bi bi-display fs-2"></i>' : '')}
                            ${(laptop.kondisi.keyboardBagus ? '<i class="bi bi-keyboard fs-4"></i>' : '')}
                            ${(laptop.kondisi.casingBagus ? '<i class="bi bi-laptop fs-2"></i>' : '')}
                        </div >
                        <div class="row">
                            <div class="col">
                                <a href="components/detail-laptop.html?id=${laptop.laptopId}"><button type="button" class="btn btn-dark w-100">Selengkapnya</button></a>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        `;

        return hasil;
    });
    return tampilLaptop;
}
