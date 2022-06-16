function getSongData(){
    const searchData = document.getElementById("search-song").value;

    if(searchData != ""){
        loaderOn();
        const showAllData = document.getElementById("all-data");


        fetch ("https://api.lyrics.ovh/suggest/"+ searchData +"")
        .then (data => data.json())
        .then (data => {

            // console.log(data.data.length);
            for (let i = 0; i < data.data.length; i++) {
                const allData = data.data[i];

                const songName = allData.title;
                const singerName = allData.artist.name;

                var codeBlocks = `<div class="search-result col-md-8 mx-auto" id="result-area">
                    <div class="single-result row align-items-center my-3 p-3">
                        <div class="col-md-9">
                            <h3 class="lyrics-name" id="song-name">${songName}</h3>
                            <p class="author lead">Album by <span id="author">${singerName}</span></p>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button class="btn btn-success" onclick="getLyrics('${singerName}','${songName}')">Get Lyrics</button>
                        </div>
                    </div>
                        <div id="lyrics-${singerName}" class="lyrics">
                        </div>
                    </div>`;

                    
                    showAllData.innerHTML += codeBlocks;
                loaderOff();
            }
            
        })
    }else{
        const codeForEmpty = `<div class="empty" id="box"> You Have to enter something!!
        </div>`

        allData = document.getElementById("all-data");
        allData.innerHTML = codeForEmpty;

        setTimeout(() => {
            const box = document.getElementById('box');
            box.style.display = 'none';
          }, 3000);
    }

}

function getLyrics(artist,title){
    loaderOn();
    // console.log(artist,title);

    fetch("https://api.lyrics.ovh/v1/"+artist+"/"+title)
    .then(data => data.json())
    .then(data => {
        if(data.error == "No lyrics found"){
            document.getElementById("lyrics-"+artist+"").innerText = data.error;
            document.getElementById("lyrics-"+artist+"").style.display = "block";
            setTimeout(() => {
                const box = document.getElementById("lyrics-"+artist+"");
                box.style.display = 'none';
              }, 3000);
        }else{
        document.getElementById("lyrics-"+artist+"").innerText = data.lyrics;
        document.getElementById("lyrics-"+artist+"").style.display = "block";
        }
        loaderOff();

    })
}

function loaderOn(){
    document.getElementById("loading-animation").style.display = "block";
}

function loaderOff(){
    document.getElementById("loading-animation").style.display = "none";
}
