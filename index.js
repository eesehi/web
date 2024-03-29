let input = document.querySelector('input')
var maxThread = (navigator.userAgent.search("Android")>-1)?3:4;
var que = [];

async function imageFinder() {
        if (que.length == 0) return;

        const worker = Tesseract.createWorker({
          logger: (m) => console.log(m),
        });

        (async () => {
          await worker.load();
          await worker.loadLanguage("eng");
          await worker.initialize("eng",0);
          while (que.length != 0) {
            var file = que.pop();
            const {
              data: { text },
            } = await worker.recognize(file);
            addRow(file.name, text);
          }
          await worker.terminate();
        })();
      }

function addRow(name, text) {
        var table = document.getElementById("myTable");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = name;
        cell2.innerHTML = text;
      }

function get_ext(name) {
    return name.split('.').pop()
}

input.addEventListener("change", () => {
        let files = input.files;
        if (files.length == 0) return;
        console.log(files);
        for (let index = 0; index < files.length; index++) {
          var file = files[index];
          var ext = get_ext(file.name).toLowerCase();
          if (ext == "jpeg" || ext == "jpg" || ext == "png" || ext == "bmp")
            que.push(file);
        }
        for(var i=0;i<maxThread;i++){
            imageFinder();
        }
        console.log("Haaloo");
      });
