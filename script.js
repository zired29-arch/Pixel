let start_btn = document.querySelector('.btn-15')
let footer = document.querySelector('footer')
let container = document.querySelector('.container-btn')
let board = document.querySelector('.board')
let input = document.querySelector('input')
let fill_btn = document.querySelector('.fill')
let clear_btn = document.querySelector('.clear')
let pencil_btn = document.querySelector('.pencil')
let eraser_btn = document.querySelector('.eraser')
let save_btn = document.querySelector('.save')
let download_btn = document.querySelector('.download')

let isDrawing = false
let drawMode = false
let current_color = '#ff0000'

function load_picture() {
    let cookies = document.cookie.split('; ')

}

start_btn.addEventListener('click', function() {
    start_btn.style.display = "none"
    footer.style.display = "none"
    board.style.display = "grid"
    container.style.display = "flex"
    desk_creating()
})

function desk_creating() {
    for (let i = 0; i < 4000; i++) {
        let div = document.createElement('div')
        div.classList.add('cell')
        board.appendChild(div)
    }
    load_picture()
}


pencil_btn.addEventListener('click', function() {
    drawMode = "pencil"
})
eraser_btn.addEventListener('click', function() {
    drawMode = "eraser"
})
board.addEventListener('click', function(event) {
    if (!drawMode) {
        return
    }
    if (event.target.classList.contains('cell')) {
        isDrawing = true
        if (drawMode === "pencil") {
            event.target.style.backgroundColor = current_color
        }
        if (drawMode === "eraser") {
            event.target.style.backgroundColor = "#FFFFFF"
        }
    }
})
board.addEventListener('mousemove', function(event) {
    if (!isDrawing || !drawMode) {
        return
    }
    if (event.target.classList.contains('cell')) {
        if (drawMode === "pencil") {
            event.target.style.backgroundColor = current_color
        }
        if (drawMode === "eraser") {
            event.target.style.backgroundColor = "#FFFFFF"
        }
    }
})
document.addEventListener('mouseup', function() {
    isDrawing = false
})



input.addEventListener('input', function() {
    current_color = input.value
})

fill_btn.addEventListener('click', function() {
    let cells = document.querySelectorAll('.cell')
    cells.forEach((el, index) => {
        // el.style.backgroundColor = current_color
        anime({
        targets: el,
        background: current_color,
        duration: 100,
        delay: index*0.1,
        easing: "linear"
        })
    })
})

clear_btn.addEventListener('click', function() {
    let cells = document.querySelectorAll('.cell')
    cells.forEach((el, index) => {
        anime({
        targets: el,
        background: "#FFFFFF",
        duration: 100,
        delay: index*0.1,
        easing: "linear"
        })
    })
})

save_btn.addEventListener('click', function() {
    let cells = document.querySelectorAll('.cell')
    let picture = []
    cells.forEach(cell => {
        picture.push(cell.style.backgroundColor)
    })
    document.cookie = `picture=${JSON.stringify(picture)}; max-age=10000`
    console.log(document.cookie, picture)
})
