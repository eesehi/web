let input = document.querySelector('input')

async function opendir(){
    try {
        const dirHandle = await window.showDirectoryPicker();
        getfiles(await dirHandle)
    } catch (err) {

        console.error(err.name, err.message);
    }
  }

  async function getfiles(dirHandle){
    try {
       
        for await (const entry of dirHandle.values()) {
            console.log(entry.kind)
            if(entry.kind === 'file'){
                const f  =(await dirHandle.getFileHandle(entry.name));
                var ext=get_ext(entry.name).toLowerCase()
                if(ext=='jpeg' || ext=='jpg' || ext =='png' || ext=='bmp') imageFinder(await f.getFile())
               
            }else{
                const f = (await dirHandle.getDirectoryHandle(entry.name));
                getfiles(f);
            }
            
        }
    } catch (err) {

        console.error(err.name, err.message);
    }
  }

function imageFinder(file){
    Tesseract.recognize(
        file,
        'eng',
        { logger: m => console.log(m+file.name) }
      ).then(({ data: { text } }) => {
        console.log(text)
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

    const files = input.files;
    for( i = 0;i<files.length;i++){
        console.log("i am from input")
        imageFinder(files[i]);
    }
})