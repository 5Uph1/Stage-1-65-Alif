let laptops = [];
let namaLaptop = document.getElementById('namaLaptop');
let deskripsi = document.getElementById('deskripsi');
let kondisi = document.getElementById('kondisi');
let tanggalBeli = document.getElementById('tanggalBeli');
let tanggalJual = document.getElementById('tanggalJual');

// fungsi untuk mendapatkan data laptop dari local storage
function getLaptops() {
    const loadLaptops = localStorage.getItem('Laptops Data');
    if (loadLaptops) {
        laptops = JSON.parse(loadLaptops);
    }
    return laptops;
}

const dataLaptops = getLaptops();

// mendapatkan id dari query string
const endPoint = new URLSearchParams(window.location.search);
const IdLaptop = parseInt(endPoint.get('id'));
const laptop = dataLaptops.find(function (item) {
    return item.laptopId === IdLaptop;
});

if (laptop) {
    namaLaptop.innerText = laptop.namaLaptop;
    deskripsi.innerText = laptop.deskripsi;

    // ubah format tanggal beli dan jual
    let tanggalBeliFormatted = new Date(laptop.tanggalBeli).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    let tanggalJualFormatted = new Date(laptop.tanggalJual).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    tanggalBeli.innerText = tanggalBeliFormatted;
    tanggalJual.innerText = tanggalJualFormatted;

    kondisi.innerHTML = "";

    if (laptop.kondisi.monitorBagus) {
        kondisi.innerHTML += '<i class="bi bi-display fs-2 me-3"></i> Monitor Bagus ';
    }
    if (laptop.kondisi.keyboardBagus) {
        kondisi.innerHTML += '<i class="bi bi-keyboard fs-4 me-3"></i> Keyboard Bagus ';
    }
    if (laptop.kondisi.casingBagus) {
        kondisi.innerHTML += '<i class="bi bi-laptop fs-2"></i> Casing Bagus';
    }

    if (kondisi.innerHTML === "") {
        kondisi.innerHTML = "Kondisi Kurang Baik";
    }

} else {
    namaLaptop.innerText = 'Laptop tidak ditemukan';
}