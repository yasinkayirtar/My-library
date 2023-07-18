
const options = document.querySelectorAll('option');
const select = document.querySelector("select");
const booksArea = document.getElementById("booksArea");

const sheetID = '1Gt2FfP3hj5xAMDZWK8OsOKI0-VK_a5JEn-weOtTsVJs';
let sheetName = 2023;
let books = []

class DisplayBook {
    constructor(bookName) {
        this.bookName = bookName;
    }
    createBook(bookName) {
        const book = document.createElement("div");
        book.classList.add("card");
        booksArea.appendChild(book);
        book.innerHTML = bookName;
    }
}


async function fetchData(sheetName) {
    const url = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?&sheet=${sheetName}`;

    const data2 = await fetch(url).then(response => response.text()).then(res => {
        const jsData = JSON.parse(res.match(/(?<=.*\().*(?=\);)/s)[0])
        jsData.table.rows.forEach((element, indx) => {
            let keys = new Array();
            keys = element.c[0].v;
            console.log(keys)
            const newBook = new DisplayBook();
            newBook.createBook(keys)

        });
    });

}

select.addEventListener('change', (e) => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => { card.remove() });
    sheetName = e.target.value;
    fetchData(sheetName)
})



fetchData(sheetName)