let input = document.querySelector('input')
var cnt=0;
function imageFinder(file){
    cnt+=1;
    if(cnt>5) return;
    console.log(cnt);
    Tesseract.recognize(
        file,
        'eng',
        { logger: m => console.log(m+file.name) }
      ).then(({ data: { text } }) => {
        addRow(file.name,text)
      })
}

function addRow(name,text) {
    var table = document.getElementById("myTable")
    var row = table.insertRow(0)
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    cell1.innerHTML = name
    cell2.innerHTML = text
  }

function get_ext(name) {
    return name.split('.').pop()
}

input.addEventListener('change',()=>{
    let files=input.files
    if(files.length==0) return
    console.log(files)
    for (let index = 0; index < files.length; index++) {
        var file = files[index];
        var ext=get_ext(file.name).toLowerCase()
        if(ext=='jpeg' || ext=='jpg' || ext =='png' || ext=='bmp') imageFinder(file)
    }
})
