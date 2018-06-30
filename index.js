$(function(){
    $.get('index.json').then(function(obj){
        let items = JSON.parse(obj)
        console.log(items)
        items.forEach(e => {
           let $li = $('<li><a href="./song.html?id='+e.id +'"><h3>'+e.name+'</h3><p><svg class="icon-sq"><use xlink:href="#icon-sq"></use></svg>'+ e.author+'-'+e.album+ '</p><svg class="icon-play"><use xlink:href="#icon-play"></use></svg></a></li>')
        $('#lastMusic').append($li)
        
            
        });

    })
})