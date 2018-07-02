$(function(){

    let id = location.search.match(/\bid=([^&]*)/)[1]

    // $.get('./song.json').then(function(object){
    //     let {lyric} = JSON.parse(object)
    //     let array = lyric.split('\n')
    //     let regex = /^\[(.+)\](.*)$/
    //     array = array.map(function(string,index){
    //         let matches = string.match(regex)
    //         if(matches){
    //             return {time:matches[1],words:matches[2]}
    //         }
            
    //     })
    //     console.log(array)
    //     let $lyric = $('.lyricCotent')
    //     array.map(function(object){
    //         if(!object){return}
    //         let $p = $('<p/>')
    //         $p.attr('data-time',object.time).text(object.words)
    //         $p.appendTo($lyric.children('.lines'))
    //     })
    // })

    function parseText(lyric){
        let array = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        array = array.map(function(string,index){
            let matches = string.match(regex)
            if(matches){
                return {time:matches[1],words:matches[2]}
            }
            
        })
        let $lyric = $('.lyricCotent')
        array.map(function(object){
            if(!object){return}
            let $p = $('<p/>')
            $p.attr('data-time',object.time).text(object.words)
            $p.appendTo($lyric.children('.lines'))
        })

    }


    $.get('./index.json').then(function(str){
        let obj = str
       let song = obj.filter((s)=>{return s.id ===id})[0]
       let {url,name,lyric} = song
       parseText(lyric)
       $('.lyric h1').text(name)

       let audio = document.createElement('audio')
       audio.src = url
       audio.oncanplay = function(){
           audio.play()
           $('.disc-container').addClass('playing')
           setInterval(function(){
            let second = audio.currentTime
            let minute = ~~(second/60)+''
            minute = minute.length >1? minute:'0'+minute
            let left = ~~(second - minute)+''
            left = left.length >1? left:'0'+left
            let time = `${minute}:${left}`;
            let $whichLine
             $line = $('.lines > p')
             for(let i=0; i< $line.length; i++){
                 if(time > $line.eq(i).attr('data-time') && time < $line.eq(i+1).attr('data-time') && $line.eq(i+1).lenght !==0){
                     $whichLine = $line.eq(i)
                     break
                 }
             }
             if($whichLine){
                 Top = $whichLine.offset().top
                 linesTop = $('.lines').offset().top
                 deta = Top - linesTop - $('.lyricCotent').height()/3
                 $('.lines').css('transform','translateY(-'+deta+'px)')


             }
        },500)
       }
       $('.icon-pause').on('click',function(){
           audio.pause()
           $('.disc-container').removeClass('playing')
       })
       $('.icon-play').on('click',function(){
           audio.play()
           $('.disc-container').addClass('playing')
           
          
       })
    })



   


})