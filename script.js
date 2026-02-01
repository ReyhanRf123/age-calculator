const {DateTime} = luxon; //mengimpor modul DateTime dari pustaka Luxon

const daySelect = document.getElementById("day"); //mengambil elemen HTML dengan id "day"
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");
const form = document.getElementById("ageForm");
const result = document.getElementById("result");

//isi select day
for(let i = 1; i<= 31;i++){ //loop dari 1 sampai 31 untuk mengisi opsi hari
    daySelect.innerHTML += `<option value="${i}">${i}</option>`;
}
for(let i = 1; i<= 12;i++){ 
    monthSelect.innerHTML += `<option value="${i}">${i}</option>`;
}
const currentYear = new Date().getFullYear(); //mengambil tahun saat ini

for(let i = currentYear; i>= 1900;i--){
    yearSelect.innerHTML += `<option value="${i}">${i}</option>`;
}


form.addEventListener("submit" , (e) => {
    e.preventDefault(); //mencegah perilaku default form saat disubmit

    const day = parseInt(daySelect.value); // mengambil nilai hari, bulan, dan tahun dari elemen select
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);

    if(!day || !month || !year){ // jika salah satu nilai tidak valid
        result.textContent = "Invalid Input"; //isi dengan invalid input
        return;
    }

    const birthDate = DateTime.fromObject({day,month,year}); // membuat objek DateTime untuk tanggal lahir dari input pengguna yang ada di form
    const today = DateTime.now(); //membuat objek DateTime untuk tanggal saat ini

     //memeriksa apakah tanggal lahir valid dan tidak di masa depan

    if(!birthDate.isValid || birthDate > today){
        result.textContent = "invalid birthdate";
        return;
    }

    const diff = today.diff(birthDate,["years" , "months" , "days"]).toObject(); // menghitung selisih antara tanggal saat ini dan tanggal lahir dalam tahun, bulan, dan hari

    result.textContent = //menampilkan hasil perhitungan usia
        `You are ${Math.floor(diff.years)} years, ` +
        `${Math.floor(diff.months)} months, ` +
        `${Math.floor(diff.days)} days old.`;
});