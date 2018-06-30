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
        console.log(array)
        let $lyric = $('.lyricCotent')
        array.map(function(object){
            if(!object){return}
            let $p = $('<p/>')
            $p.attr('data-time',object.time).text(object.words)
            $p.appendTo($lyric.children('.lines'))
        })

    }


    $.get('./index.json').then(function(str){
        let obj = JSON.parse(str)
       let song = obj.filter((s)=>{return s.id ===id})[0]
       let {url,name,lyric} = song
       parseText(lyric)
       $('.lyric h1').text(name)

       let audio = document.createElement('audio')
       audio.src = url
    //    audio.oncanplay = function(){
    //        audio.play()
    //        $('.disc-container').addClass('playing')
    //    }
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