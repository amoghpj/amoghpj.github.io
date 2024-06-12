//Event on ready DOM
function loadData() {
    return fetch("https:/amoghpj.github.io/assets/dat/adiparvan.json")
    .then(res => res.json());
}

loadData().then(data => {
    const searchV = document.getElementById("search");
    searchV.addEventListener("input", (e) => {
        let value = e.target.value;
        if (value && value.trim().length > 3){
            document.getElementById("results").innerHTML = "";
            value = value.trim().toLowerCase();
            console.log(value);

            var results_iast = [];
            var results_dev = [];
            for (var i=0 ; i < data.length ; i++){
                if (data[i].iast.join(",").normalize('NFD').includes(value)) {
                    results_iast.push([data[i].chapter, 
                                       data[i].sloka_id, 
                                       data[i].iast.toString()]);
                    
                    results_dev.push([data[i].chapter, 
                                      data[i].sloka_id, 
                                      data[i].devnag.toString()]);
                }
            }
            const el = document.getElementById("results");
            // var searchVal = value;
            const myh1 = document.createElement("h2");
            myh1.textContent = "Search: ".concat(value).concat(" yielded ").concat(results_iast.length).concat(" results.");
            el.appendChild(myh1);    
            for (var i=0 ; i < results_iast.length ; i++){
                const el = document.getElementById("results");
                // const header = document.createElement("h3")
                const header = document.createTextNode("Chapter ".concat(results_iast[i][0]).concat(", Sloka ").concat(results_iast[i][1]))
                const myiast = document.createElement("p");
                const linkA = document.createElement("a");
                linkA.setAttribute("href","http://amoghpj.github.io/assets/mahabharata_adiparvan/".concat(results_iast[i][0]).concat(".htm#").concat(results_iast[i][0]).concat("_sloka").concat(results_iast[i][1]));
                //header.appendChild(linkA);
                linkA.appendChild(header);
                const mydevnag = document.createElement("p");
                const sep = document.createElement("hr");
                const br = document.createElement("br");
                //header.textContent = "Chapter ".concat(results_iast[i][0]).concat(", Sloka ").concat(results_iast[i][1]);
                myiast.textContent = results_iast[i].slice(2,4);                 
                mydevnag.textContent = results_dev[i].slice(2,4);                 
                el.appendChild(linkA);    
                el.appendChild(myiast);
                el.appendChild(mydevnag);
                el.appendChild(sep);
            }
        }else{
            document.getElementById("results").innerHTML = "";}
    })})
