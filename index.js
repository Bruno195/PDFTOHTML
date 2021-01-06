const fs = require('fs')
const PDFParser = require('pdf2json')

let pdfCaminho = "Padrao_TISS_Componente_Organizacional__202012.pdf"

if(fs.existsSync(pdfCaminho)){
    let pdfParser = new PDFParser()
    
    pdfParser.on("pdfParser_dataError", function(errData){

        console.log(errData.parserError)

    })

    pdfParser.on("pdfParser_dataReady", function (pdfData) {
        
        var retornoHtml = 0;

	  

	  pdfData.formImage.Pages.forEach(function(page, index) { 

		retornoHtml = retornoHtml + "<p>Pagina " + (parseInt(index) + 1) + "</p>";

		var y = 0;	

		page.Texts.forEach(function(text, index) { 

			if (index == 0){

				y = text.y;

			}	

			text.R.forEach(function(t) { 

				if (text.y !== y){

					retornoHtml += "<br/>";

				}

				retornoHtml += decodeURIComponent(t.T);

			});

			y = text.y;

		});

		retornoHtml += "</p>";

	  });

	  

	  fs.writeFile("resultado.csv", retornoHtml, function(err) {

		if(err) {

			return console.log(err);

		}

	  });
        
       

    })


    pdfParser.loadPDF(pdfCaminho)
    console.log("Arquivo  Localizado")
} else {
    console.log("Arquivo Não localizado")
}